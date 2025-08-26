using BusinessLogicLayer.Interfaces.Base;
using BusinessLogicLayer.Interfaces.Services;
using DataAccessLayer.Models.AbstractEntities;
using Microsoft.AspNetCore.Mvc;

namespace chaolong_sever.Controllers.Base
{
    [ApiController]
    public abstract class CrudController<T>(ICrudService<T> _crudService, IImageService? _imageService = null) : ControllerBase where T : BaseEntity
    {
        [HttpGet]
        public virtual async Task<IActionResult> GetAllAsync()
        {
            var entities = await _crudService.GetAllAsync();

            if (entities == null || !entities.Any())
            {
                return NotFound("No entities found.");
            }

            return Ok(new { Message = "Get all records successfully", Data = entities });
        }

        [HttpPost("create")]
        public virtual async Task<IActionResult> CreateAsync([FromForm] T entity, IFormFile? imageFile)
        {
            if (imageFile != null && entity is ImageEntity imageEntity)
            {
                var imageUrl = await _imageService.UploadImageAsync(imageFile, "bucket-name");
                imageEntity.ImageUrl = imageUrl;
            }

            var result = await _crudService.CreateAsync(entity);
            return Ok(new { Message = "Create new record successfully", Data = result });
        }

        [HttpPut]
        public virtual async Task<IActionResult> UpdateAsync([FromBody] T entity)
        {
            if (entity == null)
            {
                return BadRequest("Entity is null or ID mismatch.");
            }

            var existingEntity = await _crudService.GetByIdAsync(entity.Id);

            if (existingEntity == null)
            {
                return NotFound("Entity not found.");
            }

            await _crudService.UpdateAsync(entity);
            return Ok(new { Message = "Update record successfully", Data = entity });
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> DeleteAsync(int id)
        {
            var existingEntity = await _crudService.GetByIdAsync(id);

            if (existingEntity == null)
            {
                return NotFound("Entity not found.");
            }

            await _crudService.DeleteAsync(existingEntity);
            return Ok("Delete record successfully");
        }
    }
}