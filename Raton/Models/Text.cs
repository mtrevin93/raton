﻿using System;
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
        public string Content { get; set; }
        public DateTime DatePosted { get; set; }
    }
}
