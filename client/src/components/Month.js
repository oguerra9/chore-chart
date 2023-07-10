import React, { useState, useEffect } from 'react';
import Date from '../utils/dateUtils';

import DateBar from './DateBar';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import DS from '../services/dataService';


// props = scheduledChores, userArr
export default function Month(props) {
    const [displayTS, setDisplayTS] = useState(parseInt(localStorage.getItem('displayTS')));
    const [monthDays, setMonthDays] = useState([]);
    const [calendarData, setCalendarData] = useState([]);
    const [monthList, setMonthList] = useState([]);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [loading, setLoading] = useState(false);
    
    useEffect(async () => {
        let dateArr = getDates();
        let monthArr = getMonthDays(dateArr);
        await retrieveCalendarData(monthArr);
    }, [displayTS, props.refresh]);

    const retrieveCalendarData = async (monthArr) => {
        setLoading(true);
        let retrievedData = await (DS.getCalendarData(props.displayId)).then((response) => {
            return response.data;
        });

        setCalendarData(retrievedData);
        setLoading(false);
        sortChores(monthArr, retrievedData);
    };

    const handleChangeDate = (newTS) => {
        setDisplayTS(newTS);
        localStorage.setItem('displayTS', newTS);
    };

    const getDates = () => {
        let currDate = new Date(displayTS);
        let monthStart = currDate.getMonthStart();
        let monthEnd = currDate.getMonthEnd();

        let monthArr = [monthStart];
        currDate = monthStart;

        let index = 0;

        while(index < monthStart.getDaysInMonth()) {
            index += 1;
            currDate = new Date(currDate.setDate(index));
            monthArr.push(currDate);
        }

        monthArr.pop();
        monthArr = addDayBuffers(monthArr);
        return monthArr;
    };

    const getMonthDays = (dateArr) => {
        let days = [];
        dateArr.forEach((dayDate) => {
            let dayObj = {
                date: dayDate,
                timelessStamp: parseInt(new Date(dayDate).getTimelessStamp()),
                chores: []
            };
            days.push(dayObj);
        });

        return days;
    }

    const sortChores = (monthArr, retrievedData) => {
        let choreArr = retrievedData.chores;
        let users = retrievedData.users;
        for (let i = 0; i < choreArr.length; i++) {
            let chore = choreArr[i];
            if (chore.end_date === 'NaN' || chore.end_date === null || chore.end_date === 'null') {
                chore.end_date = '';
            }
            monthArr.forEach((day) => {
                if (chore.does_repeat === false) {
                    if (parseInt(chore.start_date) === day.timelessStamp) {
                        let displayChore = {...chore};
                        displayChore.user = users[chore.first_user_idx];
                        day.chores.push(displayChore);
                    } 
                } else {
                    if ((day.timelessStamp >= chore.start_date) && ((chore.end_date === '') || ((chore.end_date != '') && day.timelessStamp <= chore.end_date))) {
                        let timeDiff = Math.abs(day.timelessStamp - chore.start_date);
                        if (timeDiff % chore.time_inc === 0 || timeDiff % chore.time_inc === 3600000) {
                            if (timeDiff % chore.time_inc === 3600000) {
                                timeDiff -= 3600000;
                            }
                            let instanceNum = timeDiff / chore.time_inc;
                            let userIndex = parseInt(chore.first_user_idx);
                            let indexInc = (instanceNum % users.length);
                            userIndex += indexInc;

                            if (userIndex >= users.length) {
                                userIndex = (userIndex % users.length);
                            }
                            let displayChore = {...chore};
                            let assignedUser = users[userIndex];
                            displayChore['user'] = assignedUser;
                            day.chores.push(displayChore);
                        }
                    } 
                }
            })
        }
        setMonthDays(monthArr);
    }

    const addDayBuffers = (monthArr) => {
        let currDate = monthArr[0];
        let startDate = monthArr[0];
        let firstDay = monthArr[0].getDay();

        for (let i = 0; i < firstDay; i++) {
            monthArr.unshift('');
        }

        let lastDay = monthArr[monthArr.length - 1].getDay();

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
            <div id="monthContainer" className='d-flex flex-wrap'>
                <div id="weekDayTitles">
                    {dayNames.map((name) => (
                        <div key={name} id='dayTitle' className='p-1'>
                            {name}
                        </div>
                    ))}
                </div>
                <div id="datesContainer">                
                    {monthDays.map(({date, chores}, index) => (
                        <div key={index} id="dayBox">
                            {(date === '') ? (
                                <div id="emptyDateBox"></div>
                            ) : (
                                <div className='p-1'>
                                    <div className='mb-1'>{new Date(date).getDate()}</div>
                                    <div>
                                        {chores.map((chore) => (
                                            <div className='d-flex' key={chore.title}>
                                                <div style={{'color': chore.user.color_code, 'textDecoration':'underline'}}>
                                                    {chore.user.display_name} - {chore.chore_title}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    




}