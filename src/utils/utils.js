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

module.exports = { calculateTimeDifference }