import express from "express";

import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";

const router = express.Router();

// TODO: this file!
router.route("/").get((req, res) => {
  res.status(200).send("Welcome to the Fullstack Employees API.");
});

router
  .route("/employees")
  .get(async (req, res, next) => {
    try {
      const employees = await getEmployees();
      res.status(200).json(employees);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, birthday, salary } = req.body || {};
      if (!req.body || !name || !birthday || !salary) {
        return res
          .status(400)
          .json({ message: "sends 400 if request has no body" });
      }
      // if (!req.body.name || !req.body.birthday || !req.body.salary) {
      //   res.status(400).json({
      //     message: "sends 400 if request body does not have required fields",
      //   });
      // }
      const newEmployee = await createEmployee(req.body);
      res.status(201).json(newEmployee);
    } catch (err) {
      next(err);
    }
  });

router
  .route("/employees/:id")
  .get(async (req, res, next) => {
    const id = Number(req.params.id);
    console.log("ID", id);
    if (id < 0) {
      return res
        .status(400)
        .json({ error: "sends 400 if id is not a positive integer" });
    }
    try {
      const employee = await getEmployee(id);
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
    const id = Number(req.params.id);
    try {
      if (id < 0) {
        return res
          .status(400)
          .json({ error: "sends 400 if id is not a positive integer" });
      }
      const deletedEmployeeCount = await deleteEmployee(id);
      // Checking for rows to make test pass
      if (!deletedEmployeeCount || !deletedEmployeeCount.rows.length) {
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
    const id = Number(req.params.id);
    if (!req.body) {
      return res.status(400).json({
        message: "sends 400 if request has no body",
      });
    }
    const { name, birthday, salary } = req.body || {};
    console.log("BODY1", req.body);
    if (!name || !birthday || !salary) {
      return res.status(400).json({
        message: "sends 400 if request has no body",
      });
    }
    // if (!req.body.name || !req.body.birthday || !req.body.salary) {
    //   res.status(400).json({
    //     message: "sends 400 if request body does not have required fields",
    //   });
    // }
    if (id < 0) {
      return res
        .status(400)
        .json({ message: "sends 400 if id is not a positive integer" });
    }
    try {
      console.log("BODY2", req.body);
      const updatedEmployee = await updateEmployee(id, req.body);
      if (!updatedEmployee) {
        return res
          .status(404)
          .json({ message: "sends 404 if employee does not exist" });
      }
      res.json(updatedEmployee);
    } catch (err) {
      next(err);
    }
  });

export default router;
