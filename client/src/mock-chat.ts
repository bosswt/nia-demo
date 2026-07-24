import { createUIMessageStream, createUIMessageStreamResponse, generateId } from "ai";

const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

Bun.serve({
    port: 4111, async fetch(req) {
        if (req.method === "OPTIONS") return new Response(null, { headers: CORS })
        const body = await req.json()
        console.log(body.messages.at(-1))
        const id = generateId();
        const s = createUIMessageStream({
            execute: async ({ writer }) => {
                writer.write({ type: "start" })
                writer.write({ type: "text-start", id })
                writer.write({ type: "text-delta", id, delta: "คำตอบจำลอง 55555" + body.messages.at(-1).parts.at(-1).text })
                writer.write({ type: "text-end", id })
                writer.write({ type: "finish" })
            }
        })
        return createUIMessageStreamResponse({ stream: s, headers: CORS })
    }
})