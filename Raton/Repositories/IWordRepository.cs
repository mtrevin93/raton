using Raton.Models;
using System.Collections.Generic;

namespace Raton.Repositories
{
    public interface IWordRepository
    {
        Word Add(string word);
        List<Word> GetAll();
        List<Word> GetWordsWithTranslations();
        void GetTextWords(Text text);
        List<Word> GetUserWords(UserProfile user);
        void DeleteUserWord(Word word);
        void AddUserWord(Word word);

    }
}