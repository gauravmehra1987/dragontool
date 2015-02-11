using System.Web.UI.WebControls;
using AutoMapper;
using Combobulator.DAL;
using Combobulator.ViewModels;

namespace Combobulator.Config
{
    public static class CarAutoMapperConfig
    {
        public static void Configure()
        {
            Mapper.CreateMap<Car, CarViewModel>()
                .ForMember(d => d.Code, x => x.Ignore())
                .ForMember(d => d.Color, x => x.Ignore())
                .ForMember(d => d.Engine, x => x.Ignore())
                .ForMember(d => d.Name, x => x.Ignore())
                .ForMember(d => d.Capacity, x => x.Ignore())
                .ForMember(d => d.Luggage, x => x.Ignore())
                .ForMember(d => d.Lifestyle, x => x.Ignore())
                .ForMember(d => d.Awd, x => x.Ignore())
                .ForMember(d => d.High, x => x.Ignore())
                .ForMember(d => d.Convertible, x => x.Ignore())
                .ForMember(d => d.Price, x => x.Ignore())
                .ForMember(d => d.Cost, x => x.Ignore())
                .ForMember(d => d.Speed, x => x.Ignore())
                .ForMember(d => d.Mph, x => x.Ignore())
                .ForMember(d => d.Economy, x => x.Ignore())
                .ForMember(d => d.Mpg, x => x.Ignore())
                .ForMember(d => d.Alt_1, x => x.Ignore())
                .ForMember(d => d.Alt_2, x => x.Ignore())
                .ForMember(d => d.Alt_3, x => x.Ignore())
                ;
        }
    }
}