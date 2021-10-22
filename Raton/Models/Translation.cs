using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Raton.Models
{
    public class Translation
    {
        public int Id { get; set; }
        public string Translations { get; set; }
        public int WordId { get; set; }
    }
}
