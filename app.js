import express from "express";
import bodyParser from "body-parser";
import assignmentRouter from "./routes/assignment.mjs";
import commentRouter from "./routes/comment.mjs";
import accountRouter from "./routes/account.mjs";
import { assignments as assignmentsFromFile } from "./data/assignments.js";
import { comments as commentsFromFile } from "./data/comments.js";


let assignments = [...assignmentsFromFile];
let comments = [...commentsFromFile];

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use("/accounts", accountRouter);
app.use("/assignments",assignmentRouter);
app.use("/comments",commentRouter);

app.get("/", (req, res) => {
  return res.send("Hello Teacher!!");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
