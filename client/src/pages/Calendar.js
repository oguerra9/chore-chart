import React, { useState, useEffect } from 'react';
import Home from './Home';
import Month from '../components/Month';
import Week from '../components/Week';
import CalendarSettings from '../components/CalendarSettings';
import DateBar from '../components/DateBar';
import NewChoreForm from '../components/NewChoreForm';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';

// props: handlePageChange(pageName), calendarData
export default function Calendar(props) {
    // can use Holidays by API-Ninja to add holidays etc to calendar for extra * pizazz *
    const [displayTS, setDisplayTS] = useState('');
    const [displayView, setDisplayView] = useState('');
    const [calendarData, setCalendarData] = useState({
        id: '123',
        title: 'Calendar #1',
        users: [
            {
                index: 0,
                first_name: 'Liv',
                last_name: 'Guerra',
                username: 'og123',
                display_name: 'liv',
                color_code: '#2D4356'
            },
            {
                index: 1,
                first_name: 'Mia',
                last_name: 'Guerra',
                username: 'mg123',
                display_name: 'mia',
                color_code: '#A76F6F'
            },
            {
                index: 2,
                first_name: 'Christine',
                last_name: 'Freddy',
                username: 'cf123',
                display_name: 'chris',
                color_code: '#435B66'
            }
        ],
        chores: [
            {
                id: 1234,
                title: "Sweep Floors - ED",
                start_date: 1690171200000,
                end_date: 1690516800000,
                first_user_index: "1",
                freq_frame: "week",
                freq_quantity: "1",
                repeating: true,
                time_inc: 604800000,
            },
            {
                id: 4321,
                title: "Vacuum - noED",
                start_date: 1689652800000,
                end_date: '',
                first_user_index: "2",
                freq_frame: "week",
                freq_quantity: "1",
                repeating: true,
                time_inc: 604800000,
            },
        ],
        shareId: 'abc123'
    });
    const [displayId, setDisplayId] = useState('');
    const [calendarChores, setCalendarChores] = useState([]);

    const [showCalendarSettings, setShowCalendarSettings] = useState(false);
    const [showChoreForm, setShowChoreForm] = useState(false);

    const handleShowChoreForm = () => setShowChoreForm(true);
    const handleHideChoreForm = () => setShowChoreForm(false);

    const handleShowCalendarSettings = () => setShowCalendarSettings(true);
    const handleHideCalendarSettings = () => setShowCalendarSettings(false);

    useEffect(() => {
        // if (props.loggedIn === false) {
        //     window.location.pathname = '/login';
        // }

        let pathArr = window.location.pathname.split('/');
        setDisplayId(pathArr[2]);

        if (localStorage.hasOwnProperty('displayTS')) {
            setDisplayTS(new Date(localStorage.getItem('displayTS')));
        }

        if (localStorage.hasOwnProperty('displayView')) {
            setDisplayView(localStorage.getItem('setDisplayView'));
        }

        //getCalendarData();
        console.log('calendar data');
        console.log(calendarData);
        //console.log('calendarChores');
        //console.log(calendarChores);
    }, []);

    const handleChangeData = (newCalendarData) => {
        setCalendarData(newCalendarData);
        handleHideCalendarSettings();
    };

    const handleBack = () => {
        window.location.pathname = '/home';
    }

    return (
        <>
            <div className='p-2'>
                
                {/* {renderTimeFrame()} */}
                <div className='d-flex'>
                    <Button onClick={handleBack} className="m-2">{'<'}</Button>
                    <h1 className='m-2'>{calendarData.title}</h1>
                    <Button onClick={handleShowChoreForm} className="col-2 m-2">Add New Chore</Button>
                    <Button onClick={handleShowCalendarSettings} className="col-2 m-2">Calendar Settings</Button>
                </div>
                
                <Month scheduledChores={calendarData.chores} userArr={calendarData.users} />
            </div>

            <Modal show={showChoreForm} onHide={handleHideChoreForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Chore</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewChoreForm calendarUsers={calendarData.users} />
                </Modal.Body>
            </Modal>

            <Offcanvas show={showCalendarSettings} onHide={handleHideCalendarSettings}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Calendar Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CalendarSettings calendarData={calendarData} handleChangeData={handleChangeData} />
                </Offcanvas.Body>
            </Offcanvas>

            {/* <Modal show={showCalendarSettings} onHide={handleHideCalendarSettings}>
                <Modal.Header closeButton>
                    <Modal.Title>Calendar Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CalendarSettings calendarData={calendarData} handleChangeData={handleChangeData} />
                </Modal.Body>
            </Modal> */}
        </>
    )
}