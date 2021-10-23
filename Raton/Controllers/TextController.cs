using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Raton.Repositories;
using Raton.Models;

namespace Raton.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextController : ControllerBase
    {
        private readonly ITextRepository _textRepository;
        public TextController(ITextRepository textRepository)
        {
            _textRepository = textRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult Add(Text text)
        {
            _textRepository.Add(text);

            var htmlString = _textRepository.AddSpanishExperimentWords(text);

            return Ok(text);
        }
    }
}
