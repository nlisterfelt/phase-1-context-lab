function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(array){
    const employeeRecords = []
    for(const arr of array){
        employeeRecords.push(createEmployeeRecord(arr))
    }
    return employeeRecords
}

function createTimeInEvent(dateStamp){
    const timeInObj = {}
    timeInObj.type = 'TimeIn'
    timeInObj.hour = parseInt(dateStamp.slice(11))
    timeInObj.date = dateStamp.slice(0,10)
    this.timeInEvents.push(timeInObj)
    return this
}

function createTimeOutEvent(dateStamp){
    const timeOutObj = {}
    timeOutObj.type = 'TimeOut'
    timeOutObj.hour = parseInt(dateStamp.slice(10))
    timeOutObj.date = dateStamp.slice(0,10)
    this.timeOutEvents.push(timeOutObj)
    return this
}

function hoursWorkedOnDate(date){
    const timeInObj = this.timeInEvents.find(element=>element.date===date)
    const timeIn = timeInObj.hour
    const timeOutObj = this.timeOutEvents.find(element=>element.date===date)
    const timeOut = timeOutObj.hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(date){
    const hours = hoursWorkedOnDate.call(this,date)
    return hours*this.payPerHour
}

function calculatePayroll(employeeRecordsArray){
    let totalSum =0
    employeeRecordsArray.forEach(employee =>{
        totalSum += allWagesFor.call(employee)
    })
    return totalSum
}

function findEmployeeByFirstName(collection, firstNameString){
    return collection.find(emp => emp.firstName===firstNameString)
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
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
