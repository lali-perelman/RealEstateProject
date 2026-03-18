namespace RealEstate.Api.Models;

public class ExecRequest
{
    public string ProcedureName { get; set; } = string.Empty;
    public Dictionary<string, object>? Parameters { get; set; }
}