import React, { useState } from "react";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en-US", name: "English (US)", flag: "🇺🇸" },
    { code: "pt-BR", name: "Português (BR)", flag: "🇧🇷" },
    { code: "sv-SE", name: "Svenska (SE)", flag: "🇸🇪" },
    { code: "es-AR", name: "Español (AR)", flag: "🇦🇷" },
    { code: "es-CL", name: "Español (CL)", flag: "🇨🇱" },
    { code: "es-ES", name: "Español (ES)", flag: "🇪🇸" },
  ];

  return (
    <div className="relative">
      {/* Language Selector Button */}
      <button
        onMouseEnter={() => setIsOpen(true)} // Open dropdown on hover
        className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        🌐 Language ▼
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute mt-2 w-40 bg-white shadow-lg rounded"
          onMouseLeave={() => setIsOpen(false)} // Close dropdown only when leaving the list
          onMouseEnter={() => setIsOpen(true)} // Keep dropdown open when hovering over the list
        >
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="block px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer"
              onClick={() => setIsOpen(false)} // Close dropdown on selection
            >
              <span>{lang.flag}</span>
              <span className="ml-2">{lang.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
