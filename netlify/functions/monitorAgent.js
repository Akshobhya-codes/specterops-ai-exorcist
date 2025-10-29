// netlify/functions/monitorAgent.js
import { SmartBuckets } from "../../src/utils/raindropClient.js";



export async function handler() {
  try {
    console.log("📈 MonitorAgent invoked");

    const metrics = {
      prodLatency: Math.round(Math.random() * 100 + 100),
      canaryLatency: Math.round(Math.random() * 100 + 100),
      timestamp: Date.now(),
    };

    // store the latest metrics in Raindrop SmartBucket
    await SmartBuckets.put("metrics", "latest", metrics);

    console.log("Metrics stored:", metrics);

    return {
      statusCode: 200,
      body: JSON.stringify(metrics),
    };
  } catch (err) {
    console.error("MonitorAgent error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.toString() }) };
  }
}
