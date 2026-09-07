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

  for await (const key of redisClient.scanIterator({
    MATCH: pattern,
    COUNT: 100,
  })) {
    keys.push(key);
  }

  if (keys.length > 0) {
    await redisClient.del(keys);
  }
};

export {getCache, setCache, deleteCache,deleteCacheByPattern};