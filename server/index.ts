import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

const app = new Elysia().use(cors()).get("/", () => {
    return {
        message: "Hello World from NIA"
    }
});

app.listen(8001);