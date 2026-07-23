namespace ItemCategorizerApi.Models
{
    public class Items
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public DateTime Time { get; set; }
        public string? PersonToEdit { get; set; }

    }
}
