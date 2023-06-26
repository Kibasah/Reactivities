using Application.Pemantauan;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class PemantauanController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<pemantauan02>>> GetPemantauan()
        {
            var pemantauanList = await Mediator.Send(new ListPemantauan.Query());
            return Ok(pemantauanList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<pemantauan02>> GetPemantauan(Guid id)
        {
            var pemantauan = await Mediator.Send(new DetailsPemantauan.Query { Id = id });
            if (pemantauan == null)
            {
                return NotFound();
            }
            return Ok(pemantauan);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePemantauan(pemantauan02 pemantauan)
        {
            return Ok(await Mediator.Send(new CreatePemantauan.Command { Pemantauan = pemantauan }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPemantauan(Guid id, pemantauan02 pemantauan)
        {
            pemantauan.Id = id;
            return Ok(await Mediator.Send(new EditPemantauan.Command { Pemantauan = pemantauan }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePemantauan(Guid id)
        {
            return Ok(await Mediator.Send(new DeletePemantauan.Command { Id = id }));
        }
    }
}
