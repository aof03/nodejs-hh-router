import { Router } from "express";
import { comments } from "../data/comments";


const commentRouter = Router ()

commentRouter.get("/assignments/:id/comments", (req, res) => {
    const assignmentId = +req.params.id;
  
    const assignmentComments = comments.filter((comment) => {
      return assignmentId == comment.assignmentId;
    });
  
    return res.json({
      data: assignmentComments,
    });
  });
  
  commentRouter.post("/assignments/:id/comments", (req, res) => {
    const assignmentId = +req.params.id;
    const newComment = req.body;
    const commentId = comments[comments.length - 1].id + 1;
  
    comments.push({
      id: commentId,
      assignmentId,
      ...newComment,
    });
  
    return res.json({
      message: `Comment of assignment ${assignmentId} has been added to assignment.`,
    });
  });
  
  commentRouter.delete("/assignments/:id/comments", (req, res) => {
    const assignmentId = +req.params.id;
  
    const hasFound = comments.find(
      (comment) => comment.assignmentId === assignmentId
    );
    if (!hasFound) {
      return res.status(404).json({
        message: `${assignmentId} not found`,
      });
    }
  
    comments = comments.filter((comment) => {
      return comment.assignmentId != assignmentId;
    });
  
    return res.json({
      message: `Comment of assignment ${assignmentId} has been deleted.`,
    });
  });

export default  commentRouter;