import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Date from '../utils/dateUtils';

// props = calendarUsers, choreData
export default function EditChoreForm(props) {
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

    const [repeating, setRepeating] = useState(props.choreData.repeating);

    const [newChoreData, setNewChoreData] = useState(props.choreData);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setNewChoreData({...newChoreData, [name]: value});
    };

    /*
        title: '',
        first_user_index: '',
        start_date: '',
        end_date: '',
        time_inc: '',
        repeating: '',
        freq_frame: '',
        freq_quantity: ''   
    */

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
        newChoreData.repeating = repeating;
        let startTS = new Date(newChoreData.start_date).getTimelessStamp();
        newChoreData.start_date = startTS;

        if (repeating) {
            let endTS = new Date(newChoreData.end_date).getTimelessStamp();
            newChoreData.end_date = endTS;
        } else {
            //newChoreData.end_date = startTS;
            setNewChoreData({...newChoreData, time_inc: '', freq_frame: '', freq_quantity: '', end_date: startTS});
        }
        
        
        const ms_in_one_day = 86400000;
        if (newChoreData.freq_frame === 'week') {
            newChoreData.time_inc = (ms_in_one_day * 7 * newChoreData.freq_quantity);
        } else if (newChoreData.freq_frame === 'day') {
            newChoreData.time_inc = (ms_in_one_day * newChoreData.freq_quantity);
        }

        console.log('chore form submitted');
        console.log(newChoreData);
    };

    return (
        <Form id="appForm">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={newChoreData.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="date"
                    name="start_date"
                    placeholder="Date"
                    value={new Date(newChoreData.start_date).toDateBoxString()}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group
                name="first_user_index"
                value={newChoreData.first_user_index}
                placeholder="User"
                onChange={(e) => {setNewChoreData({ ...newChoreData, first_user_index: e.target.value })}}
            >
                <Form.Label>Assign first user:</Form.Label>
                <Form.Select>
                    <option>User</option>
                    {(props.calendarUsers).map((user) => (
                        <option value={user.index}>{user.first_name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Check 
                    type="switch"
                    name="repeating"
                    label="Repeating"
                    onClick={toggleRepeating}
                    checked={repeating}
                />
            </Form.Group>
            {repeating ? (
                <>
                <Form.Group>
                    <Form.Label>Repeat every</Form.Label>
                    <div className='d-flex justify-content-center'>
                    <Form.Control 
                        type="text"
                        name="freq_quantity"
                        value={newChoreData.freq_quantity}
                        placeholder='Quantity'
                        style={{'width':'45%'}}
                        onChange={handleChange}
                    />
                    <Form.Group
                        name='freq_frame'
                        value={newChoreData.freq_frame}
                        onChange={(e) => {setNewChoreData({ ...newChoreData, freq_frame: e.target.value })}}
                        style={{'width':'45%'}}
                    >
                        <Form.Select aria-label="Frequency">
                            <option>Frequency</option>
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
                    <Form.Group className="mb-3" controlId="eventDate">
                        <Form.Label>End Date</Form.Label>
                        {newChoreData.end_date === '' ? (
                            <Form.Control
                                type="date"
                                name="end_date"
                                placeholder="Date"
                                value={newChoreData.end_date}
                                onChange={handleChange}
                            />
                        ) : (
                            <Form.Control
                                type="date"
                                name="end_date"
                                placeholder="Date"
                                value={new Date(newChoreData.end_date).toDateBoxString()}
                                onChange={handleChange}
                            />
                        )}
                    </Form.Group>

                    
                </>
            ) : (
                <></>
            )}
            <Button id="appButton" onClick={submitChoreForm}>Save</Button>
        </Form>
    );
}