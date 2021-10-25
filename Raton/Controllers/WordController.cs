using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Raton.Repositories;
using Raton.Models;
using System.Security.Claims;

namespace Raton.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WordController : ControllerBase
    {
        private readonly IWordRepository _wordRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public WordController(IWordRepository wordRepository, IUserProfileRepository userProfileRepository)
        {
            _wordRepository = wordRepository;
            _userProfileRepository = userProfileRepository;
        }
        [HttpGet]
        public IActionResult GetUserWords()
        {
            var currentUser = GetCurrentUserProfile();
            var userWords = _wordRepository.GetUserWords(currentUser);

            return Ok(userWords);
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
