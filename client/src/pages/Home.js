import React from 'react';

import Button from 'react-bootstrap/Button';

import Calendar from './Calendar';
import DateBar from '../components/DateBar';
import Nav from '../components/Nav';
import NewChoreForm from '../components/NewChoreForm';

// props: handlePageChange(pageName)
export default function Home({ handlePageChange }) {
    // give user option to create new calendar
    let calendars = [
        {
            id:'123',
            title: 'calendar #1',
            description: 'this is my first calendar'
        },
        {
            id: '234',
            title: 'calendar #2',
            description: 'this is my second calendar'
        }
    ];

    const directCalendar = (event) => {
        console.log(event.target);
        console.log(`redirecting to calendar with id ${event.target.name}`);
        localStorage.setItem('currCalendar', event.target.name);
        window.location.pathname = `/calendar/${event.target.name}`;
        handlePageChange('calendar');
    };

    return (
        <div>
            <h1>My Calendars</h1>
            <div>
                {calendars.map(calendar => (
                    <Button onClick={directCalendar} name={calendar.id} key={calendar.id}>
                        {calendar.title}
                    </Button>
                ))}
            </div>
        </div>
    );
}