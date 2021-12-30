using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomApp.Models.DB
{
    [Table("MeetingDetails")]
    public class MeetingDetails
    {
        [Key]
        public int Id { get; set; }
        public long MeetingId { get; set; }
        public string Password { get; set; }
        public string AdditionalData { get; set; }
    }
}
