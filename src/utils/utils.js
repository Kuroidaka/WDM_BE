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


module.exports = { calculateTimeDifference, compareDates }