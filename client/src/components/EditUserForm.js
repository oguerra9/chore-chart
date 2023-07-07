import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { SliderPicker } from 'react-color';
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

// props = userData
export default function EditUserForm(props) {

    const [sketchPickerColor, setSketchPickerColor] = useState('#000000');
    const [userData, setUserData] = useState(props.userData);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserData({...userData, [name]: value});
    };

    const handleSaveUser = async (event) => {
        setUserData({...userData, color_code: sketchPickerColor});
        // add functionality to update user in db
        console.log('updated user data:');
        console.log(userData);

        userData['color_code'] = sketchPickerColor;
        //editUserDisplay({ string userId, string display_name, string color_code }) ** only userId is required
        await (DS.editUserDisplay(userData)).then((response) => {
            console.log('editting user display');
            console.log(response);
        });
    };

    return (
        <Form style={{'color': sketchPickerColor}}>
            <Form.Group>
                <Form.Label>Display Name</Form.Label>
                <Form.Control 
                    type="text"
                    name="display_name"
                    value={userData.display_name}
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
            <Button id="appButton" onClick={handleSaveUser}>Save</Button>
        </Form>
    )
}