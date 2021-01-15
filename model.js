const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let employee = new Schema(
  {
    employee_number: {
      type: String
    },
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    date_of_birth: {
      type: Date
    },
    city: {
      type: String
    },
    country: {
      type: String
    }
  },
  { collection: "Employees" }
);

module.exports = mongoose.model("employees", employee);