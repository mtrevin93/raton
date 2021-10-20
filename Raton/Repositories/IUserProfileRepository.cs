using Raton.Models;
using System.Collections.Generic;

namespace Raton.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void Delete(int id);
        List<UserProfile> GetAll();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetById(int id);
        UserProfile GetByIdWithVideos(int id);
        void Update(UserProfile userProfile);
    }
}