module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            "primary-light": "#1fb6ff",
            "primary-dark": "#293056"
        },
        extend: {
            animation: {
                "spin-slow": "spin 20s linear infinite"
            }
        }
    },
    plugins: []
};
