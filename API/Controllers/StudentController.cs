using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
       
        private readonly AppDbContext _context;
     
        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        
        public async Task<IEnumerable<Student>> getStudent()
        {
          
            await Task.Delay(1000);
            var students = await _context.Students.AsNoTracking().ToListAsync();
            return students;
        }
        
      
        [HttpPost]

        public async Task<IActionResult> Create(Student student)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.AddAsync(student);

            var result = await _context.SaveChangesAsync();

            if(result > 0)
            {
                return Ok();
            }
            return BadRequest();
        }


 
        [HttpDelete("{id:int}")]

        public async Task<IActionResult> Delete(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if(student == null)
            {
                return NotFound();
            }
            
            _context.Remove(student);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("Student was deleted");
            }

            return BadRequest("Unable to delete student");
        }

  
        [HttpGet("{id:int}")]

        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound("Sorry, student not found");
            }
            return Ok(student);
        }

        [HttpPut("{id:int}")]
        
        public async Task<IActionResult> EditStudent(int id,  Student student)
        {
            // lets find our student first
            var studentFromDb = await _context.Students.FindAsync(id);
            // now lots update but first check to see if empty
            if(studentFromDb == null)
            {
                return BadRequest("Student not found");
            }
         
            studentFromDb.Name = student.Name;
            studentFromDb.Email = student.Email;
            studentFromDb.Address = student.Address;
            studentFromDb.PhoneNumber = student.PhoneNumber;

            var result = await _context.SaveChangesAsync();

            if(result > 0)
            {
                return Ok("Student info updated");
            }

            return BadRequest("Unable to update student info");
        }

    }
}