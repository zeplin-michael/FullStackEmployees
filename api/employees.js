import express from "express";
const router = express.Router();
export default router;
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";

// TODO: this file!
router.route("/").get(async (req, res) => {
  res.status(200).json({ message: "Welcome to the Fullstack Employees API." });
});

router
  .route("/employees")
  .get(async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
  })
  .post(async (req, res, next) => {
    try {
      if (!req.body) {
        return res
          .status(400)
          .json({ message: "sends 400 if request has no body" });
      }
      if (!req.body.name || !req.body.birthday || !req.body.salary) {
        res.status(400).json({
          message: "sends 400 if request body does not have required fields",
        });
      }
      const newEmployee = await createEmployee(req.body);
      res.status(201).send(newEmployee);
    } catch (err) {
      next(err);
    }
  });

router
  .route("/employees/:id")
  .get(async (req, res, next) => {
    if (req.params.id <= 0) {
      return res
        .status(400)
        .json({ error: "sends 400 if id is not a positive integer" });
    }
    try {
      const employee = await getEmployee(req.params.id);
      if (!employee) {
        return res
          .status(404)
          .json({ message: "sends 404 if employee does not exist" });
      }
      res.json(employee);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      if (req.params.id <= 0) {
        return res
          .status(400)
          .json({ error: "sends 400 if id is not a positive integer" });
      }
      const deletedEmployeeCount = await deleteEmployee(req.params.id);
      if (!deletedEmployeeCount) {
        return res
          .status(404)
          .json({ message: "sends 404 if employee does not exist" });
      } else {
        res.status(204);
      }
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "sends 400 if request has no body",
      });
    }
    if (!req.body.name || !req.body.birthday || !req.body.salary) {
      res.status(400).json({
        message: "sends 400 if request body does not have required fields",
      });
    }
    if (req.params.id <= 0) {
      res
        .status(400)
        .json({ message: "sends 400 if id is not a positive integer" });
    }

    try {
      const updatedEmployee = await updateEmployee(req.params.id, req.body);
      if (!updatedEmployee) {
        return res
          .status(404)
          .json({ message: "sends 404 if employee does not exist" });
      }
      res.json(updateEmployee);
    } catch (err) {
      next(err);
    }
  });
