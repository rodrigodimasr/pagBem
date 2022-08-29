using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fiap.entities
{
    public class Funcionario
    {
        public string Codigo { get; set; }
        public string Nome { get; set; }
        public string DT_Nascimento { get; set; }
        public string Apelido { get; set; }
        public string RG { get; set; }
        public string CPF { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Celular { get; set; }
        public int? Ativo { get; set; }
        public string DDD_Cell { get; set; }
        public string DDD_Tell { get; set; }
        public string Tipo_Tell { get; set; }
        public string Tipo_Cell { get; set; }
        public FuncionarioComplemento Endereco { get; set; }
        public FuncionarioCargo Cargo { get; set; }
    }

}
