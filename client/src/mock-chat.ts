import { createUIMessageStream, createUIMessageStreamResponse, generateId } from "ai";

const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

Bun.serve({
    port: 4111, fetch(req) {
        if (req.method === "OPTIONS") return new Response(null, { headers: CORS })
        const id = generateId();
        const s = createUIMessageStream({
            execute: async ({ writer }) => {
                writer.write({ type: "start" })
                writer.write({ type: "text-start", id })
                writer.write({ type: "text-delta", id, delta: "คำตอบจำลอง 55555" })
                writer.write({ type: "text-end", id })
                writer.write({ type: "finish" })
            }
        })
        return createUIMessageStreamResponse({ stream: s, headers: CORS })
    }
})