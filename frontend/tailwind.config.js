/** @type {import('tailwindcss').Config} */
module.exports = {
  // important:true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
