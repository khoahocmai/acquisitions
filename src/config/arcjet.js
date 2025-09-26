import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE"
    }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:PREVIEW",
        "POSTMAN",
      ],
    }),
    slidingWindow({
      mode: "LIVE",
      max: 5,
      interval: '1m',
    }),
  ],
});

export default aj;