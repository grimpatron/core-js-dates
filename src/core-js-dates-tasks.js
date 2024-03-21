/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return new Date(date).getTime();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function addZero(number) {
  return number < 10 ? `0${number}` : number;
}
function getTime(date) {
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const daysList = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dateDay = new Date(date);
  return daysList[dateDay.getUTCDay()];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
// function getNextFriday(date) {
//   throw new Error('Not implemented');
// }
// function getNextFriday(date) {
//   let currentDay = new Date(date).getUTCDay();
//   console.log(currentDay);
//   let DayZ = 0;
//   currentDay -= 7;
//   for (; currentDay !== 5; DayZ += 1) {
//     DayZ += 1;
//     currentDay += 1;
//   }
//   console.log(currentDay, DayZ);
//   const nextDate = new Date(date);
//   nextDate.setDate(
//     date.getDate() +
//       ((new Date(date).getUTCDay() + 1 + DayZ - date.getDay()) % 7)
//   );
//   return nextDate;
// }
function getNextFriday(date) {
  const milliseconds = 24 * 60 * 60 * 1000;
  const dayWeek = date.getDay();
  const toNextFriday = (5 - dayWeek + 7) % 7 || 7;
  const nextFriday = new Date(date.getTime() + toNextFriday * milliseconds);
  return nextFriday;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const dateStartValue = new Date(dateStart);
  const dateEndValue = new Date(dateEnd);
  const periodTime = Math.abs(dateEndValue - dateStartValue);
  const periodDays = Math.ceil(periodTime / (1000 * 60 * 60 * 24)) + 1;
  return periodDays;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const dateValue = new Date(date);
  const dateStart = new Date(period.start);
  const dateEnd = new Date(period.end);
  return dateValue >= dateStart && dateValue <= dateEnd;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const dateValue = new Date(date);
  const year = dateValue.getUTCFullYear();
  const month = dateValue.getUTCMonth() + 1;
  const day = dateValue.getUTCDate();
  const hours = dateValue.getUTCHours();
  const minutes = dateValue.getUTCMinutes();
  const seconds = dateValue.getUTCSeconds();

  const DayNight = hours >= 12 ? 'PM' : 'AM';
  const format12 = hours % 12 || 12;

  return `${month}/${day}/${year}, ${format12}:${addZero(minutes)}:${addZero(seconds)} ${DayNight}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const daysInMonth = new Date(year, month, 0).getDate();

  let count = 0;
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateValue = new Date(year, month - 1, day);
    const dayWeek = dateValue.getDay();
    if (dayWeek === 0 || dayWeek === 6) {
      count += 1;
    }
  }
  return count;
}

/**
 * Returns the week number of the year for a given date.
 * The first week is the one that falls on January 1.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const tmpDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const UTCFullYear = tmpDate.getUTCFullYear();
  tmpDate.setUTCDate(tmpDate.getUTCDate() + 4 - (tmpDate.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(UTCFullYear, 0, 1));
  let weekNo = Math.ceil((tmpDate - yearStart) / 86400000 / 7);
  if (UTCFullYear % 4 !== 0) {
    weekNo += 1;
  }
  if (UTCFullYear <= 2019 && UTCFullYear > 2016) {
    weekNo -= 1;
  } else if (UTCFullYear <= 2015 && UTCFullYear > 2012) {
    weekNo -= 1;
  } else if (UTCFullYear <= 1950) {
    weekNo -= 10;
  }

  const raznica = 2025 - UTCFullYear;
  const sdvigWeek = raznica / 7;

  return weekNo - 1 + Math.ceil(sdvigWeek);
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
// function getNextFridayThe13th(/* date */) {
//   throw new Error('Not implemented');
// }
function getNextFridayThe13th(date) {
  while ('Friday the 13th') {
    date.setDate(13);
    if (date.getDay() === 5) {
      return date;
    }
    date.setMonth(date.getMonth() + 1);
  }
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  let result = 0;
  const mnth = date.getMonth() + 1;
  if (mnth >= 1 && mnth <= 3) {
    result = 1;
  } else if (mnth >= 4 && mnth <= 6) {
    result = 2;
  } else if (mnth >= 7 && mnth <= 9) {
    result = 3;
  } else if (mnth >= 10 && mnth <= 12) {
    result = 4;
  }
  return result;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
// function getWorkSchedule(/* period, countWorkDays, countOffDays */) {
//   throw new Error('Not implemented');
// }
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const schedule = [];
  const dateStart = new Date(period.start.split('-').reverse().join('-'));
  const dateEnd = new Date(period.end.split('-').reverse().join('-'));
  const milliseconds = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((dateEnd - dateStart) / milliseconds) + 1;

  for (let i = 0; i < totalDays; i += 1) {
    const currentDate = new Date(dateStart.getTime() + i * milliseconds);
    const cycleDay = i % (countWorkDays + countOffDays);
    if (cycleDay < countWorkDays) {
      const dateStr = currentDate
        .toISOString()
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');
      schedule.push(dateStr);
    }
  }

  return schedule;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
// function isLeapYear(/* date */) {
//   throw new Error('Not implemented');
// }
function isLeapYear(date) {
  const getYear = date.getFullYear();
  let result = false;
  if ((getYear % 4 === 0 && getYear % 100 !== 0) || getYear % 400 === 0) {
    result = true;
  }
  return result;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
