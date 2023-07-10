import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import DS from '../services/dataService';



// props = calendarUsers, choreData
export default function NewChoreForm(props) {

    const [repeating, setRepeating] = useState(props.choreData.does_repeat);
    const [choreIcon, setChoreIcon] = useState('');
    const [calendarId, setCalendarId] = useState(useParams().id);
    const [startDate, setStartDate] = useState(new Date(parseInt(props.choreData.start_date)).toDateBoxString());
    const [endDate, setEndDate] = useState(new Date(parseInt(props.choreData.end_date)).toDateBoxString());

    
    const [newChoreData, setNewChoreData] = useState({});
    const [originalData, setOriginalData] = useState({
        calendar_id: props.choreData.calendar_id,
        description: props.choreData.chore_description,
        chore_id: props.choreData.chore_id,
        title: props.choreData.chore_title,
        does_repeat: props.choreData.does_repeat,
        end_date: props.choreData.end_date,
        first_user_idx: props.choreData.first_user_idx,
        freq: props.choreData.freq,
        start_date: props.choreData.start_date,
        time_frame: props.choreData.time_frame,
        time_inc: props.choreData.time_inc
    });

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

    const submitChoreForm = async () => {
        // add functionality to add chore to database
        // get calendar id from local storage
        // assign to user
        newChoreData.does_repeat = repeating;

        let startTS = new Date(startDate).nextDay().getTimelessStamp();
        newChoreData.start_date = startTS.toString();

        if (repeating) {
            let endTS = new Date(endDate).nextDay().getTimelessStamp();
            newChoreData.end_date = endTS.toString();
            let frequency = 0;
            if (newChoreData.hasOwnProperty('freq')) {
                frequency = parseInt(newChoreData.freq);
                newChoreData.freq = frequency;
            } else {
                frequency = parseInt(originalData.freq);
                newChoreData.freq = frequency;
            }
            
            const ms_in_one_day = 86400000;
            if (newChoreData.time_frame === 'week') {
                newChoreData.time_inc = (ms_in_one_day * 7 * frequency);
            } else if (newChoreData.time_frame === 'day') {
                newChoreData.time_inc = (ms_in_one_day * frequency);
            }
    
        } else {
            newChoreData.end_date = startTS.toString();
            newChoreData.freq = 0;
            newChoreData.time_frame = '';
            newChoreData.time_inc = 0;

        }
        
        setNewChoreData({...newChoreData, does_repeat: repeating });

        let sendData = {};
        let propertyNames = Object.getOwnPropertyNames(originalData);
        for (let i = 0; i < propertyNames.length; i++ ) {
            let name = propertyNames[i];
            if (newChoreData.hasOwnProperty(name)) {
                sendData[name] = newChoreData[name].toString();
            } else {
                sendData[name] = originalData[name].toString();
            }
        }


        await (DS.editChore(sendData)).then((response) => {
            console.log(sendData);
            console.log('adding chore...');
            console.log(response);
        });

        props.handleHideEditChore();
        props.handleHideCalendarSettings();
        props.toggleRefresh();
    };

    return (
        <Form id="appForm">
            <div className='d-flex justify-content-between'>
                <Form.Group style={{'width': '45%'}}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder={originalData.title} value={newChoreData.title} onChange={handleChange} />
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
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </Form.Group>
                <Form.Group
                    name="first_user_idx"
                    style={{'width': '45%'}}
                    value={newChoreData.first_user_idx}
                    defaultValue={newChoreData.first_user_idx}
                    placeholder={originalData.first_user_idx}
                    onChange={(e) => {setNewChoreData({ ...newChoreData, first_user_idx: e.target.value })}}
                >
                    <Form.Label>Assign first user:</Form.Label>
                    <Form.Select>
                        {/* <option default value={newChoreData.first_user_idx}>{props.calendarUsers[newChoreData.first_user_idx].display_name}</option> */}
                        {(props.calendarUsers).map((user, index) => (
                            <option value={index}>{user.display_name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </div>

            
            
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" placeholder={originalData.description} value={newChoreData.description} onChange={handleChange} />
            </Form.Group>
            
            
            <Form.Group>
                <Form.Check 
                    type="switch"
                    name="repeating"
                    label="Repeating"
                    onClick={toggleRepeating}
                    defaultChecked={repeating}
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
                        placeholder={originalData.freq}
                        style={{'width':'45%'}}
                        onChange={handleChange}
                    />
                    <Form.Group
                        name='time_frame'
                        value={newChoreData.time_frame}
                        placeholder={originalData.time_frame}
                        onChange={(e) => {setNewChoreData({ ...newChoreData, time_frame: e.target.value })}}
                        style={{'width':'45%'}}
                    >
                        <Form.Select aria-label="Time Frame">
                            <option default value={originalData.time_frame}>{originalData.time_frame}</option>
                            <option value="week">Weeks</option>
                            <option value="day">Days</option>
                        </Form.Select>
                    </Form.Group>
                    </div>
                </Form.Group>
                    <Form.Group className="mb-3" controlId="eventDate" style={{'width':'45%'}} 
                        defaultValue={new Date(originalData.end_date).toDateBoxString()}
                    >
                        <Form.Label>End Date</Form.Label>
                        {endDate === '' ? (
                            <Form.Control
                                type="date"
                                name="end_date"
                                placeholder="Date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        ) : (
                            <Form.Control
                                type="date"
                                name="end_date"
                                placeholder="Date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        )}
                    </Form.Group>

                    
                </>
            ) : (
                <></>
            )}
            <Button id="appButton" onClick={submitChoreForm}>Update Chore</Button>
        </Form>
    );
}