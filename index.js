/* Your Code Here */
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employees) {
  return employees.map(createEmployeeRecord);
}

function createTimeInEvent(stamp) {
  const [date, hour] = stamp.split(" ");
  this.timeInEvents.push({
    date: date,
    hour: parseInt(hour, 10),
    type: "TimeIn",
  });
  return this;
}

function createTimeOutEvent(stamp) {
  const [date, hour] = stamp.split(" ");
  this.timeOutEvents.push({
    date: date,
    hour: parseInt(hour, 10),
    type: "TimeOut",
  });
  return this;
}

function hoursWorkedOnDate(date) {
  const hourIn = this.timeInEvents.find(
    (timeInEvent) => timeInEvent.date === date
  ).hour;
  const hourOut = this.timeOutEvents.find(
    (timeOutEvent) => timeOutEvent.date === date
  ).hour;
  return (hourOut - hourIn) / 100;
}

function wagesEarnedOnDate(date) {
  const hours = hoursWorkedOnDate.call(this, date);
  return hours * this.payPerHour;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
  const employee = srcArray.find((record) => record.firstName === firstName);
  return employee;
}

function calculatePayroll(records) {
  return records.reduce((wages, record) => wages + allWagesFor.call(record), 0);
}
