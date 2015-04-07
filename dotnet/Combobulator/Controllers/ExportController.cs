using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Web.Mvc;
using Combobulator.Business.ViewModels;
using CsvHelper;
using Newtonsoft.Json;

namespace Combobulator.Controllers
{
    public class ExportController : Controller
    {
        public FileStreamResult Index()
        {
            var result = WriteCsvToMemory();
            var memoryStream = new MemoryStream(result);
            return new FileStreamResult(memoryStream, "text/csv") { FileDownloadName = "export.csv" };
        }

        public byte[] WriteCsvToMemory()
        {
            var file = Server.MapPath("~/App_Data/data.json");
            var json = System.IO.File.ReadAllText(file);
            var dataViewModel = JsonConvert.DeserializeObject<List<DataViewModel>>(json);

            using (var memoryStream = new MemoryStream())
            using (var streamWriter = new StreamWriter(memoryStream))
            using (var csvWriter = new CsvWriter(streamWriter))
            {
                csvWriter.WriteRecords(dataViewModel);
                streamWriter.Flush();
                return memoryStream.ToArray();
            }
        }
    }
}
