import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Worldsssfafklj");

app.listen(8001);