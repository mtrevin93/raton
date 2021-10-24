﻿using Raton.Models;

namespace Raton.Repositories
{
    public interface ITextRepository
    {
        Text Add(Text text);
        void AddTextWord(Word word, Text text);
        void AddSpanishExperimentWords(Text spanishText);
        Text GetById(Text text);
    }
}