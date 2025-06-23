const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
      enum: ['Entry', 'Junior', 'Mid', 'Senior'],
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
