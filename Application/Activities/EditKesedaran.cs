using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Kesedaran
{
    public class EditKesedaran
    {
        public class Command : IRequest
        {
            public kesedaran05 Kesedaran { get; set; }
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
                var kesedaran = await _context.kesedaran.FindAsync(request.Kesedaran.Id);

                _mapper.Map(request.Kesedaran, kesedaran);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
