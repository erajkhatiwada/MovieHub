using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MovieHub.Data;
using MovieHub.Dto;
using MovieHub.Helpers;
using MovieHub.Models;

namespace MovieHub.Controllers
 {
     [Authorize]
     [Route("api/users/{userId}/pictures")]
     [ApiController]
     public class PicturesController : ControllerBase
     {
        private readonly IAddingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public PicturesController(IAddingRepository repo, IMapper mapper,
                 IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;


            //setup new acc
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
                );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPicture")]
        public async Task<IActionResult> GetPicture(int id)
        {
            var pictureFromRepo = await _repo.GetPicture(id);

            var picture = _mapper.Map<PictureForReturnDto>(pictureFromRepo);

            return Ok(picture);
        }


        [HttpPost]
        public async Task<IActionResult> AddPictureForUser(int userId, 
            [FromForm]PictureForCreationDto pictureForCreationDto)
        {
            //check if the userId from token matches with the user Id in the root.
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var userFromRepo = await _repo.GetUser(userId);

            var file = pictureForCreationDto.File;

            //use thee variable to store cloudinary data
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                            .Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            pictureForCreationDto.PictureUrl = uploadResult.Uri.ToString();
            pictureForCreationDto.PublicId = uploadResult.PublicId;


            var picture = _mapper.Map<Pictures>(pictureForCreationDto);

            userFromRepo.Pictures.Add(picture);

            

            if (await _repo.SaveAllAsync())
            {
                var pictureToReturn = _mapper.Map<PictureForReturnDto>(picture);
                return CreatedAtRoute("GetPicture", 
                    new { id = picture.Id}, pictureToReturn
                    );
            }
            return BadRequest("Couldnt add the photo!");
        }









     }
 }