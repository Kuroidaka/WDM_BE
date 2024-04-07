function calculateTimeDifference(startDate, endDate) {
    const difference = endDate - startDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return { days };
}

// // Example usage:
// const startDate = new Date();
// const endDate = new Date('2023-04-05');

// const timeDifference = calculateTimeDifference(startDate, endDate);
// console.log(timeDifference); 

function compareDates(date1, date2) {
    const year1 = date1.getFullYear();
    const year2 = date2.getFullYear();

    const month1 = date1.getMonth();
    const month2 = date2.getMonth();

    const day1 = date1.getDate();
    const day2 = date2.getDate();

    return year1 === year2 && month1 === month2 && day1 === day2;
}

// // Example usage:
// const date1 = new Date('2024-03-30');
// const date2 = new Date('2024-03-30');
// const date3 = new Date('2023-03-30');

// console.log(compareDates(date1, date2)); // true
// console.log(compareDates(date1, date3)); // false

// dataWeeding["wedding_date"]
function calcPenalty (startDate, endDate= new Date(), totalPrice) {
    let extraFee = 0
    let weddingDate = new Date(startDate)
    let payDate = new Date(endDate)
    let isPenal = false

    const timeDifference = calculateTimeDifference(weddingDate, payDate);

    if(timeDifference.days > 0) {
      extraFee = timeDifference.days* (totalPrice / 100)
      isPenal = true
    }

    return {
        isPenal,
        extraFee
    }
}

function getStartAndEndOfDay(dateString) {
  // Parse the date string
  const date = new Date(dateString);

  // Set to start of the day
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));

  // Create a new Date object for the end of the current day
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(startOfDay.getDate() + 1);
  endOfDay.setSeconds(endOfDay.getSeconds() - 1);

  return {
    startOfDay,
    endOfDay // Now represents the last second of the current day
  };
}

// // Usage
// const { startOfDay, endOfDay } = getStartAndEndOfDay("Fri Apr 05 2024 10:54:22 GMT+0700 (Indochina Time)");
// console.log(startOfDay); // Shows 2024-04-05T00:00:00.000Z (in GMT)
// console.log(endOfDay); // Shows 2024-04-05T23:59:59.000Z (in GMT)

  
module.exports = { calculateTimeDifference, compareDates, calcPenalty, getStartAndEndOfDay }

