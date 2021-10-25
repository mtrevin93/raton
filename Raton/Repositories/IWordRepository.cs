using Raton.Models;
using System.Collections.Generic;

namespace Raton.Repositories
{
    public interface IWordRepository
    {
        Word AddWithTextWord(string word, int textId);
        List<Word> GetAll();
        List<Word> GetWordsWithTranslations();
        void GetTextWords(Text text);
        List<Word> GetUserWords(UserProfile user);
        void DeleteUserWord(int id);
        void AddUserWord(Word word);

    }
}