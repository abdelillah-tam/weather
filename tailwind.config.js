/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/app.component.html",
    "./src/app/dashboard/dashboard.component.html",
    "./src/app/dashboard/info/info.component.html",
    "./src/app/dashboard/cities/cities.component.html"
  ],
  theme: {
    extend: {}
    ,
    screens: {
      'mb': {
        'max': '799px'
      }
    }
  },
  plugins: [],
};
