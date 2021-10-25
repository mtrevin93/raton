using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Raton.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class Html : ControllerBase
    {
        public string HtmlString { get; set; }
        public Word HtmlWord { get; set; }
    }
}
