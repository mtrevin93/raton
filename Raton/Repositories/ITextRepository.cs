using Raton.Models;

namespace Raton.Repositories
{
    public interface ITextRepository
    {
        Text Add(Text text);
        void Add(Word word, Text text);
        string AddSpanishExperimentWords(Text spanishText);
    }
}