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

                    using var reader = cmd.ExecuteReader();
                    { 

                        var words = new List<Word>();
                        while (reader.Read())
                        {
                            words.Add(GetWordFromReader(reader));
                        }
                        return words;

                    }

                }
            }
        }
        public List<Word> GetUserWords(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT w.Id, w.SpanishWord, uw.WordId
                                        From Word w
                                        RIGHT JOIN UserWord uw
                                        ON w.Id = uw.WordId
                                        JOIN [User] u 
                                        ON u.Id = uw.UserId
                                        WHERE u.Id = @userId";

                    DbUtils.AddParameter(cmd, "@userId", user.Id);

                    using var reader = cmd.ExecuteReader();
                    {
                        var words = new List<Word>();
                        while (reader.Read())
                        {
                            words.Add(GetWordFromReader(reader));
                        }
                        return words;
                    }
                }
            }
        }
        public void AddUserWord(Word word)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserWord
                                        (UserId, WordId) VALUES (@userId, @wordId)";

                    DbUtils.AddParameter(cmd, "@userId", word.User.Id);
                    DbUtils.AddParameter(cmd, "@wordId", word.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteUserWord(Word word)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM UserWord WHERE UserId = @userId
                                        AND WordId = @wordId";

                    DbUtils.AddParameter(cmd, "@userId", word.User.Id);
                    DbUtils.AddParameter(cmd, "@wordId", word.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void GetTextWords(Text text)
        {
            List<Word> textWords = new List<Word>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT w.Id, w.SpanishWord, tw.TextId From Word w
                                        RIGHT JOIN TextWord tw
                                        ON w.Id = tw.WordId
                                        WHERE tw.TextId = @textId";
                    DbUtils.AddParameter(cmd, "@textId", text.Id);

                    using var reader = cmd.ExecuteReader();
                    {
                        while (reader.Read())
                        {
                            textWords.Add(GetWordFromReader(reader));
                        }
                    }
                    text.TextWords = textWords;               
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

        public Word Add(string word)
        {
            Word addedWord = null;
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Word (SpanishWord) OUTPUT INSERTED.Id VALUES (@spanishWord) ";

                    DbUtils.AddParameter(cmd, "@spanishWord", word);
                    int wordId = (int)cmd.ExecuteScalar();

                    cmd.ExecuteNonQuery();
                }
            }
            return addedWord;
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