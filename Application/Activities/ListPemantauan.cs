using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.Pemantauan
{
    public class ListPemantauan
    {
        public class Query : IRequest<List<pemantauan02>> { }

        public class Handler : IRequestHandler<Query, List<pemantauan02>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<pemantauan02>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.pemantauan.ToListAsync();
            }
        }
    }
}
