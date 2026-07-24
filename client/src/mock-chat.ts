import { createUIMessageStream, createUIMessageStreamResponse, generateId } from "ai";

Bun.serve({
    port: 4111, fetch() {
        const id = generateId();
        const s = createUIMessageStream({
            execute: async ({ writer }) => {
                writer.write({ type: "start" })
                writer.write({ type: "text-start", id })
                writer.write({ type: "text-delta", id, delta: "คำตอบจำลอง" })
                writer.write({ type: "text-end", id })
                writer.write({ type: "finish" })
            }
        })
        return createUIMessageStreamResponse({ stream: s })
    }
})