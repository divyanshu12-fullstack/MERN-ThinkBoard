import ratelimit from "../src/config/upstash.js";
const rateLimiter = async function name(_req, res, next) {
    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later",
            });
        }
        next();
    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
};

export default rateLimiter;