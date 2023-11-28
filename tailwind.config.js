/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "bg-primary":"#000000",
        "text-primary":"#F5F5F5",
        "text-secondary":"#858585",
        "hover-primary":"#1A1A1A",
        "text-tag":"#E6F5F5",
        "text-link":"#008CE7",
        "modal-bg":"#262626",
        "profile-button-bg":"#363636",
        "google-button":"#D52D28",
        "bg-blue":"#3B82F6",
        "story-border":"linear-gradient(45deg, rgba(131,58,180,1) 0%, rgba(255,220,128,1) 8%, rgba(252,175,69,1) 19%, rgba(247,119,55,1) 25%, rgba(245,96,64,1) 32%, rgba(253,29,29,1) 42%, rgba(225,48,108,1) 49%, rgba(181,54,141,1) 55%, rgba(193,53,132,1) 68%, rgba(131,58,180,1) 79%, rgba(88,81,216,1) 92%, rgba(64,93,230,1) 100%)",
      }
    },
  },
  plugins: [],
}