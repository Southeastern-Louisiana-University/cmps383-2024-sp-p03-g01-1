//using Microsoft.AspNetCore.Mvc;
//using Selu383.SP24.Api.Data;
//using System;
//using System.Threading.Tasks;
//namespace Selu383.SP24.Api.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class CreditCardController : ControllerBase
//    {   
//        public class CreditCardModel
//        {
//            public int UserId { get; set; }
//            public string? CreditCardNumber { get; set; }
//        }

//        private readonly DataContext _dataContext;
//        private const string EncryptionKey = "your_strong_encryption_key";

//        public CreditCardController(DataContext dataContext)
//        {
//            _dataContext = dataContext;
//        }

//        [HttpPost]
//        [Route("Save")]
//        public async Task<IActionResult> SaveCreditCard([FromBody] CreditCardModel model)
//        {
//            // Example usage
//            var userId = model.UserId;
//            var creditCardNumber = model.CreditCardNumber;
//            var encryptionKey = "your_strong_encryption_key";

//            try
//            {
//                // Save credit card
//                if (creditCardNumber != null)
//                {
//                    await _dataContext.SaveCreditCard(userId, creditCardNumber, encryptionKey);
//                }
//                else
//                {
//                    return BadRequest("Credit card number cannot be null");
//                }
//                return Ok("Credit card saved successfully.");
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"An error occurred while saving the credit card: {ex.Message}");
//            }
//        }

//        [HttpGet]
//        [Route("Get/{userId}")]
//        public async Task<IActionResult> GetCreditCardByUserId(int userId)
//        {
//            try
//            {
//                // Retrieve credit card
//                var creditCardInfo = await _dataContext.GetCreditCardByUserId(userId, EncryptionKey);
//                if (creditCardInfo != null)
//                {
//                    (string? decryptedCreditCard, string? token) = creditCardInfo.Value;

//                    // Handling nullability
//                    decryptedCreditCard ??= string.Empty;
//                    token ??= string.Empty;

//                    return Ok(new { CreditCardNumber = decryptedCreditCard, Token = token });
//                }
//                else
//                {
//                    return NotFound("No credit card found for the user.");
//                }
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"An error occurred while retrieving the credit card: {ex.Message}");
//            }
//        }
//    }
//}
