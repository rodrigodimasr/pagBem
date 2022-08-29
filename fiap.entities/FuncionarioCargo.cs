using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fiap.entities
{
    public class FuncionarioCargo
    {
        public int? Codigo { get; set; }
        public string Departamento { get; set; }
        public string Cargo { get; set; }
        public string DT_Inicio { get; set; }
        public string DT_Fim { get; set; }
        public string Salario { get; set; }
    }
}
