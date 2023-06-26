using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application.Pemantauan
{
    public class EditPemantauan
    {
        public class Command : IRequest
        {
            public pemantauan02 Pemantauan { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var pemantauan = await _context.pemantauan.FindAsync(request.Pemantauan.Id);

                if (pemantauan == null)
                    throw new Exception("Pemantauan not found");

                _mapper.Map(request.Pemantauan, pemantauan);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
