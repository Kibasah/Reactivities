using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Pemantauan
{
    public class DetailsPemantauan
    {
        public class Query : IRequest<pemantauan02>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, pemantauan02>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<pemantauan02> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.pemantauan.FindAsync(request.Id);
            }
        }
    }
}
