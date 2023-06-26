
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob", UserName = "Bobby", Email = "bob@test.com"},
                    new AppUser{DisplayName = "Beb", UserName = "Bebby", Email = "beb@test.com"},
                    new AppUser{DisplayName = "Bab", UserName = "Babby", Email = "bab@test.com"}
                };

                foreach ( var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

             if (!context.kesedaran.Any() && !context.pemantauan.Any())
    
            
           {
           
            

            var kesedaran = new List<kesedaran05>
                {
                    new kesedaran05
                    {
                        Title = "Kesedaran 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Agensi = "Agensi 1",
                        Isu = "Isu 1",
                        Penyelesaian = "Penyelesaian 1",
                        Catatan = "Catatan 1"
                    },
                    new kesedaran05
                    {
                        Title = "Kesedaran 2",
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Agensi = "Agensi 2",
                        Isu = "Isu 2",
                        Penyelesaian = "Penyelesaian 2",
                        Catatan = "Catatan 2"
                    },
                    // Add more Kesedaran items as needed
                };

                await context.kesedaran.AddRangeAsync(kesedaran);

                var pemantauan = new List<pemantauan02>
                {
                    new pemantauan02
                    {
                        Title = "Pemantauan 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "Description 1"
                    },
                    new pemantauan02
                    {
                        Title = "Pemantauan 2",
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Description = "Description 2"
                    },
                    // Add more Pemantauan items as needed
                };

                await context.pemantauan.AddRangeAsync(pemantauan);

                await context.SaveChangesAsync();
            }
        }
    }
}