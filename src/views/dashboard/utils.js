const formatColumnName = (snakeCase) => {
    return snakeCase
      .split("_") // Tách từ bằng dấu "_"
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu
      .join(" "); // Nối lại thành chuỗi
  };
  
  export default formatColumnName;  