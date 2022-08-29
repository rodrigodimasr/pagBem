using fiap.entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace fiap.data
{
    public class Manager
    {
        private HttpContext _mContext;

        public Manager() : this(System.Web.HttpContext.Current)
        {
        }
        public Manager(HttpContext pContext)
        {
            _mContext = pContext;

            if (pContext.Session["Connection"] == null)
                pContext.Session.Add("Connection", new DataConnection());


        }



        #region SqlStatment
        public TableControl SqlQuery(string pQuery)
        {
            return new TableControl(DataConnection.SqlQuery(pQuery));
        }
        public TableControl SqlQuery(string commandtext, string sortexpression, int skip, int take)
        {
            return new TableControl(DataConnection.SqlQuery(commandtext, sortexpression, skip, take));
        }
        public TableControl SqlQuery(string commandtext, int take)
        {
            return new TableControl(DataConnection.SqlQuery(commandtext, take));
        }
        public string SqlQueryUniq(string pQuery)
        {
            return DataConnection.SqlQueryUniq(pQuery);
        }

        public int SqlExecute(string pQuery)
        {
            try
            {
                return DataConnection.SqlExecute(pQuery);
            }
            catch (Exception ex)
            {
                throw new DataAccessLayerException(ex.Message);
            }
        }
        #endregion


        public bool ValidaDigitoVerificador(string numDado, int numDig, int limMult)
        {
            try
            {
                string dado = "", digito = "";
                int mult, soma, n;

                dado = numDado.Substring(0, 12);
                for (n = 0; n < numDig; n++)
                {
                    soma = 0;
                    mult = 2 - n;
                    for (var i = dado.Length - 1; i >= 1; i--)
                    {
                        soma = soma + mult * Convert.ToInt32(dado.Substring(i, 1));
                        mult += 1;
                        if (mult > limMult) mult = 2;
                    }
                    digito = (((soma * 10) % 11) % 10).ToString();
                    dado += (digito == "0" ? "1" : digito);
                }
                return (dado == numDado);
            }
            catch { return false; }
        }

        public DataConnection DataConnection
        {
            get { return ((DataConnection)_mContext.Session["Connection"]); }
        }
        public entities.Funcionario funcionario
        {
            get { return ((entities.Funcionario)_mContext.Session["funcionario"]); }
            set { _mContext.Session["funcionario"] = value; }
        }
        public System.Web.HttpContext Context
        {
            get { return _mContext; }
            set { _mContext = value; }
        }
    }
}