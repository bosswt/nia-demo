import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import OpenAI from "openai";
const client = new OpenAI();

const app = new Elysia().use(cors()).get("/", async () => {
    return {
        message: "Hello World from NIA"
    }
});

app.listen(8001);