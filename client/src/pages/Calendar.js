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

// props: handlePageChange(pageName), calendarData
export default function Calendar(props) {
    // can use Holidays by API-Ninja to add holidays etc to calendar for extra * pizazz *
    const [displayTS, setDisplayTS] = useState('');
    const [displayView, setDisplayView] = useState('');
    const [displayId, setDisplayId] = useState(useParams().id);
    const [calendarArr, setCalendarArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshCount, setRefreshCount] = useState(0);


    // const getCalendarData = () => {
    //     // will be replaced with call to db to retrieve data for calendar with displayId
    //     let retData = {};
    //     for (let i = 0; i < calendarArr.length; i++) {
    //         if (calendarArr[i].id === displayId) {
    //             retData = calendarArr[i];
    //             break;
    //         }
    //     }
    //     return retData;
    // };

    const [calendarData, setCalendarData] = useState([]);
    const [calendarTitle, setCalendarTitle] = useState(localStorage.getItem('currCalendarTitle'));
    
    const [calendarChores, setCalendarChores] = useState([]);

    const [showCalendarSettings, setShowCalendarSettings] = useState(false);
    const [showChoreForm, setShowChoreForm] = useState(false);

    const handleShowChoreForm = () => setShowChoreForm(true);
    const handleHideChoreForm = () => setShowChoreForm(false);

    const handleShowCalendarSettings = () => setShowCalendarSettings(true);
    const handleHideCalendarSettings = () => setShowCalendarSettings(false);

    useEffect(async () => {

        if (localStorage.hasOwnProperty('displayTS')) {
            setDisplayTS(new Date(localStorage.getItem('displayTS')));
        }

        if (localStorage.hasOwnProperty('displayView')) {
            setDisplayView(localStorage.getItem('setDisplayView'));
        }

        await retrieveCalendarData();
        console.log('');
        // setCalendarData(getCalendarData());
    }, []);
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

    const handleChangeData = async () => {
        //setCalendarData(newCalendarData);
        console.log('data change');
        await retrieveCalendarData();
        setRefreshCount(refreshCount + 1);
        handleHideCalendarSettings();
        window.location.pathname = window.location.pathname;
    };

    return (
        <>
            <div className='p-2' id="calendarPageContainer">
                <div className='d-flex'>
                    <Link to="/home" className="m-2"><Button id='backButton'>{'<'}</Button></Link>
                    <div className="m-2" style={{'marginRight': 'auto'}} id="headText">{calendarTitle}</div>
                    <Button onClick={handleShowChoreForm} id="newChoreButton" className="col-2">Add New Chore</Button>
                    <Button onClick={handleShowCalendarSettings} className="m-2" id="settingsButton">⚙️</Button>
                </div>
                
                {loading ? (
                    <></>
                ) : (
                    <Month scheduledChores={calendarData.chores} userArr={calendarData.users} />
                )}
            </div>
            

            <Modal show={showChoreForm} onHide={handleHideChoreForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Chore</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewChoreForm calendarUsers={calendarData.users} handleHideChoreForm={handleHideChoreForm} handleChangeData={handleChangeData} />
                </Modal.Body>
            </Modal>

            <Offcanvas show={showCalendarSettings} onHide={handleHideCalendarSettings}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Calendar Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CalendarSettings calendarData={{...calendarData, calendar_id: displayId, title: calendarTitle}} handleChangeData={handleChangeData} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}