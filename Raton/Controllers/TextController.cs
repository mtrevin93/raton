using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Raton.Repositories;
using Raton.Models;
using Microsoft.AspNetCore.Authorization;

namespace Raton.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TextController : ControllerBase
    {
        private readonly ITextRepository _textRepository;
        private readonly IWordRepository _wordRepository;
        public TextController(ITextRepository textRepository, IWordRepository wordRepository)
        {
            _textRepository = textRepository;
            _wordRepository = wordRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Text> texts = _textRepository.GetAllTexts();
            return Ok(texts);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Text text = _textRepository.GetById(id);
            _wordRepository.GetTextWords(text);
            _textRepository.GetHTML(text);
            return Ok(text);
        }

        [HttpPost]
        public IActionResult Add(Text text)
        {
            _textRepository.Add(text);

            _textRepository.AddSpanishExperimentWords(text);

            return Ok(text);
        }
        [HttpPut]
        public IActionResult Update(Text text)
        {
            _textRepository.Update(text);

            return Ok(text);
        }
    }
}
