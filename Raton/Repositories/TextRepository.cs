using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Raton.Models;
using Raton.Utils;
using HtmlAgilityPack;

namespace Raton.Repositories
{
    public class TextRepository : BaseRepository
    {
        private readonly IWordRepository _wordRepository;
        public TextRepository(IConfiguration configuration, IWordRepository wordRepository) : base(configuration)
        {
            _wordRepository = wordRepository;
        }



      








            private string ParseSpanishExperimentText(string doc)
        {

        }

        private string ParseSpanishExperimentHTML(string doc)
        {
            string text = "";
            HtmlWeb web = new HtmlWeb();
            HtmlDocument document = web.Load(doc);
            var result = document.DocumentNode
                   .Descendants()
                   .Where(o => o.Name.StartsWith("div") &&
                          o.GetAttributeValue("class", "") == "lan1-p" ||
                          o.GetAttributeValue("class", "") == "img-simple");
            foreach (HtmlNode item in nodes)
            {
                string += item;
            }

        }


    }
}
