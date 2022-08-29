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
    public class FuncionarioBiz
    {
        private readonly Manager _manager;
        public FuncionarioBiz()
        {
            _manager = new Manager(HttpContext.Current);
        }
        public static entities.Funcionario GetByCPF(string cpf)
        {
            FuncionarioBiz mana = new FuncionarioBiz();
            var query = new StringBuilder();

            query.AppendLine($@"select f.*, fc.Endereco, fc.Cep, fc.Numero, fc.Complemento, fc.Bairro, fc.Estado,
                                fd.Departamento, fd.Cargo, fd.Salario, fd.DT_Inicio, fd.DT_fim
                                from Funcionario f
                                left join Funcionario_Complemento fc on f.Id_Funcionario = fc.Id_Funcionario
                                left join Funcionario_Cargo fd on f.Id_Funcionario = fd.Id_funcionario
                                where CPF = '{cpf.Trim()}'");

            return ConvertData(mana._manager.SqlQuery(query.ToString())).FirstOrDefault();
        }
        public static entities.Funcionario GetByCodgo(string codigo)
        {
            FuncionarioBiz mana = new FuncionarioBiz();
            var query = new StringBuilder();

            query.AppendLine($@"SELECT * FROM Funcionario where Id_Funcionario = '{codigo.Trim()}'");

            return ConvertData(mana._manager.SqlQuery(query.ToString())).FirstOrDefault();
        }
        public static string Save(entities.Funcionario item)
        {
            FuncionarioBiz mana = new FuncionarioBiz();

            if (string.IsNullOrWhiteSpace(item.CPF))
                throw new BusinessException("O CPF  não é válido. Por favor entre com um número de CPF válido.");

            if (!CheckCPF(item.CPF))
                throw new BusinessException(string.Format("O CPF '{0}' não é inválido. Por favor entre com um número de CPF válido.", item.CPF));

            var funcionario = GetByCPF(item.CPF);

            if (funcionario != null && (!string.IsNullOrEmpty(funcionario.CPF)))
                throw new BusinessException(string.Format("já existe um cadastro para esse CPF; ", item.CPF));


            var codigo = GerarCodigo();
            var existe = GetByCodgo(codigo);

            if (existe != null)
                codigo = GerarCodigo();


            TratamentoCampos(item);

            var query = new StringBuilder();


            query.AppendLine($@" begin try begin transaction");

            query.AppendLine($@"INSERT INTO Funcionario(Id_Funcionario, Nome, Apelido, RG, CPF, Email, Celular, Telefone, Ativo, DDD_Cell, Tipo_Celular, DDD_Tell, Tipo_Tell, DT_Nascimento) 
                        VALUES('{codigo.Trim()}', '{item.Nome.Trim()}', '{item.Apelido}', '{item.RG}', '{item.CPF.ToString().Trim()}', '{item.Email.Trim()}', '{item.Celular.Trim()}',
                                '{item.Telefone}', 1, '{item.DDD_Cell.Trim()}', '{item.Tipo_Cell}', '{item.DDD_Tell}', '{item.Tipo_Tell}', '{item.DT_Nascimento}')");



            query.AppendLine($@"INSERT INTO Funcionario_Complemento(Id_Funcionario, Endereco, Cep, Numero, Complemento, Bairro, Estado)
                            VALUES('{codigo.Trim()}', '{item.Endereco.Endereco.Trim()}', '{item.Endereco.Cep.Trim()}', '{(int)item.Endereco.Numero}',
                                   '{item.Endereco.Complemento.ToString().Trim()}', '{item.Endereco.Bairro.Trim()}', '{item.Endereco.Estado.Trim()}')");


            query.AppendLine($@"INSERT INTO Funcionario_Cargo(Id_Funcionario, Departamento, Cargo, Salario, DT_Inicio, DT_Fim) 
                             VALUES('{codigo.Trim()}', '{item.Cargo.Departamento}', '{item.Cargo.Cargo}', '{Convert.ToDecimal(item.Cargo.Salario)}', 
                                    '{Convert.ToDateTime(item.Cargo.DT_Inicio).ToString("yyyy-MM-dd HH:mm:ss")}', '{(item.Cargo.DT_Fim)}')");

            query.AppendLine($@" commit transaction
                    end try
                    begin catch
                        rollback transaction
						declare @ErrorMessage varchar(max), @ErrorSeverity int, @ErrorState int
						select @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE()
						raiserror(@ErrorMessage, @ErrorSeverity, @ErrorState)
                    end catch");


            mana._manager.SqlExecute(query.ToString());
            return "";
        }

        public static string Update(entities.Funcionario item)
        {
            FuncionarioBiz mana = new FuncionarioBiz();
            if (string.IsNullOrWhiteSpace(item.CPF))
                throw new BusinessException("O CPF  não é inválido. Por favor entre com um número de CPF válido.");

            if (!CheckCPF(item.CPF))
                throw new BusinessException(string.Format("O CPF '{0}' não é válido. Por favor entre com um número de CPF válido.", item.CPF));

            var funcionario = GetByCPF(item.CPF);

            TratamentoCampos(item);



            var query = new StringBuilder();

            query.AppendLine($@" begin try begin transaction");

            query.AppendLine($@"UPDATE FUNCIONARIO SET  Nome =  '{item.Nome.Trim()}', Apelido = '{item.Apelido}', RG = '{item.RG}',  CPF = '{item.CPF.Trim()}',
                                 EMAIL = '{item.Email.Trim()}',  Celular = '{item.Celular.Trim()}', Telefone = '{item.Telefone}', DDD_Cell = '{item.DDD_Cell}',
                                 Tipo_Celular = '{item.Tipo_Cell}', DDD_Tell = '{item.DDD_Tell}',
                                 Tipo_Tell = '{item.Tipo_Tell}', DT_Nascimento = '{item.DT_Nascimento}'  where Id_funcionario = '{item.Codigo.Trim()}'");


            query.AppendLine($@"UPDATE Funcionario_Complemento SET Endereco = '{item.Endereco.Endereco}', Cep = '{item.Endereco.Cep}',
                                 Numero = '{item.Endereco.Numero}', Complemento = '{item.Endereco.Complemento.Trim()}', Bairro = '{item.Endereco.Bairro}', Estado = '{item.Endereco.Estado}' 
                                 where Id_funcionario = '{item.Codigo.Trim()}' ");


            query.AppendLine($@"UPDATE Funcionario_Cargo SET Departamento = '{item.Cargo.Departamento.Trim()}', Cargo = '{item.Cargo.Cargo.Trim()}',
                                 Salario = '{item.Cargo.Salario}', DT_Inicio = '{Convert.ToDateTime(item.Cargo.DT_Inicio).ToString("yyyy-MM-dd HH:mm:ss")}', DT_Fim = '{item.Cargo.DT_Fim}'");

            query.AppendLine($@" commit transaction
                    end try
                    begin catch
                        rollback transaction
						declare @ErrorMessage varchar(max), @ErrorSeverity int, @ErrorState int
						select @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE()
						raiserror(@ErrorMessage, @ErrorSeverity, @ErrorState)
                    end catch");

            mana._manager.SqlExecute(query.ToString());
            return "";
        }

        public static int Delete(string codigoFuncionario)
        {
            FuncionarioBiz mana = new FuncionarioBiz();

            if (string.IsNullOrWhiteSpace(codigoFuncionario))
                throw new BusinessException("Código do funcionário inválido!");

            var query = new StringBuilder();

            query.Append($@"Delete From Funcionario_Cargo where Id_funcionario = '{codigoFuncionario.Trim()}'");

            query.Append($@"Delete From Funcionario_Complemento where Id_funcionario = '{codigoFuncionario.Trim()}'");

            query.AppendLine($@"DELETE FROM Funcionario where Id_Funcionario = '{codigoFuncionario.Trim()}'");

            mana._manager.SqlQueryUniq(query.ToString());

            return 0;
        }

        public static List<entities.Funcionario> GetAll(int skip, int take)
        {
            FuncionarioBiz mana = new FuncionarioBiz();
            var query = new StringBuilder();

            query.AppendLine($@"select f.*, fc.Endereco, fc.Cep, fc.Numero, fc.Complemento, fc.Bairro, fc.Estado,
                                fd.Departamento, fd.Cargo, fd.Salario, fd.DT_Inicio, fd.DT_fim
                                from Funcionario f
                                left join Funcionario_Complemento fc on f.Id_Funcionario = fc.Id_Funcionario
                                left join Funcionario_Cargo fd on f.Id_Funcionario = fd.Id_funcionario");

            return ConvertData(mana._manager.SqlQuery(query.ToString()));
        }
        public static List<entities.Funcionario> ConvertData(TableControl data)
        {
            var list = data.DataTable.Select().ToList().Select(item =>
                new entities.Funcionario()
                {
                    Codigo = item["Id_Funcionario"]?.ToString()?.TrimEnd(),
                    Nome = item["Nome"]?.ToString()?.TrimEnd(),
                    Apelido = item["Apelido"]?.ToString()?.TrimEnd(),
                    RG = item["RG"]?.ToString()?.TrimEnd(),
                    CPF = item["CPF"]?.ToString()?.TrimEnd(),
                    Telefone = item["Telefone"]?.ToString()?.TrimEnd(),
                    Celular = item["Celular"]?.ToString()?.TrimEnd(),
                    Email = item["EMAIL"]?.ToString()?.TrimEnd(),
                    DDD_Cell = item["DDD_Cell"]?.ToString()?.TrimEnd(),
                    Tipo_Cell = item["Tipo_Celular"]?.ToString()?.TrimEnd(),
                    Tipo_Tell = item["Tipo_Tell"]?.ToString()?.TrimEnd(),
                    DDD_Tell = item["DDD_Tell"]?.ToString()?.TrimEnd(),
                    DT_Nascimento = Convert.ToDateTime(item["DT_Nascimento"]).Date.ToString()?.TrimEnd(),
                    Ativo = item["Ativo"]?.ToInt32Nullable(),
                    Endereco = new entities.FuncionarioComplemento
                    {
                        Endereco = item["Endereco"]?.ToString()?.TrimEnd(),
                        Cep = item["Cep"]?.ToString()?.TrimEnd(),
                        Numero = item["Numero"]?.ToInt32Nullable(),
                        Complemento = item["Complemento"]?.ToString()?.TrimEnd(),
                        Bairro = item["Bairro"]?.ToString()?.TrimEnd(),
                        Estado = item["Estado"]?.ToString()?.TrimEnd(),

                    },
                    Cargo = new FuncionarioCargo
                    {
                        Departamento = item["Departamento"]?.ToString()?.TrimEnd(),
                        Cargo = item["Cargo"]?.ToString()?.TrimEnd(),
                        DT_Inicio = item["DT_Inicio"]?.ToString()?.TrimEnd(),
                        DT_Fim = item["DT_Fim"]?.ToString()?.TrimEnd(),
                        Salario = item["Salario"]?.ToString()?.TrimEnd(),
                    }
                }).ToList();

            return list;
        }

        public static entities.Funcionario Get(string codigofuncionario)
        {
            FuncionarioBiz mana = new FuncionarioBiz();
            var query = new StringBuilder();

            query.AppendLine($@"select f.*, fc.Endereco, fc.Cep, fc.Numero, fc.Complemento, fc.Bairro, fc.Estado,
                                fd.Departamento, fd.Cargo, fd.Salario, fd.DT_Inicio, fd.DT_fim
                                from Funcionario f
                                left join Funcionario_Complemento fc on f.Id_Funcionario = fc.Id_Funcionario
                                left join Funcionario_Cargo fd on f.Id_Funcionario = fd.Id_funcionario where f.Id_Funcionario = '{codigofuncionario.Trim()}'");

            var item = ConvertData(mana._manager.SqlQuery(query.ToString())).FirstOrDefault();
            item.DT_Nascimento = Convert.ToDateTime(item.DT_Nascimento).Date.ToString("dd/MM/yyyy");
            item.Cargo.DT_Inicio = Convert.ToDateTime(item.Cargo.DT_Inicio).Date.ToString("dd/MM/yyyy");
            item.Cargo.DT_Fim = Convert.ToDateTime(item.Cargo.DT_Fim).Date.ToString("dd/MM/yyyy");

            if (item.Cargo.DT_Fim == "01/01/1900")
                item.Cargo.DT_Fim = null;
            return item;
        }
        public static string GerarCodigo()
        {
            Random randNum = new Random();
            return randNum.Next().ToString();
        }
        public static bool CheckCPF(string cpf)
        {
            cpf = cpf.Trim();
            cpf = cpf.Replace(".", "").Replace("-", "");

            foreach (var i in "0123456789".ToCharArray())
                if (cpf == new string(i, 11))
                    return false;

            var multiplicador1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            var multiplicador2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            string tempCpf;
            string digito;
            int soma;
            int resto;
            if (cpf.Length != 11)
                return false;

            tempCpf = cpf.Substring(0, 9);
            soma = 0;

            for (int i = 0; i < 9; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador1[i];
            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = resto.ToString();
            tempCpf = tempCpf + digito;
            soma = 0;
            for (int i = 0; i < 10; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador2[i];
            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = digito + resto.ToString();
            return cpf.EndsWith(digito);
        }

        public static void TratamentoCampos(entities.Funcionario funcionario)
        {
            #region tratamento de campos que podem ser nulos
            if (string.IsNullOrEmpty(funcionario.Apelido))
                funcionario.Apelido = string.Empty;

            if (string.IsNullOrEmpty(funcionario.Telefone))
                funcionario.Telefone = string.Empty;

            if (string.IsNullOrEmpty(funcionario.DDD_Tell))
                funcionario.DDD_Tell = string.Empty;

            if (string.IsNullOrEmpty(funcionario.Cargo.Cargo))
                funcionario.Cargo.Cargo = string.Empty;

            if (string.IsNullOrEmpty(funcionario.Cargo.Departamento))
                funcionario.Cargo.Departamento = string.Empty;

            if (string.IsNullOrEmpty(funcionario.Tipo_Tell))
                funcionario.Tipo_Tell = string.Empty;

            if (string.IsNullOrEmpty(funcionario.Tipo_Cell))
                funcionario.Tipo_Cell = string.Empty;

            if (string.IsNullOrEmpty(funcionario.Endereco.Complemento))
                funcionario.Endereco.Complemento = string.Empty;

            if (!string.IsNullOrEmpty(funcionario.Cargo.DT_Fim))
                funcionario.Cargo.DT_Fim = Convert.ToDateTime(funcionario.Cargo.DT_Fim).ToString("yyyy-MM-dd HH:mm:ss");
            else
                funcionario.Cargo.DT_Fim = null;

            if (!string.IsNullOrEmpty(funcionario.DT_Nascimento))
                funcionario.DT_Nascimento = Convert.ToDateTime(funcionario.DT_Nascimento).ToString("yyyy-MM-dd HH:mm:ss");
            else
                funcionario.DT_Nascimento = null;

            #endregion
        }
    }
}
