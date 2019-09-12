using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieHub.Dto
{
    public class PictureForCreationDto
    {
        public string PictureUrl { get; set; }

        public IFormFile File { get; set; }

        public string PublicId { get; set; }









    }
}
