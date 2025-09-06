export const downloadCSV = (students) => {
  if (!students || students.length === 0) return;

  // Create CSV header
  const header = Object.keys(students[0]).join(",");
  const rows = students.map(student => 
    Object.values(student)
      .map(value => `"${value}"`) // Wrap values in quotes
      .join(",")
  );

  const csvContent = [header, ...rows].join("\n");

  // Create a downloadable link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "students_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
