using AutoMapper;
using MovieHub.Dto;
using MovieHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieHub.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Users, UserForListDto>();

            CreateMap<Users, UserForDetailedDto>();

            CreateMap<Pictures, PictureForReturnDto>();

            CreateMap<PictureForCreationDto, Pictures>();
             
        }
    }
}

