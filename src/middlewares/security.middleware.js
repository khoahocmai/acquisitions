import aj from '#config/arcjet.js';
import logger from "#config/logger.js";
import { slidingWindow } from '@arcjet/node';

const securityMiddleware = async (req, res, next) => {
  try {
    const role = req.user ? req.user.role : 'guest';
    let limit, message;
    switch (role) {
      case 'admin':
        limit = 20;
        message = 'Admin request limit exceeded (20 requests per minutes)';
        break;
      case 'user':
        limit = 10;
        message = 'User request limit exceeded (10 requests per minutes)';
        break;
      default:
        limit = 5;
        message = 'Guest request limit exceeded (5 requests per minutes)';
    }

    const client = aj.withRule(slidingWindow({ mode: "LIVE", max: limit, interval: '1m', name: `${role}-rate-limit` }));
    const decision = await client.protect(req);
    if (decision.isDenied() && decision.reason.isBot()) {
      logger.warn(`Bot detected`, { ip: req.ip, userAgent: req.headers['user-agent'], path: req.path });
      return res.status(429).send({ error: "You're a bot", message: "Automated requests are not allowed" });
    }

    if (decision.isDenied() && decision.reason.isRateLimit()) {
      logger.warn(`Rate limit exceeded`, { ip: req.ip, userAgent: req.headers['user-agent'], path: req.path, method: req.method });
      return res.status(429).send({ error: "Too Many Requests", message: "Rate limit exceeded" });
    }

    if (decision.isDenied() && decision.reason.isShield) {
      logger.warn(`Shield detected`, { ip: req.ip, userAgent: req.headers['user-agent'], path: req.path, method: req.method });
      return res.status(403).send({ error: "Forbidden", message: "Request blocked by security shield" });
    }

    next();
  } catch (error) {
    logger.error(`Arcjet middleware error: ${error}`);
    return res.status(500).send({ error: "Internal Server Error", message: 'Something went wrong' });
  }
};

export default securityMiddleware;