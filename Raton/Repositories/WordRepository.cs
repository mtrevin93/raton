using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Raton.Models;
using Raton.Utils;

namespace Raton.Repositories
{

    public class WordRepository : BaseRepository, IWordRepository
    {
        public WordRepository(IConfiguration configuration) : base(configuration) { }

        public List<Word> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * 
                                        FROM Word";

                    var reader = cmd.ExecuteReader();

                    var words = new List<Word>();
                    while (reader.Read())
                    {
                        words.Add(GetWordFromReader(reader));
                    }

                    reader.Close();

                    return words;
                }
            }
        }
        public List<Word> GetWordsWithTranslations()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * 
                                        FROM Word";

                    var reader = cmd.ExecuteReader();

                    var words = new List<Word>();
                    while (reader.Read())
                    {
                        words.Add(GetWordFromReader(reader));
                    }

                    reader.Close();

                    return words;
                }
            }
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

        private Word GetWordFromReader(SqlDataReader reader)
        {
            return new Word()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                SpanishWord = DbUtils.GetString(reader, "SpanishWord"),
            };
        }

        private Word GetWordWithTranslation(SqlDataReader reader)
        {
            Word word = new Word()
            {
                Id = DbUtils.GetInt(reader, "WordId"),
                SpanishWord = DbUtils.GetString(reader, "SpanishWord"),
                Translations = new List<string> { DbUtils.GetString(reader, "Translation") }
            };        
        }
    }
}