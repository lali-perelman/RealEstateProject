using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using RealEstate.Api.Models;

namespace RealEstate.Api.Controllers;

[ApiController]
[Route("api/exec")]   
public class ExecController : ControllerBase
{
    private readonly IConfiguration _config;

    public ExecController(IConfiguration config)
    {
        _config = config;
    }

    [HttpPost] 
    public async Task<IActionResult> Execute([FromBody] ExecRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.ProcedureName))
            return BadRequest("procedureName is required");

        var connectionString = _config.GetConnectionString("DefaultConnection");

        using var connection = new SqlConnection(connectionString);
        using var command = new SqlCommand(request.ProcedureName, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        if (request.Parameters != null)
        {
            foreach (var param in request.Parameters)
            {
                object value;

                if (param.Value is System.Text.Json.JsonElement jsonElement)
                {
                    switch (jsonElement.ValueKind)
                    {
                        case System.Text.Json.JsonValueKind.Number:
                            if (jsonElement.TryGetInt32(out int intValue))
                                value = intValue;
                            else if (jsonElement.TryGetDecimal(out decimal decValue))
                                value = decValue;
                            else
                                value = jsonElement.GetDouble();
                            break;

                        case System.Text.Json.JsonValueKind.String:
                            value = jsonElement.GetString()!;
                            break;

                        case System.Text.Json.JsonValueKind.True:
                        case System.Text.Json.JsonValueKind.False:
                            value = jsonElement.GetBoolean();
                            break;

                        case System.Text.Json.JsonValueKind.Null:
                            value = DBNull.Value;
                            break;

                        default:
                            value = jsonElement.ToString();
                            break;
                    }
                }
                else
                {
                    value = param.Value ?? DBNull.Value;
                }

                command.Parameters.AddWithValue("@" + param.Key, value);
            }
        }

        await connection.OpenAsync();
        using var reader = await command.ExecuteReaderAsync();

        var result = new List<Dictionary<string, object?>>();

        while (await reader.ReadAsync())
        {
            var row = new Dictionary<string, object?>();

            for (int i = 0; i < reader.FieldCount; i++)
            {
                row[reader.GetName(i)] =
                    reader.IsDBNull(i) ? null : reader.GetValue(i);
            }

            result.Add(row);
        }

        return Ok(result);
    }
}