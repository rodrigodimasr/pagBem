using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fiap.Helper
{
    public class Json
    {
        public static JsonSerializerSettings SerializerSettings
        {
            get
            {
                var settings = new JsonSerializerSettings
                {
                    //DateFormatString = "dd/MM/yyyy HH:mm",
                    DateTimeZoneHandling = DateTimeZoneHandling.Local,
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    //PreserveReferencesHandling = PreserveReferencesHandling.All,
                    Formatting = Formatting.None,
                    DateFormatHandling = DateFormatHandling.IsoDateFormat,
                };
                return settings;
            }
        }
    }
    public class JsonResponse
    {
        public JsonResponseStatus Status { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
        public Exception Exception { get; set; }
    }
    public enum JsonResponseStatus { AvisoLicenciamento = 1, Êxito = 0, Falha = -1, LicenciamentoPendente = -2 }
}