﻿namespace Selu383.SP24.Api.Features.Hotels;

public class HotelDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? City {  get; set; }
    public string? State { get; set; }
    public string? PostalCode { get; set; }
    public int? ManagerId { get; set; }
}
