import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { SliderPicker } from 'react-color';

import Calendar from './Calendar';
import DateBar from '../components/DateBar';
//import Nav from '../components/Nav';
import { Link } from "react-router-dom";
import DS from '../services/dataService';

/* CURRENT DATASERVICE METHODS
  ADD METHODS
    addUser({ string username, string password})
    addCalendar({ string title, string display_name, string color_code, string user_id })
    joinCalendar({ string share_id, string user_id, string display_name, string color_code })
    addChore({ string calendar_id, string title, string description, string start_date, string end_date, int first_user_idx, int freq, string time_frame, int time_inc, bool does_repeat })
  GET METHODS
    getUserByUsername( string username )
    getUserCalendars( string userId )
    getCalendarData( string calendarId )
  EDIT METHODS
    editCalendar({ string calendarId, string title })
    editUserDisplay({ string userId, string display_name, string color_code }) ** only userId is required
    editChore({ string choreId, string description, string start_data, string time_frame })  ** only choreId is required
  DELETE METHODS
    deleteCalendarUser({ string user_id, string calendar_id })
    deleteChore( string choreId )
    deleteCalendar( string calendar_id )
*/

export default function Home(props) {

    const [calendars, setCalendars] = useState([]);
    const [showNewCalendar, setShowNewCalendar] = useState(false);
    const [showJoinCalendar, setShowJoinCalendar] = useState(false);

    const handleShowNewCalendar = () => setShowNewCalendar(true);
    const handleHideNewCalendar = () => setShowNewCalendar(false);

    const handleShowJoinCalendar = () => setShowJoinCalendar(true);
    const handleHideJoinCalendar = () => setShowJoinCalendar(false);

    useEffect(async () => {
        await getCalendarList();
    }, []);

    const getCalendarList = async () => {
        // getUserCalendars( userId )
        let myCalendars = await (DS.getUserCalendars(localStorage.getItem('currUserId'))).then((response) => {
            console.log(`retrieving calendar list for user with id ${localStorage.getItem('currUserId')}`);
            console.log('calendar list response:');
            console.log(response.data);
            //setCalendars(response);
            return response.data;
        });
        setCalendars(myCalendars);
    };

    const directCalendar = (event) => {
        console.log(`redirecting to calendar with id ${event.target.name}`);
        localStorage.setItem('displayTS', (new Date().getTime()));
        localStorage.setItem('currCalendarTitle', event.target.name);
        localStorage.setItem('userCalId', event.target.value);
    };

    return (
        <>
        <div style={{'height': '100vh'}} id="homePageContainer">
            <div className='d-flex'>
                <div id="pageTitleText" className='d-flex' style={{'marginRight':'auto'}}>My Calendars</div>
                <Button onClick={handleShowNewCalendar} className="col-2 m-2">Create New Calendar</Button>
                <Button onClick={handleShowJoinCalendar} className="col-2 m-2">Join an Existing Calendar</Button>
            </div>
            
            <div className='d-flex flex-wrap'>
                {/* <Button onClick={combinedCalendar}>See all</Button> */}
                {calendars.map(calendar => (
                    <Link to={`/calendar/${calendar.calendar_id}`} key={calendar.calendar_id} className='col-2 m-2 d-flex flex-column'>
                        <Button onClick={directCalendar}  name={calendar.title} value={calendar.cl_usr_id} id="calendarButton">{calendar.title}</Button>
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
    const [currUserId, setCurrUserId] = useState(localStorage.getItem('currUserId'));

    const [sketchPickerColor, setSketchPickerColor] = useState('#000000');
      // destructuring rgba from state

    // set default value of users[0].display_name to be current user's first name
    // addCalendar({ title, display_name, color_code, user_id })
    const [newCalendarData, setNewCalendarData] = useState({
        title: '',
        display_name: '',
        color_code: '',
        user_id: ''
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setNewCalendarData({...newCalendarData, [name]: value});
    };

    const handleNewCalendar = () => {
        // add functionality to call addCalendar to add calendar to db with the calendarData and get calendar id in return
        // also add calendar's id to current user's user.calendars array of calendar ids
        /*  CALENDAR DATA
            {
                title: 'calendar title'
            }
        */
       console.log(currUserId);
       console.log(sketchPickerColor);
       newCalendarData.user_id = currUserId;
       newCalendarData.color_code = sketchPickerColor; 
       //setNewCalendarData({...newCalendarData, user_id: currUserId, color_code: sketchPickerColor});
       console.log(newCalendarData);

        (DS.addCalendar(newCalendarData)).then((response) => {
            console.log('adding calendar...');
            console.log(response);
        });

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
                <Form style={{'color':sketchPickerColor}} id="appForm">
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
                            name="display_name"
                            value={newCalendarData.display_name}
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

// joinCalendar({ share_id, user_id, display_name, color_code })
function JoinCalendarForm() {
    const [joinData, setJoinData] = useState({
        calendar_id: '',
        display_name: '',
        color_code: '#000000'
    });

    const [sketchPickerColor, setSketchPickerColor] = useState('#000000');

    const handleChange = (event) => {
        const {name, value} = event.target;
        setJoinData({...joinData, [name]: value});
    };

    const handleSubmit = () => {
        console.log(joinData);
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
       joinData['user_id'] = localStorage.getItem('currUserId');
       (DS.joinCalendar(joinData));
    };

    return (
        <Form style={{'color': sketchPickerColor}} id="appForm">
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

