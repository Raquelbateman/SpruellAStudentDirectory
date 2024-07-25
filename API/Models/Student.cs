using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Student
    {
        public int StudentId { get; set;}
        public string StudentName { get; set;} ="";

        public bool IsDeleted { get; set;}
    } 
}