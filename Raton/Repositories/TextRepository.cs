﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Raton.Models;
using Raton.Utils;
using HtmlAgilityPack;
using System.Net;
using System.IO;
using System.Xml.Serialization;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;
using System.Text;

namespace Raton.Repositories
{
    public class TextRepository : BaseRepository, ITextRepository
    {
        private readonly IWordRepository _wordRepository;
        public TextRepository(IConfiguration configuration, IWordRepository wordRepository) : base(configuration)
        {
            _wordRepository = wordRepository;
        }

        public Text Add(Text text)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Text (Title, Description, HeaderImg, Content, DatePosted)
                                       OUTPUT Inserted.Id
                                       VALUES (@title, @description, @headerImg, @content, SYSDATETIME())";

                    DbUtils.AddParameter(cmd, "@title", text.Title);
                    DbUtils.AddParameter(cmd, "@description", text.Description);
                    DbUtils.AddParameter(cmd, "@headerImg", text.HeaderImg);
                    DbUtils.AddParameter(cmd, "@content", text.Address);

                    text.Id = (int)cmd.ExecuteScalar();
                }
            }
            return text;
        }
        public void AddTextWord(Word word, Text text)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO TextWord (WordId, TextId) VALUES (@wordId, @textId)";

                    DbUtils.AddParameter(cmd, "@wordId", word.Id);
                    DbUtils.AddParameter(cmd, "@textId", text.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public Text GetById(int id)
        {
            Text text = null;
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * From Text WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    
                    if(reader.Read())
                    {
                        text = GetTextFromReader(reader);
                    }
                }
            }
            return text;
        }

        public void GetHTML(Text text)
        {
            List<string> htmlString = new List<string>();

            HtmlWeb web = new HtmlWeb();
            //Use UTF8 Charset (same as webpage) to prevent problems with accent marks
            web.OverrideEncoding = Encoding.UTF8;
            HtmlDocument document = web.Load(text.Address);
            document.OptionDefaultStreamEncoding = Encoding.UTF8;
            var result = document.DocumentNode
                   .Descendants()
                   .Where(o =>
                          o.HasClass("lan1") ||
                          o.HasClass("img-simple"));

            List<string> totalWords = new List<string>();
            foreach (HtmlNode item in result)
            {
                if (item.Name == "p")
                {
                    //Add tag to indicate paragraph break
                    htmlString.Add("p-lan1");
                    string pString = item.InnerText;
                    HtmlDocument mainDoc = new HtmlDocument();
                    mainDoc.LoadHtml(pString);
                    string cleanText = mainDoc.DocumentNode.InnerText;
                    var spacedQuotesText = cleanText.Replace("“", " “");
                    spacedQuotesText = spacedQuotesText.Replace("”", " ”");
                    var newWords = spacedQuotesText.ToLower().Split(" ").ToList();
                    foreach (string word in newWords)
                    {
                        //Throw out whitespace items. Regex for punctuation to be done on front-end, since punctuation is desired
                        if (string.IsNullOrWhiteSpace(word))
                        {
                            continue;
                        }
                        //Add all words as individual text
                        htmlString.Add(word);
                    }
                }
                //Add images in proper order
                else if (item.Name == "img")
                {
                    htmlString.Add(item.OuterHtml);
                }
            }
            text.htmlString = htmlString;
        }
            public void AddSpanishExperimentWords(Text spanishText)
        {
            List<Word> words = _wordRepository.GetAll();
            HtmlWeb web = new HtmlWeb();
            //Use UTF8 Charset (same as webpage) to prevent problems with accent marks
            web.OverrideEncoding = Encoding.UTF8;
            HtmlDocument document = web.Load(spanishText.Address);
            document.OptionDefaultStreamEncoding = Encoding.UTF8;
            var result = document.DocumentNode
                   .Descendants()
                   .Where(o => 
                          o.HasClass("lan1") ||
                          o.HasClass("img-simple"));

            List<string> totalWords = new List<string>();
            foreach (HtmlNode item in result)
            {
                if (item.Name == "p")
                {
                    //Clean, split, lowercase, and take only distinct items from all words in lan1 p tag
                    string pString = item.InnerText;
                    HtmlDocument mainDoc = new HtmlDocument();
                    mainDoc.LoadHtml(pString);
                    string cleanText = mainDoc.DocumentNode.InnerText;
                    var regexString = Regex.Replace(cleanText, @"\p{P}", " ");
                    var newWords = regexString.ToLower().Split(" ").ToList();
                    foreach (string word in newWords)
                    {
                        //Remove punctuation & throw out whitespace items
                        var newWord = Regex.Replace(word, @"\s+", "");
                        if (string.IsNullOrWhiteSpace(newWord))
                        {
                            continue;
                        }
                        totalWords.Add(newWord);
                    }
                }
            }

            var distinctWords = totalWords.Distinct();        

                    foreach (string word in distinctWords)
                    {
                        //Check for word entity that already exists in DB
                        var existingWord = words.FirstOrDefault(w => w.SpanishWord == word);

                        //Create new word entities for word & textWord if it does not exist yet
                        if (existingWord == null)
                        {
                            Word addedWord = _wordRepository.AddWithTextWord(word, spanishText.Id);
                            words.Add(addedWord);
                        }
                        //Add only to TextWord if word already existed
                        else if (existingWord != null)
                        {
                            this.AddTextWord(existingWord, spanishText);
                        }
                    }

         }

        private Text GetTextFromReader(SqlDataReader reader)
        {
            return new Text()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Address = DbUtils.GetString(reader, "Content"),
                Title = DbUtils.GetString(reader, "Title"),
                HeaderImg = DbUtils.GetString(reader, "HeaderImg"),
                DatePosted = DbUtils.GetDateTime(reader, "DatePosted")
            };
        }


        //Translation - maybe do these front-end?
        //foreach (string word in text.Split())
        //{
        //    string url = string.Format($"https://www.dictionaryapi.com/api/v3/references/spanish/json/{word}?key={_apiUtils._API_KEY}";
        //    WebRequest requestObjGet = WebRequest.Create(url);
        //    requestObjGet.Method = "GET";
        //    HttpWebResponse responseObjGet = null;
        //    responseObjGet = (HttpWebResponse)requestObjGet.GetResponse();

        //    string response = null;
        //    using (Stream stream = responseObjGet.GetResponseStream())
        //    {
        //        StreamReader sr = new StreamReader(stream);
        //        response = sr.ReadToEnd();
        //        if (!string.IsNullOrWhiteSpace(response))
        //        {

        //            string translation = JObject.Parse(response)["sense"].SelectToken("$.")
        //            //Make a new XMLSerializer for the type of object being created
        //            var ser = new XmlSerializer(typeof(Translation));

        //            //Deserialize and cast to your type of object
        //            var obj = (Translation.Translations)ser.Deserialize(new StringReader(response));

        //            return obj;
        //        }
        //    }
    }



    }

