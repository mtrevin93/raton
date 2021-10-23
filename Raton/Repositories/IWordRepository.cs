using Raton.Models;
using System.Collections.Generic;

namespace Raton.Repositories
{
    public interface IWordRepository
    {
        void AddWithTextWord(string word, int textId);
        List<Word> GetAll();
        List<Word> GetWordsWithTranslations();
    }
}