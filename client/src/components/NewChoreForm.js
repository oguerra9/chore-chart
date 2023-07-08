import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
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
    deleteCalendarUser({ string user_id, string })
    deleteChore( string choreId )
    deleteCalendar( string calendar_id )
*/


// props = calendarUsers
export default function NewChoreForm(props) {
    // will appear in modal with the following input areas:
    //  (string) title
    //  (checkbox) repeating
    //      - when repeating clicked, new option for chore frequency

    // let users = [
    //     {
    //         id:'0',
    //         name:'Liv'
    //     },
    //     {
    //         id:'1',
    //         name:'Mia'
    //     }
    // ];

    // console.log(props.calendarUsers);

    const [repeating, setRepeating] = useState(false);
    const [calendarId, setCalendarId] = useState(useParams().id);

    // addChore({ calendar_id, title, description, start_date, end_date, first_user_idx, freq, time_frame, time_inc, does_repeat })

    const [newChoreData, setNewChoreData] = useState({});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setNewChoreData({...newChoreData, [name]: value});
    };

    const toggleRepeating = () => {
        if (repeating === true) {
            setRepeating(false);
        } else {
            setRepeating(true);
        }
    };

    const submitChoreForm = () => {
        // add functionality to add chore to database
        // get calendar id from local storage
        // assign to user
        newChoreData.does_repeat = repeating;
        // if (isNaN(newChoreData.end_date)) {
        //     newChoreData.end_date = '';
        // }
        let startTS = JSON.stringify(new Date(newChoreData.start_date).getTimelessStamp());
        newChoreData.start_date = startTS;

        if (repeating) {
            console.log('repeating');
            console.log(newChoreData.end_date);
            let endTS = JSON.stringify(new Date(newChoreData.end_date).getTimelessStamp());
            newChoreData.end_date = endTS;
            newChoreData.freq = parseInt(newChoreData.freq);
            const ms_in_one_day = 86400000;
            if (newChoreData.time_frame === 'week') {
                newChoreData.time_inc = (ms_in_one_day * 7 * newChoreData.freq);
            } else if (newChoreData.time_frame === 'day') {
                newChoreData.time_inc = (ms_in_one_day * newChoreData.freq);
            }
    
        } else {
            newChoreData.end_date = startTS;
            // newChoreData.freq = '';
            // newChoreData.time_frame = '';
            // newChoreData.time_inc = '';

        }
        

        console.log(calendarId);
        setNewChoreData({...newChoreData, does_repeat: repeating, calendar_id: calendarId});
        console.log(`adding chore with data:`);
        console.log(newChoreData);
        newChoreData.calendar_id = calendarId;
        
        let propertyNames = Object.getOwnPropertyNames(newChoreData);
        console.log(propertyNames);
        for (let i = 0; i < propertyNames.length; i++) {
            let propertyName = propertyNames[i];
            newChoreData[propertyName] = newChoreData[propertyName].toString();
        }
        propertyNames.forEach((property) => {
            newChoreData[property] = newChoreData[property].toString();
        })
        // addChore({ string calendar_id, string title, string description, string start_date, string end_date, int first_user_idx, int freq, string time_frame, int time_inc, bool does_repeat })
        // (DS.addChore(newChoreData)).then((response) => {
        //     console.log('adding chore...');
        //     console.log(response);
        // });

        props.handleHideChoreForm();
        props.handleChangeData();
    };

    return (
        <Form id="appForm">
            <div className='d-flex justify-content-between'>
                <Form.Group style={{'width': '45%'}}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="chore_title" value={newChoreData.chore_title} onChange={handleChange} />
                </Form.Group>
                {/* <div style={{'width':'45%'}}>
                    <Form.Group
                        className="d-flex flex-column"
                        value={choreIcon}
                        onChange={(e) => {setChoreIcon(e.target.value)}}
                    >
                        <Form.Label>Icon</Form.Label>
                        <Form.Select>
                            <option disabled> </option>
                            {(iconOptions).map((icon) => (
                                <option value={icon} style={{'fontSize':'20px'}}>{icon}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </div> */}
            </div>
            <div className='d-flex justify-content-between'>
                <Form.Group controlId="eventDate" style={{'width': '45%'}}>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="start_date"
                        placeholder="Date"
                        value={newChoreData.start_date}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group
                    name="first_user_idx"
                    style={{'width': '45%'}}
                    value={newChoreData.first_user_idx}
                    placeholder="User"
                    onChange={(e) => {setNewChoreData({ ...newChoreData, first_user_idx: parseInt(e.target.value) })}}
                >
                    <Form.Label>Assign first user:</Form.Label>
                    <Form.Select>
                        <option>User</option>
                        {(props.calendarUsers).map((user, index) => (
                            <option value={index}>{user.display_name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </div>

            
            
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value={newChoreData.description} onChange={handleChange} />
            </Form.Group>
            
            
            <Form.Group>
                <Form.Check 
                    type="switch"
                    name="repeating"
                    label="Repeating"
                    onClick={toggleRepeating}
                />
            </Form.Group>
            {repeating ? (
                <>
                <Form.Group>
                    <Form.Label>Repeat every</Form.Label>
                    <div className='d-flex justify-content-between'>
                    <Form.Control 
                        type="text"
                        name="freq"
                        value={newChoreData.freq}
                        placeholder='Quantity'
                        style={{'width':'45%'}}
                        onChange={handleChange}
                    />
                    <Form.Group
                        name='time_frame'
                        value={newChoreData.time_frame}
                        onChange={(e) => {setNewChoreData({ ...newChoreData, time_frame: e.target.value })}}
                        style={{'width':'45%'}}
                    >
                        <Form.Select aria-label="Time Frame">
                            <option>Time Frame</option>
                            <option value="week">Weeks</option>
                            <option value="day">Days</option>
                        </Form.Select>
                    </Form.Group>
                    </div>
                </Form.Group>



                    {/* <Form.Group
                        name="weekdays"
                        onChange={handleChange}
                        value={newChoreData.weekday}
                    >
                        {dayOptions.map(day => (
                            <Form.Check
                                inline
                                label={day}
                                name={day}
                                type="checkbox"
                            />
                        ))}
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="eventDate" style={{'width':'45%'}}>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="end_date"
                            placeholder="Date"
                            value={newChoreData.end_date}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    
                </>
            ) : (
                <></>
            )}
            <Button id="appButton" onClick={submitChoreForm}>Add Chore</Button>
        </Form>
    );
}