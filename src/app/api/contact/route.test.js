import { test, expect, mock, afterEach } from 'bun:test';
let deliveries = 0;
mock.module('resend', () => ({ Resend: class { emails = { send: async () => { deliveries++; return {}; } }; } }));
const { POST } = await import('./route');
const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
afterEach(() => { globalThis.fetch = originalFetch; for (const key of ['NODE_ENV','MY_EMAIL','RESEND_API_KEY','UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN']) { if (originalEnv[key] === undefined) delete process.env[key]; else process.env[key] = originalEnv[key]; } });
test('a streamed body over 32 KiB without Content-Length is rejected before integrations', async () => {
  let cancelled = false;
  const stream = new ReadableStream({ start(c) { c.enqueue(new Uint8Array(20000)); c.enqueue(new Uint8Array(20000)); }, cancel() { cancelled = true; } });
  const response = await POST(new Request('http://localhost/api/contact', { method:'POST', body:stream, duplex:'half' }));
  expect(response.status).toBe(413); expect(cancelled).toBe(true); expect(deliveries).toBe(0);
});
test('malformed JSON and a forged short Content-Length do not bypass the actual byte cap', async () => {
  expect((await POST(new Request('http://localhost/api/contact',{method:'POST',body:'{'}))).status).toBe(400);
  expect((await POST(new Request('http://localhost/api/contact',{method:'POST',body:'x'.repeat(32769),headers:{'Content-Length':'1'}}))).status).toBe(413);
});
test('a stalled shared limiter aborts and fails closed before any email', async () => {
  process.env.NODE_ENV = 'production'; process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example.test'; process.env.UPSTASH_REDIS_REST_TOKEN = 'fixture';
  globalThis.fetch = async (_url, options) => new Promise((_, reject) => { options.signal.addEventListener('abort', () => reject(options.signal.reason), {once:true}); });
  const started = Date.now();
  const response = await POST(new Request('http://localhost/api/contact',{method:'POST',body:JSON.stringify({name:'Fixture'}),headers:{'x-real-ip':'192.0.2.1'}}));
  expect(response.status).toBe(503); expect(Date.now()-started).toBeLessThan(6500); expect(deliveries).toBe(0);
}, 8000);
