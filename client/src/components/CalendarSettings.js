import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import EditUserForm from './EditUserForm';
import EditChoreForm from './EditChoreForm';

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

// props = calendarData, handleChangeData
export default function CalendarSettings(props) {
    /*
        title, users, chores, shareId
    */

    const [formData, setFormData] = useState(props.calendarData);
    console.log(props.calendarData);
    const [userCalId, setUserCalId] = useState(localStorage.getItem('userCalId'));
    const [editUserData, setEditUserData] = useState({});
    const [editChoreData, setEditChoreData] = useState({});

    const [showEditUser, setShowEditUser] = useState(false);
    const [showEditChore, setShowEditChore] = useState(false);

    const handleShowEditUser = () => setShowEditUser(true);
    const handleHideEditUser = () => setShowEditUser(false);

    const handleShowEditChore = () => setShowEditChore(true);
    const handleHideEditChore = () => setShowEditChore(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async () => {
        console.log('updated calendar data');
        console.log(formData);
        //editCalendar({ string calendarId, string title })
        await (DS.editCalendar({calendar_id: (formData['calendar_id']).toString(), title: (formData.title)})).then((response) => {
            console.log(`updated calendar`);
            console.log(response);
        });

        localStorage.setItem('currCalendarTitle', formData.title);

        props.handleChangeData();
    };

    const editUser = (event) => {
        let userData = JSON.parse(event.target.name);
        setEditUserData(userData);
        console.log('edit user');
        console.log(userData);
        handleShowEditUser();

    };

    const editChore = (event) => {
        let choreData = JSON.parse(event.target.name);
        setEditChoreData(choreData);
        console.log('edit chore');
        console.log(choreData);
        handleShowEditChore();
    };


    // option to change name of calendar
    // master list of chores with option to edit or delete
    // list of users currently associated with the calendar
    // option to share calendar with other
    //      when clicked, give code to user to give to other users
    //      when other user enters code, add user object to calendar object's list of users
    //      add calendar object to user object's list of calendars
    // if time, give option to customize appearance of calendar (background, user/chore color coding, etc)



    return (
        <>
        <Form id="appForm">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                />
            </Form.Group>
            <div>
                <h4>Users</h4>
                <div>
                    {formData.users.map((user) => (
                        <div className='d-flex mb-2' key={user.id}>
                            {console.log(user)}
                            <div style={{'color': user.color_code}} className="m-2 mb-0 d-flex align-self-center" key={user}>{user.display_name}</div>
                            {userCalId == user.cl_usr_id ? (
                                <Button onClick={editUser} name={JSON.stringify(user)} id="editButton">🔧</Button>
                            ) : (
                                <></>
                            )}
                            {/* <Button onClick={editUser} name={JSON.stringify(user)} id="editButton">🔧</Button> */}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4>Chores</h4>
                <div>
                    {formData.chores.map((chore) => (
                        <div className='d-flex mb-2' key={chore.chore_id}>
                            <div className="m-2 mb-0 d-flex align-self-center">{chore.chore_title}</div>
                            <Button onClick={editChore} name={JSON.stringify(chore)} id="editButton">🔧</Button>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4>Share Id</h4>
                <p>{formData.id}</p>
            </div>
            <Button id="appButton" onClick={handleSubmit}>Save Changes</Button>
        </Form>

        <Modal show={showEditUser} onHide={handleHideEditUser}>
            <Modal.Header closeButton>
                Edit User
            </Modal.Header>
            <Modal.Body>
                <EditUserForm userData={editUserData} />
            </Modal.Body>
        </Modal>

        <Modal show={showEditChore} onHide={handleHideEditChore}>
            <Modal.Header closeButton>
                Edit Chore
            </Modal.Header>
            <Modal.Body>
                <EditChoreForm choreData={editChoreData} calendarUsers={formData.users} />
            </Modal.Body>
        </Modal>
        </>
    );
}