import mongoose from 'mongoose';
import { redisClient } from '../config/connectRedis.js';

export const healthCheck = (req, res) => {
	const mongoHealthy = mongoose.connection.readyState === 1;
	const redisHealthy = redisClient.isReady;
	const healthy = mongoHealthy && redisHealthy;

	res.status(healthy ? 200 : 503).json({
		success: healthy,
		status: healthy ? 'ok' : 'degraded',
		services: {
			mongodb: mongoHealthy ? 'up' : 'down',
			redis: redisHealthy ? 'up' : 'down',
		},
	});
};
