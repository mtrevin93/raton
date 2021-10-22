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
                    cmd.CommandText = @"SELECT u.*, ut.TypeName 
                                        FROM [User] u 
                                        JOIN UserType ut ON u.UserTypeId = ut.Id;";

                    var reader = cmd.ExecuteReader();

                    var userProfiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        userProfiles.Add(GetUserProfileFromReader(reader));
                    }

                    reader.Close();

                    return userProfiles;
                }
            }
        }

        public Word GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT u.*, ut.TypeName 
                                        FROM [User] u 
                                        JOIN UserType ut ON u.UserTypeId = ut.Id; 
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    UserProfile userProfile = null;

                    if (reader.Read())
                    {
                        userProfile = GetUserProfileFromReader(reader);
                    }

                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(Word word)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile (Name, Email, ImageUrl, DateCreated)
                        VALUES (@name, @email, @imageUrl, SYSDATETIME() )";

                    DbUtils.AddParameter(cmd, "@name", userProfile.Username);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@imageUrl", userProfile.AvatarImg);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Word GetWordFromReader(SqlDataReader reader)
        {
            return new UserProfile()
            {
                Username = DbUtils.GetString(reader, "Username"),
                Email = DbUtils.GetString(reader, "Email"),
                AvatarImg = DbUtils.GetString(reader, "AvatarImg"),
                Bio = DbUtils.GetString(reader, "Bio"),
                UserType = new UserType { TypeName = DbUtils.GetString(reader, "TypeName") }
            };
        }
    }
}