import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello World");

app.listen(8001);