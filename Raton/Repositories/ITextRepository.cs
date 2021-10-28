using Raton.Models;
using System.Collections.Generic;

namespace Raton.Repositories
{
    public interface ITextRepository
    {
        Text Add(Text text);
        void AddTextWord(Word word, Text text);
        void AddSpanishExperimentWords(Text spanishText);
        Text GetById(int id);
        void GetHTML(Text text);
        Text Update(Text text);
        List<Text> GetAllTexts();
    }
}