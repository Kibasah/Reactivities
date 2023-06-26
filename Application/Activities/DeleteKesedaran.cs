using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Kesedaran
{
    public class DeleteKesedaran
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var kesedaran = await _context.kesedaran.FindAsync(request.Id);

                if (kesedaran == null)
                    throw new Exception("Kesedaran not found");

                _context.kesedaran.Remove(kesedaran);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
