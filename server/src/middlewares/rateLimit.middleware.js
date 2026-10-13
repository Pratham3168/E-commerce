
import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redisClient } from "../config/connectRedis.js";

const limitResponse = {
  success: false,
  message: "Too many requests. Please try again later.",
};

// Create a separate Redis namespace for each limiter.
// This prevents their counters from colliding.
const createStore = (prefix) =>
  new RedisStore({
    prefix,
    sendCommand: (...args) => redisClient.sendCommand(args),
  });

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: limitResponse,
  store: createStore("rl:api:"),
  skip: (req) => req.path === "/health",
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: limitResponse,
  store: createStore("rl:auth:"),
});

export const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: limitResponse,
  store: createStore("rl:sensitive:"),
});
