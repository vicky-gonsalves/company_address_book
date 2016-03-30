/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import * as Employee from '../api/employee/employee.model';

let employees = [
  {
    firstName: 'Jason',
    lastName: 'Aden',
    email: 'jason@arcfix.com',
    position: 'Developer',
    createdAt: new Date('2013-01-01T12:12:19')
  },
  {
    firstName: 'Adam',
    lastName: 'Roussos',
    email: 'aroussos@arcfix.com',
    position: 'Developer',
    createdAt: new Date('2013-02-01T12:12:19')
  },
  {
    firstName: 'Vicky',
    lastName: 'Gonsalves',
    email: 'vgonsalves@arcfix.com',
    position: 'Developer',
    createdAt: new Date('2013-03-01T12:12:19')
  },
  {
    firstName: 'Aaron',
    lastName: 'M',
    email: 'aaron@arcfix.com',
    position: 'Designer',
    createdAt: new Date('2013-04-01T12:12:19')
  },
  {
    firstName: 'Carlos',
    lastName: 'Grillo',
    email: 'carlos@arcfix.com',
    position: 'Tester',
    createdAt: new Date('2013-05-01T12:12:19')
  },
  {
    firstName: 'Christina',
    lastName: 'Lee',
    email: 'christina@arcfix.com',
    position: 'Tester',
    createdAt: new Date('2013-06-01T12:12:19')
  },
  {
    firstName: 'George',
    lastName: 'Lee',
    email: 'george@arcfix.com',
    position: 'Developer',
    createdAt: new Date('2013-07-01T12:12:19')
  },
  {
    firstName: 'John',
    lastName: 'Edwards',
    email: 'john@arcfix.com',
    position: 'Developer',
    createdAt: new Date('2013-08-01T12:12:19')
  },
  {
    firstName: 'Helena',
    lastName: 'Edwards',
    email: 'helena@arcfix.com',
    position: 'Developer',
    createdAt: new Date('2013-09-01T12:12:19')
  },
  {
    firstName: 'Daniel',
    lastName: 'Lemos',
    email: 'daniel@arcfix.com',
    position: 'Project manager',
    createdAt: new Date('2013-10-01T12:12:19')
  }
];


Employee.removeAsync()
  .then(() => {
    Employee.createAsync(employees)
      .then(() => {
        console.log('finished populating employees');
      })
      .catch(err=> {
        console.error(err);
      })
  }).catch(err=> {
  console.error(err);
});
