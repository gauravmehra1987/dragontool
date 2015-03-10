using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;

namespace Combobulator.Common.Enums
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
}
