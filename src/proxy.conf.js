const PROXY_CONFIG = [
    {
        context: [
            "/api"
        ],
        target: process.env?.['BACKEND_URL'] || "http://localhost:3001",
        secure: false
    }
]

module.exports = PROXY_CONFIG;