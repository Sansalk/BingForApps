using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using BingForApps.Models;

namespace BingForApps.Controllers
{

    public class ValuesController : ApiController
    {
        // GET api/values/5
        [HttpPost]
        //public Task<HttpResponseMessage> Post(string searchString)
        public Task<HttpResponseMessage> Post(SearchQuery searchQuery)
        {
            searchQuery.PageCount = searchQuery.PageCount*10;
            return MakeRequest(searchQuery);
        }

        static async Task<HttpResponseMessage> MakeRequest(SearchQuery searchQuery)
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "32db156ec3174bca95ff8de5f0ca6c4a");

            // Request parameters
            queryString["q"] = searchQuery.SearchString;
            queryString["count"] = "10";
            queryString["offset"] = searchQuery.PageCount.ToString(); 
            queryString["mkt"] = "en-us";
            queryString["safesearch"] = "Moderate";
            var uri = "https://api.cognitive.microsoft.com/bing/v5.0/search?" + queryString;

             var data  = await client.GetAsync(uri);

            return data;
        }
    }
}
