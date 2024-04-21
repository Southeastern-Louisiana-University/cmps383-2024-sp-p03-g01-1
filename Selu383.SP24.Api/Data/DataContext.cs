using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Rooms;
using Selu383.SP24.Api.Features.Bookings;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Selu383.SP24.Api.Features.CreditCards;

namespace Selu383.SP24.Api.Data;

public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Room> Room { get; set; }

    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DataContext()
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);

        modelBuilder.Entity<Room>()
            .Property(r => r.Price)
            .HasColumnType("decimal(10,2)");

    }
}

public class CreditCardDbContext : DbContext
{
    public DbSet<CreditCardDto> CreditCards { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Your_Connction_String");
    }

    public async Task SaveCreditCard(int userId, string creditCardNumber, string encryptionKey)
    {
        var encryptedCreditCard = EncryptCreditCard(creditCardNumber, encryptionKey);
        var token = GenerateToken();

        var creditCard = new CreditCardDto
        {
            UserId = userId,
            EncryptedCreditCard = encryptedCreditCard,
            Token = token
        };

        await CreditCards.AddAsync(creditCard);
        await SaveChangesAsync();
    }

    public async Task<(string creditCardNumber, string token)?> GetCreditCardByUserId(int userId, string encryptionKey)
    {
        var creditCard = await CreditCards.FirstOrDefaultAsync(c => c.UserId == userId);
        if (creditCard == null)
            return null;

        var decryptedCreditCard = creditCard.EncryptedCreditCard != null ? DecryptCreditCard(creditCard.EncryptedCreditCard, encryptionKey) : null;
        return (decryptedCreditCard ?? string.Empty, creditCard.Token ?? string.Empty);
    }

    private string EncryptCreditCard(string creditCardNumber, string encryptionKey)
    {
        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = Encoding.UTF8.GetBytes(encryptionKey);
            aesAlg.IV = new byte[16]; // IV should be random, here we're using a zero-filled array for simplicity

            ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);
            byte[]? encryptedBytes = null;

            // Create the streams used for encryption.
            using (MemoryStream msEncrypt = new MemoryStream())
            {
                using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                {
                    using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                    {
                        //Write all data to the stream.
                        swEncrypt.Write(creditCardNumber);
                    }
                    encryptedBytes = msEncrypt.ToArray();
                }
            }

            return Convert.ToBase64String(encryptedBytes);
        }
    }

    private string DecryptCreditCard(string encryptedCreditCard, string encryptionKey)
    {
        if (encryptedCreditCard == null)
        {
            // Handle the case where cnryptedCreditCard is null(if needed)
            return string.Empty;
        }
        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = Encoding.UTF8.GetBytes(encryptionKey);
            aesAlg.IV = new byte[16]; // IV should be random, here we're using a zero-filled array for simplicity

            ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);
            byte[] encryptedBytes = Convert.FromBase64String(encryptedCreditCard);
            string? decryptedCreditCard = null;

            // Create the streams used for decryption.
            using (MemoryStream msDecrypt = new MemoryStream(encryptedBytes))
            {
                using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                {
                    using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                    {
                        // Read the decrypted bytes from the decrypting stream
                        // and place them in a string.
                        decryptedCreditCard = srDecrypt.ReadToEnd();
                    }
                }
            }

            return decryptedCreditCard;
        }
    }

    private string GenerateToken()
    {
        byte[] tokenBytes = new byte[16];
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(tokenBytes);
        }
        return BitConverter.ToString(tokenBytes).Replace("-", "");
    }
}

