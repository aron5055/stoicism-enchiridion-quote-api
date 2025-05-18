import { Hono } from "hono";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  list(): Promise<{ keys: { name: string }[] }>;
}

type Bindings = {
  QUOTES: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/quote", async (c) => {
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Shanghai",
  });
  const allKeys = await c.env.QUOTES.list();
  const idx = hash(today) % allKeys.keys.length;
  const key = allKeys.keys[idx].name;
  const entry = await c.env.QUOTES.get(key);
  if (!entry) {
    return c.json({ error: "Not Found" }, 404);
  }

  const quote = JSON.parse(entry);
  return c.json(
    { date: today, ...quote },
    {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
});

app.get("/quote/random", async (c) => {
  const allKeys = await c.env.QUOTES.list();
  const idx = Math.floor(Math.random() * allKeys.keys.length);
  const key = allKeys.keys[idx].name;
  const entry = await c.env.QUOTES.get(key);
  if (!entry) {
    return c.json({ error: "Not Found" }, 404);
  }

  const quote = JSON.parse(entry);
  return c.json(
    { date: new Date().toLocaleDateString("en-CA"), ...quote },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
});

export default app;

const hash = (str: string) => {
  let h = 0;
  for (const ch of str) {
    h = (Math.imul(31, h) + ch.charCodeAt(0)) | 0;
  }
  return h >>> 0;
};
