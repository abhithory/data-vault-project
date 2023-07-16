/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '0.7rem',
        base: '0.8rem',
        lg:'1rem'
      },
      colors:{
        'primary':"#4D92FF", //pink-500
        'primary-hover':"#2372f1", //pink-500
        'primary-bg':"#010220", //#09162e
        'secondary':"rgb(147 51 234)", // 
        'secondary-hover':"#a64ef5", // 
        'third':"#5E17EB",
        'highlight':"#FCB040",
        'text-color':"#FFFFFF",
        'text-color-2':"#000",
      }
    },
  },
  plugins: [],
}

