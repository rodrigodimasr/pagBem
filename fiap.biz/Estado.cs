using fiap.data;
using fiap.entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace fiap.biz
{
    public class Estado
    {
        private readonly Manager _manager;
        public Estado()
        {
            _manager = new Manager(HttpContext.Current);
        }
        public static List<entities.Estado> GetAll()
        {
            Estado mana = new Estado();
            var query = new StringBuilder();

            query.AppendLine($@"SELECT * FROM Estados_brasileiro");
            return ConvertData(mana._manager.SqlQuery(query.ToString()));
        }
        public static List<entities.Estado> ConvertData(TableControl data)
        {
            var list = data.DataTable.Select().ToList().Select(item =>
                new entities.Estado()
                {
                    Sigla = item["Sigla"]?.ToString()?.TrimEnd(),
                    Nome = item["Nome"]?.ToString()?.TrimEnd(),
                }).ToList();

            return list;
        }
    }
}
