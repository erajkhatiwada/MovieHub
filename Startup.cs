using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MovieHub.Data;
using MovieHub.Helpers;
using MovieHub.Models;

//using MovieHub.Data;

namespace MovieHub
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //change server and database name in appsettings.json (connection string)
            //the context class is the same as your db name replace below with (dbnameContext)
            
            services.AddDbContext<MovieHubTryContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))); 

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            // do not remove this. If you remove this, you cannot include children objects which creats problem
            services.AddMvc().AddJsonOptions(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddCors();
            services.AddAutoMapper();
            services.Configure<CloudinarySettings>(Configuration
            .GetSection("CloudinarySettings"));
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IAddingRepository, AddingRepository>();
            services.AddScoped<CheckInterface, Check>();
            //Specification of Authentic Scheme
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).
                AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                        .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false

                    };
                    
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // uncomment below when not running in development mode
                // app.UseHsts();
            }

            // uncomment below when uncommenting line 40
            // app.UseHttpsRedirection();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
