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

        public void AddWithTextWord(string word, int textId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Word (SpanishWord) VALUES ('@spanishWord') OUTPUT INSERTED.Id";

                    DbUtils.AddParameter(cmd, "@spanishWord", word);
                    int wordId = (int)cmd.ExecuteScalar();

                    cmd.CommandText = @"INSERT INTO TextWord (WordId, TextId) VALUES (@wordId, @textId)";

                    DbUtils.AddParameter(cmd, "@wordId", wordId);
                    DbUtils.AddParameter(cmd, "@textId", textId);


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
    }
}