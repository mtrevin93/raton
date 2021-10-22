using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Raton.Models
{
    public class Word
    {
        public int Id { get; set; }
        public string SpanishWord { get; set; }
        public List<string> Translations { get; set; }
        public UserProfile User { get; set; }
        public Text Text { get; set; }
    }
}
