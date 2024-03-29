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
using System;

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
        public Text Update(Text text)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Text SET
                                       Title = @title,
                                       Description = @description,
                                       HeaderImg = @headerImg
                                       WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@title", text.Title);
                    DbUtils.AddParameter(cmd, "@headerImg", text.HeaderImg);
                    DbUtils.AddParameter(cmd, "@id", text.Id);
                    DbUtils.AddParameter(cmd, "@description", text.Description);

                    var reader = cmd.ExecuteReader();
                    if(reader.Read())
                    {
                        text = GetTextFromReader(reader);
                    }
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
        public void UserRead(int textId, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserText (UserId, TextId, PageFinished)
                                        VALUES (@userId, @textId, @pageFinished)";

                    DbUtils.AddParameter(cmd, "@userId", userId);
                    DbUtils.AddParameter(cmd, "@textId", textId);
                    DbUtils.AddParameter(cmd, "@pageFinished", 1);

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

        public List<Text>GetAllTexts()
        {
            List<Text> texts = new List<Text>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM Text";


                    var reader = cmd.ExecuteReader();

                    while(reader.Read())
                    {
                        texts.Add(GetTextFromReader(reader));
                    }
                }
            }
            return texts;
        }

        public List<Text> GetTextsWithUserRead(UserProfile user)
        {
            List<Text> texts = new List<Text>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Text.*, UserText.PageFinished FROM Text
                                        JOIN UserText ON UserText.TextId = Text.Id
                                        WHERE UserText.UserId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", user.Id);

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Text text = GetTextFromReader(reader);
                        text.UserPage = DbUtils.GetNullableInt(reader, "PageFinished");
                        texts.Add(text);
                    }
                }
            }
            return texts;
        }

        public void GetDistinctSharedWordCount(Text text, UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT COUNT ( DISTINCT w.Id ) AS SharedWordCount
                                        From Word w
                                        JOIN TextWord tw
                                        ON tw.WordId = w.Id
                                        JOIN Text t 
                                        ON t.Id = tw.TextId
                                        JOIN UserWord uw
                                        ON uw.WordId = w.Id
                                        JOIN [User] u
                                        ON u.Id = uw.UserId
                                        WHERE t.Id = @textId
                                        AND u.Id = @userId";

                    DbUtils.AddParameter(cmd, "@textId", text.Id);
                    DbUtils.AddParameter(cmd, "@userId", user.Id);

                    var reader = cmd.ExecuteReader();
                    if(reader.Read())
                    {
                        text.DistinctUserWords = DbUtils.GetInt(reader, "SharedWordCount");
                    }
                }
            }
        }
        public void GetTotalSharedWordCount(Text text, UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT COUNT ( w.Id ) AS SharedWordCount
                                        From Word w
                                        JOIN TextWord tw
                                        ON tw.WordId = w.Id
                                        JOIN Text t 
                                        ON t.Id = tw.TextId
                                        JOIN UserWord uw
                                        ON uw.WordId = w.Id
                                        JOIN [User] u
                                        ON u.Id = uw.UserId
                                        WHERE t.Id = @textId
                                        AND u.Id = @userId";

                    DbUtils.AddParameter(cmd, "@textId", text.Id);
                    DbUtils.AddParameter(cmd, "@userId", user.Id);

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        text.UserWords = DbUtils.GetInt(reader, "SharedWordCount");
                    }
                }
            }
        }

        public void DeleteText(int textId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Text WHERE Id = @textId";

                    DbUtils.AddParameter(cmd, "@textId", textId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void GetHTML(Text text)
        {
            List<Html> htmlString = new List<Html>();
            var allWords = _wordRepository.GetAll();
            HtmlWeb web = new HtmlWeb();
            //Use UTF8 Charset (same as webpage) to prevent problems with accent marks
            web.OverrideEncoding = Encoding.UTF8;
            HtmlDocument document = web.Load(text.Address);
            document.OptionDefaultStreamEncoding = Encoding.UTF8;
            var result = document.DocumentNode
                   .Descendants()
                   .Where(o =>
                          o.HasClass("lan1") ||
                          o.HasClass("img-simple") ||
                          o.HasClass("x-illo"));

            List<string> totalWords = new List<string>();
            foreach (HtmlNode item in result)
            {
                if (item.Name == "p")
                {
                    //Add tag to indicate paragraph break
                    htmlString.Add(new Html { HtmlString = "p-lan1" });
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
                        var regexString = Regex.Replace(word, @"\p{P}", " ");
                        var newWord = Regex.Replace(regexString, @"\s+", "");
                        Word matchedWord = allWords.Find(w => w.SpanishWord == newWord);
                        //Split string containing matched word & possibly punctuation
                        if (matchedWord != null)
                        {
                            string[] tokens = word.Split(new[] { matchedWord.SpanishWord }, StringSplitOptions.None);
                            //var stringElements = word.Split(matchedWord.SpanishWord);
                            for(int i = 0; i < 2; i++)
                            {
                                //Add starting punctuation, then word, then ending punctuation
                                if (i == 1)
                                {
                                    htmlString.Add(new Html { HtmlWord = new Word { Id = matchedWord.Id, SpanishWord = matchedWord.SpanishWord } });
                                }
                                    htmlString.Add(new Html { HtmlString = tokens[i] });

                            }
                        }
                    }
                }
                //Add images in proper order
                else if (item.Name == "img")
                {
                    htmlString.Add(new Html { HtmlString = (item.Attributes.Where(i => i.Name == "src").FirstOrDefault().Value) });
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
                        if (newWord != null)
                        {
                        totalWords.Add(newWord);
                        }
                    }
                }
            }
            //Distinct Words for word entities
            var distinctWords = totalWords.Distinct();        
            var filteredWords = words.Where(w => w != null).ToList();

                    foreach (string word in distinctWords)
                    {
                    try
                    {
                        //Check for word entity that already exists in DB
                        var existingWord = filteredWords.FirstOrDefault(w => w.SpanishWord == word);

                        //Create new word entity if it does not exist yet
                        if (existingWord == null)
                        {
                            Word addedWord = _wordRepository.Add(word);
                            filteredWords.Add(addedWord);
                        }
                    }
                    catch(Exception ex)
                    {
                    continue;
                    }
                    }

            //Once word entities have been created, ALL words added into text words (allow multiple copies)
            foreach(string word in totalWords)
            {
                var existingWord = words.FirstOrDefault(w => w.SpanishWord == word);
                if(existingWord != null)
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
                DatePosted = DbUtils.GetDateTime(reader, "DatePosted"),
                Description = DbUtils.GetString(reader, "Description"),
            };
        }
 }
 }

