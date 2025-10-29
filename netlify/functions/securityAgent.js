import { workos } from '../../src/utils/workosClient.js'
import { SmartMemory } from '../../src/utils/raindropMock.js'

export async function handler() {
  await SmartMemory.remember('security', { check: 'ok', timestamp: Date.now() })
  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'Secure ✅' }),
  }
}
