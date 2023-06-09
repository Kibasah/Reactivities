using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Pemantauan
{
    public class DeletePemantauan
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
                var pemantauan = await _context.pemantauan.FindAsync(request.Id);

                if (pemantauan == null)
                    throw new Exception("Pemantauan not found");

                _context.pemantauan.Remove(pemantauan);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
