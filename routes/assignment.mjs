import { Router } from "express";
import { assignments } from "../data/assignments";


const assignmentRouter = Router ()

assignmentRouter.get("/", (req, res) => {
    return res.json({
      data: assignments,
    });
  });
  
assignmentRouter.get("/:id", (req, res) => {
    const assignmentId = +req.params.id;
    const hasFound = assignments.find((assign) => assign.id === assignmentId);
  
    if (!hasFound) {
      return res.status(404).json({
        messsage: `Assignment ${assignmentId} not found`,
      });
    }
  
    const assignment = assignments.filter((assign) => assign.id === assignmentId);
  
    return res.json({
      data: assignment[0],
    });
  });
  
assignmentRouter.post("/", (req, res) => {
    const newAssignment = req.body;
    const newAssignmentId = assignments[assignments.length - 1].id + 1;
  
    assignments.push({
      id: newAssignmentId,
      ...newAssignment,
    });
  
    return res.json({
      message: "New assignment has been created successfully",
    });
  });
  
assignmentRouter.put("/:id", (req, res) => {
    const updateAssignment = req.body;
    const assignmentId = +req.params.id;
  
    const hasFound = assignments.find((assign) => assign.id === assignmentId);
  
    if (!hasFound) {
      return res.status(404).json({
        messsage: `Assignment ${assignmentId} not found`,
      });
    }
  
    const assignmentIndex = assignments.findIndex((assign) => {
      return assign.id === assignmentId;
    });
  
    assignments[assignmentIndex] = {
      id: assignmentId,
      ...updateAssignment,
    };
  
    return res.json({
      message: `Assignment ${assignmentId} has been updated successfully`,
    });
  });
  
assignmentRouter.delete("/:id", (req, res) => {
    const assignmentId = +req.params.id;
  
    const hasFound = assignments.find((assign) => assign.id === assignmentId);
  
    if (!hasFound) {
      return res.status(404).json({
        messsage: `Assignment ${assignmentId} not found`,
      });
    }
  
    assignments = assignments.filter((assign) => {
      return assign.id !== assignmentId;
    });
  
    return res.json({
      message: `Assignment ${assignmentId} has been deleted successfully`,
    });
  });

export default assignmentRouter;