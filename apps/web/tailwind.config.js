/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("tailwindcss-preset-px-to-rem")],
  theme: {
    extend: {
      fontSize: {
        // 32px
        "32-700": [
          "32px",
          { lineHeight: "44px", letterSpacing: "-0.3px", fontWeight: "700" },
        ],

        // 28px
        "28-700": [
          "28px",
          { lineHeight: "40px", letterSpacing: "-0.3px", fontWeight: "700" },
        ],
        "28-500": [
          "28px",
          { lineHeight: "40px", letterSpacing: "-0.3px", fontWeight: "500" },
        ],

        // 24px
        "24-700": [
          "24px",
          { lineHeight: "36px", letterSpacing: "-0.3px", fontWeight: "700" },
        ],
        "24-500": [
          "24px",
          { lineHeight: "36px", letterSpacing: "-0.3px", fontWeight: "500" },
        ],

        // 20px
        "20-700": [
          "20px",
          { lineHeight: "32px", letterSpacing: "-0.3px", fontWeight: "700" },
        ],
        "20-500": [
          "20px",
          { lineHeight: "32px", letterSpacing: "-0.3px", fontWeight: "500" },
        ],
        "20-400": [
          "20px",
          { lineHeight: "32px", letterSpacing: "-0.3px", fontWeight: "400" },
        ],

        // 18px
        "18-700": [
          "18px",
          { lineHeight: "30px", letterSpacing: "-0.3px", fontWeight: "700" },
        ],
        "18-500": [
          "18px",
          { lineHeight: "30px", letterSpacing: "-0.3px", fontWeight: "500" },
        ],
        "18-400": [
          "18px",
          { lineHeight: "30px", letterSpacing: "-0.3px", fontWeight: "400" },
        ],

        // 17px
        "17-700": [
          "17px",
          { lineHeight: "28px", letterSpacing: "-0.3px", fontWeight: "700" },
        ],
        "17-500": [
          "17px",
          { lineHeight: "28px", letterSpacing: "-0.3px", fontWeight: "500" },
        ],
        "17-400": [
          "17px",
          { lineHeight: "28px", letterSpacing: "-0.3px", fontWeight: "400" },
        ],

        // 16px
        "16-700": [
          "16px",
          { lineHeight: "27px", letterSpacing: "-0.3px", fontWeight: "700" },
        ],
        "16-500": [
          "16px",
          { lineHeight: "27px", letterSpacing: "-0.3px", fontWeight: "500" },
        ],
        "16-400": [
          "16px",
          { lineHeight: "27px", letterSpacing: "-0.3px", fontWeight: "400" },
        ],

        // 15px
        "15-700": [
          "15px",
          { lineHeight: "25px", letterSpacing: "-0.3px", fontWeight: "700" },
        ],
        "15-500": [
          "15px",
          { lineHeight: "25px", letterSpacing: "-0.3px", fontWeight: "500" },
        ],
        "15-400": [
          "15px",
          { lineHeight: "25px", letterSpacing: "-0.3px", fontWeight: "400" },
        ],

        // 14px
        "14-700": [
          "14px",
          { lineHeight: "24px", letterSpacing: "-0.3px", fontWeight: "700" },
        ],
        "14-500": [
          "14px",
          { lineHeight: "24px", letterSpacing: "-0.3px", fontWeight: "500" },
        ],
        "14-400": [
          "14px",
          { lineHeight: "24px", letterSpacing: "-0.3px", fontWeight: "400" },
        ],

        // 13px
        "13-700": [
          "13px",
          { lineHeight: "21px", letterSpacing: "-0.3px", fontWeight: "700" },
        ],
        "13-600": [
          "13px",
          { lineHeight: "21px", letterSpacing: "-0.3px", fontWeight: "600" },
        ],
        "13-500": [
          "13px",
          { lineHeight: "21px", letterSpacing: "-0.3px", fontWeight: "500" },
        ],

        // 12px
        "12-700": [
          "12px",
          { lineHeight: "20px", letterSpacing: "-0.3px", fontWeight: "700" },
        ],
        "12-500": [
          "12px",
          { lineHeight: "20px", letterSpacing: "-0.3px", fontWeight: "500" },
        ],
        "12-400": [
          "12px",
          { lineHeight: "20px", letterSpacing: "-0.3px", fontWeight: "400" },
        ],

        // 11px
        "11-700": [
          "11px",
          { lineHeight: "18px", letterSpacing: "-0.3px", fontWeight: "700" },
        ],
        "11-500": [
          "11px",
          { lineHeight: "18px", letterSpacing: "-0.3px", fontWeight: "500" },
        ],
        "11-400": [
          "11px",
          { lineHeight: "18px", letterSpacing: "-0.3px", fontWeight: "400" },
        ],
      },
    },
  },
  plugins: [],
};
