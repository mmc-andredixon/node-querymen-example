# Example Express App With Querymen
This is a example application demonstrating some og the capabilities of the `querymen` package.

## Packages Used
- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [querymen](https://www.npmjs.com/package/querymen)
- [faker](https://www.npmjs.com/package/faker)

## Setup
- Clone application to your local
- Go into application directory
- run the command `npm install`
- Run the command in the root of the applicatio folder
  - `node server.js`
- If everything works, you should be able to access the application from [http://localhost:4000](http://localhost:4000)
- You can create sample records in the employee collection with the url below.
  - http://localhost:4000/insertdata
   

## Example queries
- Employees in Canada
  - http://localhost:4000/employees?country=Canada
- Employees who's city or address include teh term `London`
  - http://localhost:4000/employees?location=London
- Employees who's first or last name include the term `Nic`
  - http://localhost:4000/employees?name=Nic
- Employee who's last name is `Nic`
  - http://localhost:4000/employees?last_name=Nicolas
- Where date of birth greater than or equal to `2020-06-20`
  - http://localhost:4000/employees?date_of_birth_gte=2020-06-20
- Where date of birth less than or equal to `2020-06-20`
  - http://localhost:4000/employees?date_of_birth_lte=2020-06-20
- Search a few fields for the term `Vic`
  - http://localhost:4000/employees?term=Vic
- Employees who live in `Canada` and name includes the term `Vic`
  - http://localhost:4000/employees?name=Jason&country=Canada