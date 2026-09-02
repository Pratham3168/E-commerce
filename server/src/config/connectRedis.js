import {createClient} from 'redis';

const redisClient =  createClient({
    url: process.env.REDIS_URL,
});

redisClient.on("error",(err) => {
    console.error("Redis Client Error", err);
});

const connectRedis = async () => {
    try{
        await redisClient.connect();
        console.log("Redis connected successfully");
    }
    catch(err){
        console.error("Redis connection failed", err);
        process.exit(1);
    }
};

export {redisClient, connectRedis};