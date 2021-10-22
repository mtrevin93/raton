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

namespace Raton.Repositories
{
    public class TextRepository : BaseRepository, ITextRepository
    {
        private readonly IWordRepository _wordRepository;
        private readonly ApiUtils _apiUtils;
        public TextRepository(IConfiguration configuration, IWordRepository wordRepository, ApiUtils apiUtils) : base(configuration)
        {
            _wordRepository = wordRepository;
            _apiUtils = apiUtils;
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
                    DbUtils.AddParameter(cmd, "@content", text.Content);

                    text.Id = (int)cmd.ExecuteScalar();
                }
            }
            return text;
        }


        public void Add(Word word, Text text)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Word
                        SELECT * FROM TextWord

                        INSERT INTO Word (SpanishWord) VALUES (@spanishWord)
                        OUTPUT INSERTED.ID
                        dbutils blah
                        --word.Id = (int)cmd.ExecuteScalar();
                        INSERT INTO TextWord (WordId, TextId) VALUES (@wordId, @textId)
                        dbutils "


                    cmd.ExecuteNonQuery();
                }
            }
        }







        private string ParseSpanishExperimentText(string doc)
        {
            return null;
        }

        public string AddSpanishExperimentWords(Text spanishText)
        {
            List<Word> words = _wordRepository.GetAll();
            string text = "";
            HtmlWeb web = new HtmlWeb();
            HtmlDocument document = web.Load(spanishText.Address);
            var result = document.DocumentNode
                   .Descendants()
                   .Where(o => o.Name.StartsWith("div") &&
                          o.GetAttributeValue("class", "") == "lan1-p" ||
                          o.GetAttributeValue("class", "") == "img-simple");
            foreach (HtmlNode item in result)
            {
                if (item.ToString().Contains("lan1-p"))
                {
                    string pString = item.ToString();
                    HtmlDocument mainDoc = new HtmlDocument();
                    mainDoc.LoadHtml(pString);
                    string cleanText = mainDoc.DocumentNode.InnerText;
                    Regex.Replace(cleanText, @"[^\w\s]", "");
                    var newWords = cleanText.ToLower().Split(" ");
                    foreach (string word in newWords)
                    {
                        if (words.FirstOrDefault(w => w.SpanishWord == word) == null)
                        {
                            _wordRepository.Add(word, spanishText.Id);
                        }
                    }

                }
                text += item;
            }
            return text;
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


}
}
