 import daisyui from "daisyui"
 
 /** @type {import('tailwindcss').Config} */
export default {
   content: [
        "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <- must include all files in src

  ],
   theme: {
     extend: {},
   },
   plugins: [daisyui],
 }
