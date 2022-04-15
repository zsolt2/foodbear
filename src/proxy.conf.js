const PROXY_CONFIG = [
    {
        context: [
            "/api"
        ],
        target: process.env?.['BACKEND_URL'] || "http://localhost:3000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;