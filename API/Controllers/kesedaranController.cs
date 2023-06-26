using Application.Activities;
using Application.Kesedaran;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class kesedaranController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<kesedaran05>>> GetKesedaran()
        {
            var kesedaranList = await Mediator.Send(new ListKesedaran.Query());
            return Ok(kesedaranList);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<kesedaran05>> GetKesedaran(Guid id)
        {
            var kesedaran = await Mediator.Send(new DetailsKesedaran.Query { Id = id });
            if (kesedaran == null)
            {
                return NotFound();
            }
            return Ok(kesedaran);
        }


        [HttpPost]
        public async Task<IActionResult> CreateKesedaran(kesedaran05 kesedaran)
        {
            return Ok(await Mediator.Send(new CreateKesedaran.Command { Kesedaran = kesedaran }));
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditKesedaran(Guid id, kesedaran05 kesedaran)
        {
            kesedaran.Id = id;
            return Ok(await Mediator.Send(new EditKesedaran.Command { Kesedaran = kesedaran }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKesedaran(Guid id)
        {
            return Ok(await Mediator.Send(new DeleteKesedaran.Command { Id = id }));
        }
    }
}
