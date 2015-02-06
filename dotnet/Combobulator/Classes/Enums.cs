using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;

namespace Combobulator.Classes
{
    public class Enums
    {
        public enum eMasterResponseCode
        {
            [Description("System ID is invalid")]
            SystemIdInvalid = 101,
            [Description("Checksum is invalid – Either not 10 characters or incorrect")]
            ChecksumInvalid = 102,
            [Description("Customer reference is unknown")]
            CustomerReferenceUnknown = 103,
            [Description("Random value is invalid – Either not 10 characters or alphanumeric")]
            RandomValueInvalid = 104,
            [Description("System ID parameter not supplied")]
            SystemIdNotSupplied = 201,
            [Description("Checksum parameter not supplied")]
            ChecksumNotSupplied = 202,
            [Description("Random parameter not supplied")]
            RandomNotSupplied = 203,
            [Description("Customer reference parameter not supplied")]
            CustomerReferenceNotSupplied = 204,
            [Description("Outcome parameter not supplied")]
            OutcomeNotSupplied = 205,
            [Description("Received parameter not supplied")]
            ReceivedParameterNotSupplied = 206,
            [Description("Outcome successfully saved")]
            OutSuccessfullySaved = 301,
            [Description("Missing outcome parameters")]
            MissingOutcomeParameter = 302,
            [Description("Invalid parameter values")]
            ParameterValuesInvalid = 303,
            [Description("Unable to save outcome data")]
            UnableToSaveOutcomeData = 304,
            [Description("Unable to decode outcome")]
            UnableToDecodeOutcome = 305,
            [Description("Invalid action")]
            InvalidAction = 401,
            [Description("Action parameter not supplied")]
            ActionParameterNotSupplied = 402
        }

        public enum CapacityScale
        {
            [Description("1-2 people")]
            CapacityScale1 = 1,
            [Description("1-4 people (including car seat)")]
            CapacityScale2 = 2,
            [Description("1-2 adults + 1-2 children/1 adult + 3 children")]
            CapacityScale3 = 3,
            [Description("5 people")]
            CapacityScale4 = 4
        }

        public enum LuggageLevel
        {
            [Description("Minimalist")]
            LuggageLevel1 = 1,
            [Description("Light packer")]
            LuggageLevel2 = 2,
            [Description("Lugger")]
            LuggageLevel3 = 3,
            [Description("Big loader")]
            LuggageLevel4 = 4
        }

        public enum Options
        {
            [Description("4WD")]
            Options1 = 1,
            [Description("Drop top")]
            Options2 = 2,
            [Description("Elevated driving position")]
            Options3 = 3,
            [Description("Teleportation (loading effect)")]
            Options4 = 4
        }

        public enum PriceRange
        {
            [Description("TOY CAR 1-190")]
            Options0 = 0,
            [Description("191-215")]
            Options1 = 1,
            [Description("126-245")]
            Options2 = 2,
            [Description("246-269")]
            Options3 = 3,
            [Description("270-294")]
            Options4 = 4,
            [Description("295+")]
            Options5 = 5
        }

        public enum PerformanceScale
        {
            [Description("105-120mph (nippy)")]
            PerformanceScale1 = 1,
            [Description("121-130 (nippier)")]
            PerformanceScale2 = 2,
            [Description("131-140 (quick)")]
            PerformanceScale3 = 3,
            [Description("141-145 + (woohooo)")]
            PerformanceScale4 = 4,
            [Description("Light Speed (presents 'Rocket car')")]
            PerformanceScale5 = 5
        }

        public enum EconomyScale
        {
            [Description("25-45 (min economic)")]
            EconomyScale1 = 1,
            [Description("46-60")]
            EconomyScale2 = 2,
            [Description("61-69")]
            EconomyScale3 = 3,
            [Description("70-80 + (max economic)")]
            EconomyScale4 = 4
        }

        public enum Use
        {
            [Description("Urbanite")]
            Use1 = 1,
            [Description("Beach Bum")]
            Use2 = 2,
            [Description("Mountain Ranger")]
            Use3 = 3,
            [Description("Junglist")]
            Use4 = 4
        }
    }
}