import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { SliderPicker } from 'react-color';

import Calendar from './Calendar';
import DateBar from '../components/DateBar';
//import Nav from '../components/Nav';
import NewChoreForm from '../components/NewChoreForm';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    HashRouter,
  } from "react-router-dom";

// props: handlePageChange(pageName)
export default function Home(props) {
    // if (props.loggedIn === false) {
    //     window.location.pathname = '/login';
    // }
    // give user option to create new calendar
    const [showNewCalendar, setShowNewCalendar] = useState(false);
    const [showJoinCalendar, setShowJoinCalendar] = useState(false);

    const handleShowNewCalendar = () => setShowNewCalendar(true);
    const handleHideNewCalendar = () => setShowNewCalendar(false);

    const handleShowJoinCalendar = () => setShowJoinCalendar(true);
    const handleHideJoinCalendar = () => setShowJoinCalendar(false);

    let calendars = [
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
    ];

    const directCalendar = (event) => {
        console.log(event.target);
        console.log(`redirecting to calendar with id ${event.target.name}`);
        localStorage.setItem('displayTS', (new Date().getTime()));
        localStorage.setItem('currCalendar', event.target.name);
        //window.location.pathname = `/calendar/${event.target.name}`;
        //handlePageChange('calendar');
    };

    // const combinedCalendar = () => {
    //     console.log(`redirecting to calendar with data from all calendars`);
    //     localStorage.setItem('currCalendar', 'combinedCalendar');
    //     localStorage.setItem('displayTS', (new Date().getTime()));

    //     window.location.pathname = `/calendar/combined`;
    //     //handlePageChange('calendar');
    // }

    return (
        <>
        <div className='p-2' style={{'height': '100vh'}}>
            <div>
                <h1>My Calendars</h1>
                <Button onClick={handleShowNewCalendar} className="col-2 m-2">Create New Calendar</Button>
                <Button onClick={handleShowJoinCalendar} className="col-2 m-2">Join an Existing Calendar</Button>
            </div>
            
            <div className='d-flex flex-wrap' style={{'height': '100%'}}>
                {/* <Button onClick={combinedCalendar}>See all</Button> */}
                {calendars.map(calendar => (
                    // <button onClick={directCalendar} name={calendar.id} key={calendar.id} id="calendarButton" className='col-2 m-2'>
                    //     {calendar.title}
                    // </button>
                    <Link to={`/calendar/${calendar.id}`} key={calendar.id} className='col-2 m-2'>
                        <Button onClick={directCalendar}  name={calendar.id} id="calendarButton">{calendar.title}</Button>
                    </Link>
                ))}
            </div>
        </div>

            <Modal show={showNewCalendar} onHide={handleHideNewCalendar}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewCalendarForm />
                </Modal.Body>
            </Modal>

            <Modal show={showJoinCalendar} onHide={handleHideJoinCalendar}>
                <Modal.Header closeButton>
                    <Modal.Title>Join Existing Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <JoinCalendarForm />
                </Modal.Body>
            </Modal>
        </>
    );
}

function NewCalendarForm() {
    const [created, setCreated] = useState(false);
    const [shareId, setShareId] = useState('');

    const [sketchPickerColor, setSketchPickerColor] = useState('#000000');
      // destructuring rgba from state

    // set default value of users[0].display_name to be current user's first name
    const [newCalendarData, setNewCalendarData] = useState({
        title: '',
        users: [
            {
                id: 'myId',
                display_name: 'Liv',
                color_code: ''
            }
        ]
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setNewCalendarData({...newCalendarData, [name]: value});
    };

    const handleNewCalendar = () => {
        newCalendarData.users[0].color_code = sketchPickerColor;
        console.log(sketchPickerColor);
        // add functionality to call addCalendar to add calendar to db with the calendarData and get calendar id in return
        // also add calendar's id to current user's user.calendars array of calendar ids
        setShareId('calendarId');
        console.log('creating new calendar...');
        console.log(newCalendarData);
        //handleShowShareId();
        setCreated(true);
    };

    return (
        <>
            {created ? (
                <div>
                    <h3>{shareId}</h3>
                    <p>Share this id with other users so they can join this calendar</p>
                </div>
            ) : (
                <Form style={{'color':sketchPickerColor}}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text"
                            name="title"
                            value={newCalendarData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Your Display Name</Form.Label>
                        <Form.Control 
                            type="text"
                            name="users[0].display_name"
                            value={newCalendarData.users[0].display_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Display Color</Form.Label>
                        <SliderPicker
                            onChange={(color) => {
                                setSketchPickerColor(color.hex);
                            }}
                            color={sketchPickerColor}
                        /> 
                    </Form.Group>
                    <Button onClick={handleNewCalendar} style={{'backgroundColor': sketchPickerColor}}>Create Calendar</Button>
                </Form>
            )}
        </>
    );

}

function JoinCalendarForm() {
    const [joinData, setJoinData] = useState({
        calendar_id: '',
        display_name: '',
        color_code: ''
    });

    const [sketchPickerColor, setSketchPickerColor] = useState('#000000');

    const handleChange = (event) => {
        const {name, value} = event.target;
        setJoinData({...joinData, [name]: value});
    };

    const handleSubmit = () => {
        // add functionality to add user to calendar with id = joinData.calendar_id and add calendar id to user's calendars arr
        // add to calendar.users array:
        /*
            {
                id: this user's id,
                display_name: joinData.display_name,
                color_code: joinData.color_code
            }
        */
       // add to user.calendars array:
       /* joinData.calendar_id */
       console.log('joining calendar...');
       console.log(joinData);
    };

    return (
        <Form style={{'color': sketchPickerColor}}>
            <Form.Group>
                <Form.Label>Calendar ID</Form.Label>
                <Form.Control 
                    type="text"
                    name="calendar_id"
                    value={joinData.calendar_id}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                    type="text"
                    name="display_name"
                    value={joinData.display_name}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Display Color</Form.Label>
                <SliderPicker
                            onChange={(color) => {
                                setSketchPickerColor(color.hex);
                            }}
                            color={sketchPickerColor}
                /> 
            </Form.Group>
            <Button onClick={handleSubmit} style={{'backgroundColor': sketchPickerColor}}>Join Calendar</Button>
        </Form>
    );
}