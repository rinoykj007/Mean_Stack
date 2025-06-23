const express = require("express");
const router = express.Router();
const Employee = require("../models/employeeModel");

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, position, level } = req.body;
    const employee = await Employee.create({
      name,
      position,
      level,
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, position, level } = req.body;
    const employee = await Employee.findById(req.params.id);

    if (employee) {
      employee.name = name || employee.name;
      employee.position = position || employee.position;
      employee.level = level || employee.level;

      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
      await employee.deleteOne();
      res.json({ message: "Employee removed" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
