import { SmartMemory, SmartBuckets } from "../../src/utils/raindropClient.js";

export async function handler() {
  try {
    const metrics = await SmartBuckets.get("metrics", "latest");
    let decision = "idle";

    if (metrics) {
      if (metrics.canaryLatency < metrics.prodLatency) {
        decision = "promote";
      } else if (metrics.canaryLatency > metrics.prodLatency) {
        decision = "rollback";
      } else {
        decision = "idle";
      }

      await SmartMemory.remember("decision", { decision, metrics });
    }

    console.log("🧠 GovernorAgent decision:", decision, metrics);

    return {
      statusCode: 200,
      body: JSON.stringify({ decision, metrics }),
    };
  } catch (err) {
    console.error("GovernorAgent error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.toString() }) };
  }
}
