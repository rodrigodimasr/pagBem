using System.Web;
using System.Web.Optimization;

namespace fiap
{
    public class BundleConfig
    {
        // Para obter mais informações sobre o agrupamento, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use a versão em desenvolvimento do Modernizr para desenvolver e aprender. Em seguida, quando estiver
            // pronto para a produção, utilize a ferramenta de build em https://modernizr.com para escolher somente os testes que precisa.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/app/core")
                        .Include(new string[]
                        {
                            "~/app/core/app.module.js",
                            "~/app/core/app.routes.js",
                            "~/app/core/app.run.js",
                            "~/app/core/app.directives.js",
                            "~/app/core/app.filter.js",
                            "~/app/core/app.config.js",
                        }));
            bundles.Add(new ScriptBundle("~/bundles/app/controllers").Include(new string[] { "~/app/controllers/*.js" }));
            bundles.Add(new ScriptBundle("~/bundles/app/services").Include(new string[] { "~/app/services/*.js" }));
        }
    }
}
