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
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    HashRouter,
    useParams
  } from "react-router-dom";

// props: handlePageChange(pageName), calendarData
export default function Calendar(props) {
    // can use Holidays by API-Ninja to add holidays etc to calendar for extra * pizazz *
    const [displayTS, setDisplayTS] = useState('');
    let { id } = useParams();
    console.log(`param id = ${id}`);
    const [displayView, setDisplayView] = useState('');
    const [displayId, setDisplayId] = useState(useParams().id);
    const [calendarArr, setCalendarArr] = useState([
        {
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
            ]
        },
        {
            id: '4321',
            title: 'Calendar #2',
            users: [
                {
                    index: 0,
                    first_name: 'Abby',
                    last_name: 'Gale',
                    username: 'ag123',
                    display_name: 'ab',
                    color_code: '#2D4356'
                },
                {
                    index: 1,
                    first_name: 'Tiffany',
                    last_name: 'Ye',
                    username: 'ty123',
                    display_name: 'tiff',
                    color_code: '#A76F6F'
                },
                {
                    index: 2,
                    first_name: 'Lena',
                    last_name: 'Smith',
                    username: 'ls123',
                    display_name: 'lenny',
                    color_code: '#435B66'
                }
            ],
            chores: [
                {
                    id: 1234,
                    title: "Sweep Floors 2 - ED",
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
                    title: "Vacuum 2 - noED",
                    start_date: 1689652800000,
                    end_date: '',
                    first_user_index: "2",
                    freq_frame: "week",
                    freq_quantity: "1",
                    repeating: true,
                    time_inc: 604800000,
                },
            ]
        }
    ]);

    const getCalendarData = () => {
        // will be replaced with call to db to retrieve data for calendar with displayId
        console.log('calendar arr');
        console.log(calendarArr);
        console.log('display id');
        console.log(displayId);
        let retData = {};
        for (let i = 0; i < calendarArr.length; i++) {
            if (calendarArr[i].id === displayId) {
                retData = calendarArr[i];
                console.log('retData');
                console.log(retData);
                break;
            }
        }
        console.log('retData');
        console.log(retData);
        return retData;
    };

    const [calendarData, setCalendarData] = useState(getCalendarData);
    
    const [calendarChores, setCalendarChores] = useState([]);

    const [showCalendarSettings, setShowCalendarSettings] = useState(false);
    const [showChoreForm, setShowChoreForm] = useState(false);

    const handleShowChoreForm = () => setShowChoreForm(true);
    const handleHideChoreForm = () => setShowChoreForm(false);

    const handleShowCalendarSettings = () => setShowCalendarSettings(true);
    const handleHideCalendarSettings = () => setShowCalendarSettings(false);

    useEffect(() => {

        console.log(`displayId = ${displayId}`);
        console.log(`calendarData`);
        console.log(calendarData);

        if (localStorage.hasOwnProperty('displayTS')) {
            setDisplayTS(new Date(localStorage.getItem('displayTS')));
        }

        if (localStorage.hasOwnProperty('displayView')) {
            setDisplayView(localStorage.getItem('setDisplayView'));
        }

        setCalendarData(getCalendarData());

        // console.log('calendarData');
        // console.log(calendarData);
        // console.log(`calendarData === 'empty'`);
        // console.log(`${calendarData} === ${'empty'}`);
        // console.log(calendarData === 'empty');
        // if (calendarData == 'empty') {
        //     getCalendarData();
            // console.log('data');
            // console.log(data);
            
            // console.log('calendar data');
            // console.log(calendarData);
        // }
        
        //console.log('calendarChores');
        //console.log(calendarChores);
    }, []);

    

    const handleChangeData = (newCalendarData) => {
        setCalendarData(newCalendarData);
        handleHideCalendarSettings();
    };
    // ◀️⬅️🔙
    return (
        <>
            <div className='p-2' id="calendarPageContainer">
                <div className='d-flex'>
                    <Link to="/home" className="m-2"><Button id='backButton'>{'<'}</Button></Link>
                    <div className="m-2" style={{'marginRight': 'auto'}} id="headText">{calendarData.title}</div>
                    <Button onClick={handleShowChoreForm} id="newChoreButton" className="col-2">Add New Chore</Button>
                    <Button onClick={handleShowCalendarSettings} className="m-2" id="settingsButton">⚙️</Button>
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