using System;
using System.Net;
using System.Web.Helpers;
using System.Web.Mvc;

namespace Combobulator.Helpers
{
    public class ValidateAjaxAntiForgeryToken : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            var request = filterContext.HttpContext.Request;

            //  Only validate POSTs
            if (request.HttpMethod == WebRequestMethods.Http.Post)
            {
                //  Ajax POSTs and normal form posts have to be treated differently when it comes
                //  to validating the AntiForgeryToken
                if (request.IsAjaxRequest())
                {
                    var antiForgeryCookie = request.Cookies[AntiForgeryConfig.CookieName];

                    var cookieValue = antiForgeryCookie != null
                        ? antiForgeryCookie.Value
                        : null;

                    var token = request.Headers.Get("__RequestVerificationToken");

                    AntiForgery.Validate(cookieValue, token);
                }
            }
        }
    }
}