import {redisClient} from '../config/connectRedis.js';

const getCache = async (key) => {
    return await redisClient.get(key);
}

const setCache = async (key, value,ttl) => {
    await redisClient.set(key,JSON.stringify(value), {
        EX: ttl
    });
};

const deleteCache = async (key) => {
    await redisClient.del(key);
};

const deleteCacheByPattern = async (pattern) => {
  const keys = [];

  for await (const batch of redisClient.scanIterator({
    MATCH: pattern,
    COUNT: 100,
  })) {
    keys.push(...batch);
  }

  if (keys.length > 0) {
    for (const key of keys) {
        await redisClient.del(key);
    }
  }
};

export {getCache, setCache, deleteCache,deleteCacheByPattern};