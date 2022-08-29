using fiap.Helper;
using Newtonsoft.Json;
using System;
using System.Web.Mvc;

namespace fiap.Controllers
{
    public class FuncionarioController : Controller
    {
        // GET: funcionario
        public ActionResult Index()
        {
            return PartialView();
        }

        public ActionResult Add()
        {
            return PartialView();
        }
        public ActionResult Detail()
        {
            return PartialView();
        }

        [HttpPost]
        public ActionResult GetAll(int skip, int take)
        {
            var response = new JsonResponse();
            try
            {
                response.Data = biz.FuncionarioBiz.GetAll(skip, take);
                response.Status = JsonResponseStatus.Êxito;
            }
            catch (Exception ex)
            {
                response.Status = JsonResponseStatus.Falha;
                response.Message = ex.Message; response.Exception = ex;
            }

            var json = JsonConvert.SerializeObject(response, Helper.Json.SerializerSettings);
            return new ContentResult { Content = json, ContentType = "application/json" };
        }
        public ActionResult Edit()
        {
            return PartialView();
        }

        [HttpPost]
        public ActionResult Get(string codigofuncionario)
        {
            var response = new JsonResponse();
            try
            {
                response.Data = biz.FuncionarioBiz.Get(codigofuncionario);
                response.Status = JsonResponseStatus.Êxito;
            }
            catch (Exception ex)
            {
                response.Status = JsonResponseStatus.Falha;
                response.Message = ex.Message; response.Exception = ex;
            }

            var json = JsonConvert.SerializeObject(response, Helper.Json.SerializerSettings);
            return new ContentResult { Content = json, ContentType = "application/json" };
        }

        [HttpPost]
        public ActionResult Update(entities.Funcionario item)
        {
            var response = new JsonResponse();
            try
            {
                response.Data = biz.FuncionarioBiz.Update(item);
                response.Status = JsonResponseStatus.Êxito;
            }
            catch (Exception ex)
            {
                response.Status = JsonResponseStatus.Falha;
                response.Message = ex.Message; response.Exception = ex;
            }


            var json = JsonConvert.SerializeObject(response, Helper.Json.SerializerSettings);
            return new ContentResult { Content = json, ContentType = "application/json" };
        }

        [HttpPost]
        public ActionResult ValidaCpf(string cpf)
        {
            var response = new JsonResponse();
            try
            {
                var result = biz.FuncionarioBiz.CheckCPF(cpf);
                response.Data = (result ? true : false);
                response.Status = JsonResponseStatus.Êxito;
            }
            catch (Exception ex)
            {
                response.Status = JsonResponseStatus.Falha;
                response.Message = ex.Message; response.Exception = ex;
            }

            var json = JsonConvert.SerializeObject(response, Helper.Json.SerializerSettings);
            return new ContentResult { Content = json, ContentType = "application/json" };

        }

        [HttpPost]
        public ActionResult Save(entities.Funcionario item)
        {
            var response = new JsonResponse();
            try
            {
                response.Data = biz.FuncionarioBiz.Save(item);
                response.Status = JsonResponseStatus.Êxito;
            }
            catch (Exception ex)
            {
                response.Status = JsonResponseStatus.Falha;
                response.Message = ex.Message; response.Exception = ex;
            }

            var json = JsonConvert.SerializeObject(response, Helper.Json.SerializerSettings);
            return new ContentResult { Content = json, ContentType = "application/json" };
        }
        [HttpPost]
        public ActionResult Delete(string codigo_funcionario)
        {
            var response = new JsonResponse();
            try
            {
                response.Data = biz.FuncionarioBiz.Delete(codigo_funcionario);
                response.Status = JsonResponseStatus.Êxito;
            }
            catch (Exception ex)
            {
                response.Status = JsonResponseStatus.Falha;
                response.Message = ex.Message; response.Exception = ex;
            }


            var json = JsonConvert.SerializeObject(response, Helper.Json.SerializerSettings);
            return new ContentResult { Content = json, ContentType = "application/json" };
        }
    }
}
