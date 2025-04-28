/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary: {
          DEFAULT:"#2260FF",
          LESS:"#CAD6FF"
        },
        secondary:"#FFFFFF",
        black:"#000000"
      },
      fontFamily: {
        LSpartanthin: ["LeagueSpartan-ExtraLight", "sans-serif"],
        LSpartanSB:["LeagueSpartan-SemiBold","sans-serif"],
        LSLight:["LeagueSpartan-Light","sans-serif"],
        LSBold:["LeagueSpartan-Bold","sans-serif"],
        LSRegular:["LeagueSpartan-Regular","sans-serif"]
      }
    }
  },
  plugins: [],
}