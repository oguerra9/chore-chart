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
import { Link, useParams } from "react-router-dom";
import DS from '../services/dataService';


// props: handlePageChange(pageName), calendarData
export default function Calendar(props) {
    // can use Holidays by API-Ninja to add holidays etc to calendar for extra * pizazz *
    const [displayTS, setDisplayTS] = useState('');
    const [displayView, setDisplayView] = useState('');
    const [displayId, setDisplayId] = useState(useParams().id);
    const [calendarArr, setCalendarArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);

    const [calendarData, setCalendarData] = useState([]);
    const [calendarTitle, setCalendarTitle] = useState(localStorage.getItem('currCalendarTitle'));
    
    const [calendarChores, setCalendarChores] = useState([]);

    const [showCalendarSettings, setShowCalendarSettings] = useState(false);
    const [showChoreForm, setShowChoreForm] = useState(false);

    const handleShowChoreForm = () => setShowChoreForm(true);
    const handleHideChoreForm = () => setShowChoreForm(false);

    const handleShowCalendarSettings = () => setShowCalendarSettings(true);
    const handleHideCalendarSettings = () => setShowCalendarSettings(false);

    const toggleRefresh = () => {
        if (refresh === true) {
            setRefresh(false);
        } else {
            setRefresh(true);
        }
    }

    useEffect(async () => {

        if (localStorage.hasOwnProperty('displayTS')) {
            setDisplayTS(new Date(localStorage.getItem('displayTS')));
        }

        if (localStorage.hasOwnProperty('displayView')) {
            setDisplayView(localStorage.getItem('setDisplayView'));
        }

        await retrieveCalendarData();
        // setCalendarData(getCalendarData());
    }, [refresh]);
    //}, [refreshCount]);

    const retrieveCalendarData = async () => {
        let retrievedData = await (DS.getCalendarData(displayId)).then((response) => {
            console.log(`calendar data response`);
            console.log(response.data);
            return response.data;
        });

        console.log('retrievedData');
        console.log(retrievedData);
        setCalendarData(retrievedData);
        setLoading(false);
    }

    return (
        <>
            <div className='p-2' id="calendarPageContainer">
                <div className='d-flex'>
                    <Link to="/home" className="m-2"><Button id='backButton'>{'<'}</Button></Link>
                    <div className="m-2" style={{'marginRight': 'auto','fontSize':'28px'}} id="headText">{calendarTitle}</div>
                    <Button onClick={handleShowChoreForm} id="newChoreButton" className="col-2">Add New Chore</Button>
                    <Button onClick={handleShowCalendarSettings} className="m-2" id="settingsButton">⚙️</Button>
                </div>
                
                {loading ? (
                    <></>
                ) : (
                    <Month scheduledChores={calendarData.chores} userArr={calendarData.users} displayId={displayId} refresh={refresh} />
                )}
            </div>
            

            <Modal show={showChoreForm} onHide={handleHideChoreForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Chore</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewChoreForm 
                        calendarUsers={calendarData.users} 
                        handleHideChoreForm={handleHideChoreForm} 
                        toggleRefresh={toggleRefresh} 
                    />
                </Modal.Body>
            </Modal>

            <Offcanvas show={showCalendarSettings} onHide={handleHideCalendarSettings}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Calendar Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CalendarSettings 
                        calendarData={{...calendarData, calendar_id: displayId, title: calendarTitle}} 
                        handleHideCalendarSettings={handleHideCalendarSettings} 
                        toggleRefresh={toggleRefresh} 
                        setCalendarTitle={setCalendarTitle}
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}