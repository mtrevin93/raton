using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Raton.Models
{
    public class Text
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string HeaderImg { get; set; }
        public string Address { get; set; }
        public DateTime DatePosted { get; set; }
        public List<Html> htmlString { get; set; }
        public List<Word> TextWords { get; set; }
        public int UserWords { get; set; }
    }
}
