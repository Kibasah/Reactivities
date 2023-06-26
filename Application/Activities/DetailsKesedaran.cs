using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Kesedaran
{
    public class DetailsKesedaran
    {
        public class Query : IRequest<kesedaran05>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, kesedaran05>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<kesedaran05> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.kesedaran.FindAsync(request.Id);
            }
        }
    }
}
