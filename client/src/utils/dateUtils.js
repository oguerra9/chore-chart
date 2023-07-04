const ms_in_one_day = 86400000;
const ms_in_one_week = ms_in_one_day * 7;

Date.prototype.getTimelessStamp = function() {
    let timeStamp = this.getTime();
    let newDate = new Date(timeStamp);
    newDate.setHours(0, 0, 0, 0);
    return newDate.getTime();
};

Date.prototype.isLeapYear = function() {
    let yearNum = this.getFullYear();
    if (yearNum % 4 == 0) {
        return true;
    } else {
        return false;
    }
};

Date.prototype.getDaysInMonth = function() {
    let monthNum = this.getMonth();
    if (monthNum == 0 || monthNum == 2 || monthNum == 4 || monthNum == 6 || monthNum == 7 || monthNum == 9 || monthNum == 11) {
        return 31;
    }
    else if (monthNum == 3 || monthNum == 5 || monthNum == 8 || monthNum == 10) {
        return 30;
    }
    else if (monthNum == 1) {
        if (this.isLeapYear === true) {
            return 29;
        }
        else {
            return 28;
        }
    }
};

Date.prototype.nextDay = function() {
    let currTime = this.getTime();
    this.setTime(currTime + ms_in_one_day);
    return (new Date(this.getTime()));
};

Date.prototype.prevDay = function() {
    let currTime = this.getTime();
    this.setTime(currTime - ms_in_one_day);
    return (new Date(this.getTime()));
};

Date.prototype.nextWeek = function() {
    let currTime = this.getTime();
    this.setTime(currTime + ms_in_one_week);
    return (new Date(this.getTime()));
};

Date.prototype.prevWeek = function() {
    let currTime = this.getTime();
    this.setTime(currTime - ms_in_one_week);
    return (new Date(this.getTime()));
};

Date.prototype.nextMonth = function() {
    this.setFullYear(this.getFullYear(), this.getMonth() + 1);
    return (new Date(this.getTime()));
};

Date.prototype.prevMonth = function() {
    this.setFullYear(this.getFullYear(), this.getMonth() - 1);
    return (new Date(this.getTime()));
};

Date.prototype.getMonthName = function() {
    let monthNum = this.getMonth();
    if (monthNum === 0) {
        return 'January';
    } else if (monthNum === 1) {
        return 'February';
    } else if (monthNum === 2) {
        return 'March';
    } else if (monthNum === 3) {
        return 'April';
    } else if (monthNum === 4) {
        return 'May';
    } else if (monthNum === 5) {
        return 'June';
    } else if (monthNum === 6) {
        return 'July';
    } else if (monthNum === 7) {
        return 'August';
    } else if (monthNum === 8) {
        return 'September';
    } else if (monthNum === 9) {
        return 'October';
    } else if (monthNum === 10) {
        return 'November';
    } else if (monthNum === 11) {
        return 'December';
    } 
};

Date.prototype.getDayName = function() {
    let dayNum = this.getDay();
    if (dayNum === 0) {
        return 'Sunday';
    } else if (dayNum === 1) {
        return 'Monday';
    } else if (dayNum === 2) {
        return 'Tuesday';
    } else if (dayNum === 3) {
        return 'Wednesday';
    } else if (dayNum === 4) {
        return 'Thursday';
    } else if (dayNum === 5) {
        return 'Friday';
    } else if (dayNum === 6) {
        return 'Saturday';
    }
};


Date.prototype.getDayStart = function() {
    let dayStart = new Date(this.getTimelessStamp());
    return dayStart;
};


Date.prototype.getDayEnd = function() {
    let currDay = new Date(this.getTime());
    let dayEnd = new Date(currDay.setHours(23, 59, 59, 99));
    return dayEnd;
};


Date.prototype.getWeekStart = function() {
    let currDay = new Date(this.getTime());
    let weekDay = this.getDay();
    let weekStart = new Date(currDay.setDate(currDay.getDate() - weekDay));
    weekStart = new Date(weekStart.getDayStart());
    return weekStart;
};


Date.prototype.getWeekEnd = function() {
    let currDay = new Date(this.getTime());
    let weekDay = this.getDay();
    let dayDiff = 6 - weekDay;
    let weekEnd = new Date(currDay.setDate(currDay.getDate() + dayDiff));
    weekEnd = new Date(weekEnd.getDayEnd());
    return weekEnd;
};


Date.prototype.getMonthStart = function() {
    let currDay = new Date(this.getTime());
    let monthStart = new Date(currDay.setDate(1));
    monthStart = monthStart.getDayStart();
    return monthStart;
};


Date.prototype.getMonthEnd = function() {
    let numDays = this.getDaysInMonth();
    let currDay = new Date(this.getTime());
    let monthEnd = new Date(currDay.setDate(numDays));
    monthEnd = monthEnd.getDayEnd();
    return monthEnd;
};


Date.prototype.getDisplayMonth = function() {
    return (this.getMonth() + 1);
};


module.exports = Date;