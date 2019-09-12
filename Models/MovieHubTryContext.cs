using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MovieHub.Models
{
    public partial class MovieHubTryContext : DbContext
    {
        public MovieHubTryContext()
        {
        }

        public MovieHubTryContext(DbContextOptions<MovieHubTryContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<Comments> Comments { get; set; }
        public virtual DbSet<Genres> Genres { get; set; }
        public virtual DbSet<Movies> Movies { get; set; }
        public virtual DbSet<Pictures> Pictures { get; set; }
        public virtual DbSet<PopularMovies> PopularMovies { get; set; }
        public virtual DbSet<Ratings> Ratings { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<WatchList> WatchList { get; set; }
        public virtual DbSet<Watchlists> Watchlists { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=LAPTOP-F19BUQDV\\SQLEXPRESS;Database=MovieHubTry;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("comment");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CommentSection)
                    .HasColumnName("commentSection")
                    .HasMaxLength(10);

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_comment_users");
            });

            modelBuilder.Entity<Comments>(entity =>
            {
                entity.HasKey(e => e.CommentId);

                entity.Property(e => e.Comment).IsRequired();

                entity.HasOne(d => d.Movie)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.MovieId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comments_Movie");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comments_User");
            });

            modelBuilder.Entity<Genres>(entity =>
            {
                entity.ToTable("genres");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Genre)
                    .HasColumnName("genre")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Movies>(entity =>
            {
                entity.ToTable("movies");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.GenreId).HasColumnName("genreID");

                entity.Property(e => e.MovieName)
                    .IsRequired()
                    .HasColumnName("movieName");

                entity.HasOne(d => d.Genre)
                    .WithMany(p => p.Movies)
                    .HasForeignKey(d => d.GenreId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_movies_genres");
            });

            modelBuilder.Entity<Pictures>(entity =>
            {
                entity.ToTable("pictures");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PictureUrl).HasColumnName("pictureUrl");

                entity.Property(e => e.PublicId)
                    .HasColumnName("publicId")
                    .HasMaxLength(512);

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Pictures)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_pictures_users");
            });

            modelBuilder.Entity<PopularMovies>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FirstLink)
                    .IsRequired()
                    .HasColumnName("firstLink")
                    .IsUnicode(false);

                entity.Property(e => e.FirstPrice)
                    .IsRequired()
                    .HasColumnName("firstPrice")
                    .IsUnicode(false);

                entity.Property(e => e.FirstSource)
                    .IsRequired()
                    .HasColumnName("firstSource")
                    .IsUnicode(false);

                entity.Property(e => e.ImageUrl)
                    .IsRequired()
                    .HasColumnName("imageUrl")
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .IsUnicode(false);

                entity.Property(e => e.SecondLink)
                    .IsRequired()
                    .HasColumnName("secondLink")
                    .IsUnicode(false);

                entity.Property(e => e.SecondPrice)
                    .IsRequired()
                    .HasColumnName("secondPrice")
                    .IsUnicode(false);

                entity.Property(e => e.SecondSource)
                    .IsRequired()
                    .HasColumnName("secondSource")
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Ratings>(entity =>
            {
                entity.ToTable("ratings");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Rating).HasColumnName("rating");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ratings_users");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(100);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("firstName")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("lastName")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasColumnName("passwordHash")
                    .HasMaxLength(512);

                entity.Property(e => e.PasswordSalt)
                    .IsRequired()
                    .HasColumnName("passwordSalt")
                    .HasMaxLength(512);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasColumnName("userName")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<WatchList>(entity =>
            {
                entity.HasKey(e => e.WatchId);

                entity.Property(e => e.MovieName).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.WatchList)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WatchList_Users");
            });

            modelBuilder.Entity<Watchlists>(entity =>
            {
                entity.ToTable("watchlists");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.MovieId)
                    .HasColumnName("movieID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.Movie)
                    .WithMany(p => p.Watchlists)
                    .HasForeignKey(d => d.MovieId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_watchlists_movies");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Watchlists)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_watchlists_users");
            });
        }
    }
}
