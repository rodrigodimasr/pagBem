using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fiap.entities
{
    public class FuncionarioComplemento
    {
        public int? Codigo { get; set; }
        public string Endereco { get; set; }
        public string Cep { get; set; }
        public int? Numero { get; set; }
        public string  Complemento { get; set; }
        public string Bairro { get; set; }
        public string Estado { get; set; }
    }
}
