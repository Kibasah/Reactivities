using MediatR;
using Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Kesedaran
{
    public class ListKesedaran
    {
        public class Query : IRequest<List<kesedaran05>> { }

        public class Handler : IRequestHandler<Query, List<kesedaran05>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<kesedaran05>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.kesedaran.ToListAsync();
            }
        }
    }
}
