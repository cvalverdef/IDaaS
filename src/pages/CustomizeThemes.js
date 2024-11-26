import React, { useState } from "react";

const CustomizeThemes = () => {
  const [theme, setTheme] = useState({
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#f8f9fa",
    text: "#343a40",
  });

  const updateTheme = (key, value) => {
    setTheme({ ...theme, [key]: value });
    document.documentElement.style.setProperty(`--${key}-color`, value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Customize Themes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(theme).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-2 text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)} Color</label>
            <input
              type="color"
              value={value}
              onChange={(e) => updateTheme(key, e.target.value)}
              className="w-full h-10 p-2 rounded border"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomizeThemes;
