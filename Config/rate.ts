import rateLimit from "express-rate-limit";

export class Limiter {
    public static rateLimit = rateLimit({
        windowMs: parseInt(process.env.WINDOW_RATE_LIMIT!),
        max: parseInt(process.env.MAX_RATE_LIMIT!),
        message: "Too many requests, please try again later.",
    });

    public static slowDown = rateLimit({
        windowMs: parseInt(process.env.WINDOW_RATE_LIMIT!),
        delayAfter: parseInt(process.env.DELAY_AFTER!),
        delayMs: parseInt(process.env.DELAY_MS!),
    });

    public static speedLimiter = rateLimit({
        windowMs: parseInt(process.env.WINDOW_RATE_LIMIT!),
        max: parseInt(process.env.MAX_RATE_LIMIT!),
        delayAfter: parseInt(process.env.DELAY_AFTER!),
        delayMs: parseInt(process.env.DELAY_MS!),
    });

    public static speedLimiterUsingSkip = rateLimit({
        windowMs: parseInt(process.env.WINDOW_RATE_LIMIT!),
        max: parseInt(process.env.MAX_RATE_LIMIT!),
        delayAfter: parseInt(process.env.DELAY_AFTER!),
        delayMs: parseInt(process.env.DELAY_MS!),
        skip: (req, res) => {
            return req.body.skip;
        },
    });

    public static speedLimiterUsingSkipFunction = rateLimit({
        windowMs: parseInt(process.env.WINDOW_RATE_LIMIT!),
        max: parseInt(process.env.MAX_RATE_LIMIT!),
        delayAfter: parseInt(process.env.DELAY_AFTER!),
        delayMs: parseInt(process.env.DELAY_MS!),
        skip: (req, res) => {
            return req.body.skip;
        },
    });
}