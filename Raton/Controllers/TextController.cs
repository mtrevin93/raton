using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Raton.Repositories;
using Raton.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Raton.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TextController : ControllerBase
    {
        private readonly ITextRepository _textRepository;
        private readonly IWordRepository _wordRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public TextController(ITextRepository textRepository, IWordRepository wordRepository, IUserProfileRepository userProfileRepository)
        {
            _textRepository = textRepository;
            _wordRepository = wordRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var user = GetCurrentUserProfile();
            List<Text> texts = _textRepository.GetAllTexts();
            foreach(var text in texts)
            {
                _textRepository.GetDistinctSharedWordCount(text, user);
                _textRepository.GetTotalSharedWordCount(text, user);
            }
            return Ok(texts);
        }

        [HttpGet("Read")]
        public IActionResult GetUserReadTexts()
        {
            var user = GetCurrentUserProfile();
            List<Text> texts = _textRepository.GetTextsWithUserRead(user);
            foreach (var text in texts)
            {
                _textRepository.GetDistinctSharedWordCount(text, user);
                _textRepository.GetTotalSharedWordCount(text, user);
            }
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

        [HttpGet("NoWords/{id}")]
        public IActionResult GetByIdNoWords(int id)
        {
            Text text = _textRepository.GetById(id);
            return Ok(text);
        }

        [HttpPost]
        public IActionResult Add(Text text)
        {
            _textRepository.Add(text);

            _textRepository.AddSpanishExperimentWords(text);

            return Ok(text);
        }
        [HttpPost("Read/{textId}")]
        public IActionResult AddUserRead(int textId)
        {
            var user = GetCurrentUserProfile();
            _textRepository.UserRead(textId, user.Id);

            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, Text text)
        {
            text.Id = id;
            _textRepository.Update(text);

            return Ok(text);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _textRepository.DeleteText(id);
            return Ok();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
