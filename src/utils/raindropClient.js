// src/utils/raindropClient.js
// local SmartMemory / SmartBuckets mock for demo purposes
const memory = {};
const buckets = {};

export const SmartMemory = {
  async remember(type, data) {
    if (!memory[type]) memory[type] = [];
    memory[type].push(data);
    console.log("🧠 Memory stored:", type, data);
    return data;
  },
  async recall(type) {
    return memory[type] || [];
  },
};

export const SmartBuckets = {
  async put(bucket, key, value) {
    if (!buckets[bucket]) buckets[bucket] = {};
    buckets[bucket][key] = value;
    console.log("🪣 Bucket stored:", bucket, key, value);
    return value;
  },
  async get(bucket, key) {
    return buckets[bucket]?.[key] || null;
  },
};
