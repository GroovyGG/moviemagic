// cors.js
function setCorsHeaders(req, res) {
    const allowedOrigins = ["https://movie.bihanzhu.com", "https://moviemagic-eosin.vercel.app","http://localhost:3000"];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
}

export default setCorsHeaders;
