import Redis from "ioredis";
import { envs } from "../../configs/env.config";

let redis: Redis;

export const initRedis = () => {
  const port = Number(envs.REDIS_PORT);
  const host = envs.REDIS_HOST;

  if (!redis) {
    redis = new Redis({
      port,
      host,
      maxRetriesPerRequest: 0,
      enableOfflineQueue: false,
    });

    redis.on("connect", () => console.log(`✅ Redis initialized successfully`));
    redis.on("error", (err) =>
      console.log(`❌ Error initialazing error : ${err.message}`),
    );
  }
};

export const getRedisClient = () => {
  if (!redis) {
    throw new Error("❌ Redis is not initialized yet");
  }
  return redis;
};
