using fiap.Helper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace fiap.Controllers
{
    public class entidadeAuxiliarController : Controller
    {

        [HttpGet]
        public ActionResult GetAllEstado()
        {
            var response = new JsonResponse();
            try
            {
                response.Data = biz.EstadoBiz.GetAll();
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
