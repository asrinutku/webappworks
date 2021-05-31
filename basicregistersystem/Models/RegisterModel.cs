using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;


namespace registerproject.Models
{
    public class RegisterModel
    {
        public String Name { get; set; }
        public String Email { get; set; }
        
        public String Password { get; set; }
        

        [Compare("Password",ErrorMessage ="Şifreler Uyuşmuyor")]
        

        public String RePassword { get; set; }





    }
}