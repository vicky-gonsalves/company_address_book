'use strict';

let Promise = require('bluebird');
let shortid = require('shortid');
let async = require('async');
import _ from "lodash";
import validator from "validator";

/*Employees collection*/
let _EMPLOYEES = [];

shortid.worker(1); //Ensure unique ids

let sanitizeEntities = (employees)=> {
  return new Promise((resolve, reject)=> {
    let sanitized = employees.map(emp=> {
      if (emp.firstName)
        emp.firstName = validator.escape(validator.trim(emp.firstName));
      if (emp.lastName)
        emp.lastName = validator.escape(validator.trim(emp.lastName));
      if (emp.email)
        emp.email = validator.escape(validator.trim(emp.email)).toLowerCase();
      if (emp.position)
        emp.position = validator.escape(validator.trim(emp.position));
      return emp;
    });
    resolve(sanitized);
  });
};

let isValid = (employees)=> {
  return new Promise((resolve, reject)=> {
    async.each(employees, (emp, cb)=> {
      let errors = [];

      //Validation
      if (!(emp.firstName)) {
        errors.push({firstName: 'Please enter first name'});
      }
      if (emp.firstName && !validator.isLength(emp.firstName, {min: 1, max: 150})) {
        errors.push({firstName: 'First Name must be between 1 to 150 characters long'});
      }
      if (!(emp.lastName)) {
        errors.push({lastName: 'Please enter last name'});
      }
      if (emp.lastName && !validator.isLength(emp.lastName, {min: 1, max: 150})) {
        errors.push({lastName: 'Last Name must be between 1 to 150 characters long'});
      }
      if (!(emp.email)) {
        errors.push({email: 'Please enter email'});
      }
      if (emp.email && !validator.isEmail(emp.email)) {
        errors.push({email: 'Email is not valid'});
      }
      if (emp.email && !validator.isLength(emp.email, {min: 1, max: 150})) {
        errors.push({email: 'Email must be between 1 to 150 characters long'});
      }
      if (emp.position && !validator.isLength(emp.position, {max: 75})) {
        errors.push({position: 'Position should not exceed more than 75 characters'});
      }
      if (errors.length) {
        cb(errors);
      } else {
        cb();
      }
    }, (err)=> {
      if (err) return reject({validationErr: err});
      return resolve();
    })
  });
};

/**
 * Creates new object of Employee
 * @param employees
 */
export function createAsync(employees = []) {
  return new Promise(function (resolve, reject) {
    if (employees.length === 0) return reject('Cannot create employee with empty object');
    try {
      sanitizeEntities(employees)
        .then((entities)=> {
          isValid(entities)
            .then(()=> {
              let temp = [];
              entities.forEach(emp=> {
                let newEmp = {};
                /*Transferring to newEmp object to prevent storing any unauthorized keys in memory*/
                newEmp._id = shortid.generate();
                newEmp.empId = `EMPLOYEE${_EMPLOYEES.length + 1}`;
                newEmp.firstName = emp.firstName;
                newEmp.lastName = emp.lastName;
                newEmp.email = emp.email;
                newEmp.position = emp.position;
                newEmp.createdAt = emp.createdAt;
                temp.push(newEmp);
                _EMPLOYEES.push(newEmp);
              });
              resolve(employees.length > 1 ? temp : temp[0]);
            })
            .catch(err=>reject(err));
        })
        .catch(err=>reject(err));
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Finds an Employee with id
 * @param id
 */
export function findByIdAsync(id = undefined) {
  return new Promise(function (resolve, reject) {
    if (id === undefined) return reject('Cannot find employee without _id');
    try {
      let employee = _EMPLOYEES.filter(emp=>emp._id === id);
      resolve(employee[0]);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Finds all Employees with matching query
 * @param employee
 */
export function findAsync(employee = {}) {
  return new Promise(function (resolve, reject) {
    try {
      let allEmployees = _.filter(_EMPLOYEES, employee);
      let employees = allEmployees.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      resolve(employees);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Finds first Employee Object with matching query
 * @param employee
 */
export function findOneAsync(employee = {}) {
  return new Promise(function (resolve, reject) {
    try {
      let employees = _.find(_EMPLOYEES, employee);
      resolve(employees);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Saves an employee
 * @param employee
 */
export function saveAsync(employee = {}) {
  return function (entity) {
    return new Promise(function (resolve, reject) {
      if (!entity) return reject('Cannot save employee with empty entity');
      try {
        let emp = _.find(_EMPLOYEES, entity);
        if (!emp) return reject('Cannot find employee');
        sanitizeEntities([employee])
          .then((entities)=> {
            isValid(entities)
              .then(()=> {
                console.log('asdasdasd');
                let newEmp = {};
                /*Transferring to newEmp object to prevent storing any unauthorized keys in memory*/
                newEmp.firstName = entities[0].firstName;
                newEmp.lastName = entities[0].lastName;
                newEmp.email = entities[0].email;
                newEmp.position = entities[0].position;
                newEmp.updatedAt = entities[0].updatedAt;
                let updated = _.merge(emp, newEmp);
                resolve(updated);
              })
              .catch(err=>reject(err));
          })
          .catch(err=>reject(err));

      } catch (e) {
        reject(e);
      }
    });
  }
}

/**
 * Removes Employee object
 * @param employee
 */
export function removeAsync(employee = {}) {
  return new Promise(function (resolve, reject) {
    if (!employee._id) {
      try {
        _EMPLOYEES.length = 0;
        resolve(_EMPLOYEES);
      } catch (e) {
        reject(e);
      }
    } else {
      try {
        let removed = _.remove(_EMPLOYEES, employee);
        resolve(removed);
      } catch (e) {
        reject(e);
      }
    }
  });
}
