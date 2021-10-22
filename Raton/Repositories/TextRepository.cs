using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Raton.Models;
using Raton.Utils;
using HtmlAgilityPack;
using System.Net;
using System.IO;
using System.Xml.Serialization;
using Newtonsoft.Json.Linq;

namespace Raton.Repositories
{
    public class TextRepository : BaseRepository
    {
        private readonly IWordRepository _wordRepository;
        private readonly ApiUtils _apiUtils;
        public TextRepository(IConfiguration configuration, IWordRepository wordRepository, ApiUtils apiUtils) : base(configuration)
        {
            _wordRepository = wordRepository;
            _apiUtils = apiUtils;
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

            foreach (string word in text.Split())
            {
                string url = string.Format($"https://www.dictionaryapi.com/api/v3/references/spanish/json/{word}?key={_apiUtils._API_KEY}";
                WebRequest requestObjGet = WebRequest.Create(url);
                requestObjGet.Method = "GET";
                HttpWebResponse responseObjGet = null;
                responseObjGet = (HttpWebResponse)requestObjGet.GetResponse();

                string response = null;
                using (Stream stream = responseObjGet.GetResponseStream())
                {
                    StreamReader sr = new StreamReader(stream);
                    response = sr.ReadToEnd();
                    if (!string.IsNullOrWhiteSpace(response))
                    {

                        string translation = JObject.Parse(response)["sense"]["dt"]
                        //Make a new XMLSerializer for the type of object being created
                        var ser = new XmlSerializer(typeof(Translation));

                        //Deserialize and cast to your type of object
                        var obj = (Translation.Translations)ser.Deserialize(new StringReader(response));

                        return obj;
                    }
                }
            }

            

        }


    }
}
