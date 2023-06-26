using Domain;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class CreateKesedaran
    {
        public class Command : IRequest
        {
            public kesedaran05 Kesedaran { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.kesedaran.Add(request.Kesedaran);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
