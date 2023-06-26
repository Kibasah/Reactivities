using Domain;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Pemantauan
{
    public class CreatePemantauan
    {
        public class Command : IRequest
        {
            public pemantauan02 Pemantauan { get; set; }
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
                _context.pemantauan.Add(request.Pemantauan);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
