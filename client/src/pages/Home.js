import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { SliderPicker } from 'react-color';

import Calendar from './Calendar';
import DateBar from '../components/DateBar';
//import Nav from '../components/Nav';
import { Link } from "react-router-dom";
import DS from '../services/dataService';

export default function Home(props) {

    const [calendars, setCalendars] = useState([]);
    const [showNewCalendar, setShowNewCalendar] = useState(false);
    const [showJoinCalendar, setShowJoinCalendar] = useState(false);
    const [refresh, setRefresh] = useState(true);

    const handleShowNewCalendar = () => setShowNewCalendar(true);
    const handleHideNewCalendar = () => setShowNewCalendar(false);

    const handleShowJoinCalendar = () => setShowJoinCalendar(true);
    const handleHideJoinCalendar = () => setShowJoinCalendar(false);

    const toggleRefresh = () => {
        if (refresh === true) {
            setRefresh(false);
        } else {
            setRefresh(true);
        }
    }

    useEffect(async () => {
        console.log('home page use effect');
        await getCalendarList();
    }, [refresh]);

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
                    <NewCalendarForm toggleRefresh={toggleRefresh} handleHideNewCalendar={handleHideNewCalendar} />
                </Modal.Body>
            </Modal>

            <Modal show={showJoinCalendar} onHide={handleHideJoinCalendar}>
                <Modal.Header closeButton>
                    <Modal.Title>Join Existing Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <JoinCalendarForm toggleRefresh={toggleRefresh} handleHideJoinCalendar={handleHideJoinCalendar} />
                </Modal.Body>
            </Modal>
        </>
    );
}

function NewCalendarForm(props) {
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

        (DS.addCalendar(newCalendarData)).then((data) => {
            console.log('adding calendar...');
            console.log(data);
            setShareId(data.data[0].share_id)
        });

        //handleShowShareId();
        setCreated(true);
        
    };

    const handleDone = () => {
        props.handleHideNewCalendar();
        props.toggleRefresh();
    }

    return (
        <>
            {created ? (
                <div>
                    <InputGroup className="mb-3">
                        <Button onClick={() => {navigator.clipboard.writeText(shareId)}} id="copyButton">📋</Button>
                        <Form.Control
                            value={shareId}
                            style={{'fontSize':'18px'}}
                            disabled
                        />
                    </InputGroup>
                    <Form.Label htmlFor="basic-url"><p>Share this id with other users so they can join this calendar</p></Form.Label>
                    <Button onClick={handleDone} id="appButton">Done</Button>

                    {/* <div className='d-flex'>
                        <h3>{shareId}</h3>
                        
                    </div> */}
                    {/* <p>Share this id with other users so they can join this calendar</p>
                    <Button onClick={handleDone}>Done</Button> */}
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
function JoinCalendarForm(props) {
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

    const handleSubmit = async () => {
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
       await (DS.joinCalendar(joinData));
       props.handleHideJoinCalendar();
       props.toggleRefresh();

    };

    return (
        <Form style={{'color': sketchPickerColor}} id="appForm">
            <Form.Group>
                <Form.Label>Calendar ID</Form.Label>
                <Form.Control 
                    type="text"
                    name="share_id"
                    value={joinData.share_id}
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

