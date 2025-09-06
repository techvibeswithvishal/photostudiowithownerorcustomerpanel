function generateCSV(data) {
  if (!data || data.length === 0) return "";

  // CSV header
  const header = Object.keys(data[0]).join(",");
  
  // CSV rows
  const rows = data.map(item => 
    Object.values(item)
      .map(value => `"${value}"`) // Wrap each value in quotes
      .join(",")
  );

  return [header, ...rows].join("\n");
}

module.exports = { generateCSV };
