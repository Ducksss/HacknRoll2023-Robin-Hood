module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            "primary-light": "#1fb6ff",
            "primary-dark": "#7e5bef"
        },
        extend: {
            animation: {
                "spin-slow": "spin 20s linear infinite"
            }
        }
    },
    plugins: []
};
