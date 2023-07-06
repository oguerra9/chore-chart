import React, { useState, useEffect } from 'react';
import Date from '../utils/dateUtils';

import DateBar from './DateBar';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';


// props = scheduledChores, userArr
export default function Month(props) {
    const [displayTS, setDisplayTS] = useState(parseInt(localStorage.getItem('displayTS')));
    //const [dateArr, setDateArr] = useState([]);
    const [monthDays, setMonthDays] = useState([]);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    useEffect(() => {
        // if (localStorage.hasOwnProperty('displayTS')) {
        //     setDisplayTS(localStorage.getItem('displayTS'));
        // }

        let dateArr = getDates();
        let monthArr = getMonthDays(dateArr);
        console.log(monthArr);
        sortChores(monthArr);
    }, [displayTS]);

    const handleChangeDate = (newTS) => {
        setDisplayTS(newTS);
        localStorage.setItem('displayTS', newTS);
    };

    // const handleIncrement = () => {
    //     let currDate = new Date(displayTS);
    //     currDate.nextMonth();
    //     setDisplayTS(currDate.getTimelessStamp());
    // };

    // const handleDecrement = () => {
    //     let currDate = new Date(displayTS);
    //     currDate.prevMonth();
    //     setDisplayTS(currDate.getTimelessStamp());
    // };

    const getDates = () => {
        let currDate = new Date(displayTS);
        // console.log(`currDate = ${currDate}`);
        let monthStart = currDate.getMonthStart();
        // console.log(`month start = ${monthStart}`);
        let monthEnd = currDate.getMonthEnd();
        // console.log(`month end = ${monthEnd}`);

        let monthArr = [monthStart];
        currDate = monthStart;

        let index = 0;

        //while(currDate.getTimelessStamp() != monthEnd.getTimelessStamp()) {
        while(index < monthStart.getDaysInMonth()) {
            // console.log(`curr date = ${currDate}`);
            index += 1;
            currDate = new Date(currDate.setDate(index));
            monthArr.push(currDate);
            // index += 1;
        }

        // console.log(`monthArr = ${monthArr}`);
        monthArr.pop();
        monthArr = addDayBuffers(monthArr);
        // console.log(`new monthArr = ${monthArr}`);
        return monthArr;
    }

    const getMonthDays = (dateArr) => {
        let days = [];
        // console.log('dateArr');
        // console.log(dateArr);
        dateArr.forEach((dayDate) => {
            let dayObj = {
                date: dayDate,
                timelessStamp: parseInt(new Date(dayDate).getTimelessStamp()),
                chores: []
            };
            days.push(dayObj);
        });

        //setMonthDays(days);
        // console.log('days:');
        // console.log(days);
        return days;
    }

    /*
    {
        title: "Sweep Floors",
        start_date: 1690171200000,
        end_date: 1690516800000,
        first_user_index: "1",
        freq_frame: "week",
        freq_quantity: "1",
        repeating: true,
        time_inc: 604800000,
    },
    */

    const sortChores = (monthArr) => {
        let choreArr = props.scheduledChores;
        let users = props.userArr;
        //choreArr.forEach((chore) => {
        for (let i = 0; i < choreArr.length; i++) {
            let chore = choreArr[i];
            // console.log(`sorting chore ${JSON.stringify(chore)}`);
            // console.log(`start date = ${JSON.stringify(new Date(chore.start_date))}`);
            // console.log(`end date = ${JSON.stringify(new Date(chore.end_date))}`);
            monthArr.forEach((day) => {
                if (chore.repeating === false) {
                    console.log('chore does not repeat');
                    if (chore.start_date === day.timelessStamp) {
                        let displayChore = {...chore};
                        displayChore.user = users[chore.first_user_index];
                        console.log(displayChore);
                        day.chores.push(displayChore);
                    } 
                } else {
                    console.log(new Date(day.timelessStamp).getDate());
                    // // console.log(`((day.timelessStamp >= chore.start_date) && ((chore.end_date === '') || (chore.end_date != '' && day.timelessStamp <= chore.end_date)))`);
                    // console.log(`((${day.timelessStamp} >= ${chore.start_date}) && ((${chore.end_date} === '') || (${chore.end_date} != '' && ${day.timelessStamp} <= ${chore.end_date})))`);
                    // console.log(`(${(day.timelessStamp >= chore.start_date)} && (${(chore.end_date === '')} || (${chore.end_date != ''} && ${day.timelessStamp <= chore.end_date})))`);
                    // console.log(`(${(day.timelessStamp >= chore.start_date)} && ${((chore.end_date === '') || (chore.end_date != '' && day.timelessStamp <= chore.end_date))})`);
                    if ((day.timelessStamp >= chore.start_date) && ((chore.end_date === '') || (chore.end_date != '' && day.timelessStamp <= chore.end_date))) {
                        console.log(`meets params`);
                        let timeDiff = Math.abs(day.timelessStamp - chore.start_date);
                        console.log(`timeDiff % chore.time_inc`);
                        console.log(timeDiff % chore.time_inc);
                        console.log(`timeDiff / 86400000`);
                        console.log(timeDiff / 86400000);
                        console.log(`timeDiff / chore.time_inc`);
                        console.log(timeDiff / chore.time_inc);
                        if (timeDiff % chore.time_inc === 0 || timeDiff % chore.time_inc === 3600000) {
                            if (timeDiff % chore.time_inc === 3600000) {
                                timeDiff -= 3600000;
                            }
                            console.log(`even time`);
                            let instanceNum = timeDiff / chore.time_inc;
                            let userIndex = parseInt(chore.first_user_index);
                            let indexInc = (instanceNum % users.length);
                            userIndex += indexInc;

                            if (userIndex >= users.length) {
                                userIndex = (userIndex % users.length);
                            }
                            let displayChore = {...chore};
                            let assignedUser = users[userIndex];
                            displayChore['user'] = assignedUser;
                            console.log(displayChore);
                            day.chores.push(displayChore);
                        }
                    } 
                }
            })
        }
        //});
        // console.log('monthArr with chores');
        // console.log(monthArr);
        setMonthDays(monthArr);
    }

    const addDayBuffers = (monthArr) => {
        let currDate = monthArr[0];
        let startDate = monthArr[0];
        console.log(`start date = ${startDate}`);
        let firstDay = monthArr[0].getDay();
        console.log(`first day = ${firstDay}`);

        for (let i = 0; i < firstDay; i++) {
            monthArr.unshift('');
        }

        let lastDay = monthArr[monthArr.length - 1].getDay();
        console.log(`last date = ${monthArr[monthArr.length - 1]}`)
        console.log(`lastDay = ${lastDay}`);

        while (lastDay < 6) {
            monthArr.push('');
            lastDay += 1;
        }

        return monthArr;
    }

    return (
        <div className='mb-2 justify-content-center'>
            <div>
                <DateBar displayTS={displayTS} handleChangeDate={handleChangeDate} />
            </div>
            {/* <div className='d-flex flex-wrap'>
                {dayNames.map(name => (
                    <div id='WeekDayTitles' style={{'width': '14%', 'border': '1px solid black'}}>
                        {name}
                    </div>
                ))}
            </div> */}
            <div id="monthContainer" className='d-flex flex-wrap'>
                {dayNames.map((name) => (
                    <div key={name} id='WeekDayTitles' style={{'width': '14%', 'border': '1px solid black'}}>
                        {name}
                    </div>
                ))}
                {monthDays.map(({date, chores}, index) => (
                    <div key={index} style={{'width':'14%', 'height': '150px', 'border': '1px solid black'}}>
                        {(date === '') ? (
                            <div id="emptyDateBox"></div>
                        ) : (
                            <div>
                                <p>{new Date(date).getDate()}</p>
                                <div>
                                    {chores.map((chore) => (
                                        <li className='d-flex' key={chore.title}>
                                            <p style={{'color': chore.user.color_code, 'textDecoration':'underline'}}>
                                                {chore.user.display_name} - {chore.title}
                                            </p>
                                        </li>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                    </div>
                ))}
            </div>
        </div>
    );
    




}