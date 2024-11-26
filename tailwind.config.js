module.exports = {
  content: [
  "./src/**/*.{js,jsx,ts,tsx}", // Add all React files for scanning
  "./public/index.html",        // Scan `index.html`
],
theme: {
    extend: {
      colors: {
        primary: '#007bff',     // Define custom colors
        secondary: '#6c757d',
        background: '#f8f9fa',
      },
    },
  },
  plugins: [],
};
