import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DS from '../services/dataService';

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
    const [choreIcon, setChoreIcon] = useState('');
    const iconOptions = ['🪠','🚽','🧻','🪣','🚿','🛁','🧼','🫧','🧽','🧴','🧹','🧺','💧','💦','☢️','⚠️','♻️','🗑️','🚻','🪥'];

    const [newChoreData, setNewChoreData] = useState({
        title: '',
        description: '',
        first_user_index: '',
        start_date: '',
        end_date: '',
        time_inc: '',
        repeating: '',
        freq_frame: '',
        freq_quantity: ''    // quantity refers to the number of [frequency] between each instance of the 
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
            newChoreData.end_date = startTS;
        }
        
        newChoreData.title = `${newChoreData.title} ${choreIcon}`;
        
        const ms_in_one_day = 86400000;
        if (newChoreData.freq_frame === 'week') {
            newChoreData.time_inc = (ms_in_one_day * 7 * newChoreData.freq_quantity);
        } else if (newChoreData.freq_frame === 'day') {
            newChoreData.time_inc = (ms_in_one_day * newChoreData.freq_quantity);
        }

        console.log('chore form submitted');
        console.log(newChoreData);
        /*  CHORE DATA
            {
                title: 'chore title',
                description: 'chore description',
                start_date: '2023/07/06',
                end_date: '2023/08/06',
                first_user_idx: 1,
                freq: 2,
                time_inc: 1,
                does_repeat: true
            }
        */
       let choreData = {
        title: newChoreData.title,
        description: newChoreData.description,
        start_date: newChoreData.start_date,
        end_date: newChoreData.end_date,
        first_user_idx: newChoreData.first_user_index,
        freq: newChoreData.freq_quantity,
        time_frame: newChoreData.freq_frame,
        // freq_quantity: newChoreData.freq_quantity,
        time_inc: newChoreData.time_inc,
        does_repeat: newChoreData.repeating
       };
        (DS.addChore(choreData)).then((response) => {
            console.log('adding chore...');
            console.log(response);
        });
    };

    return (
        <Form id="appForm">
            <div className='d-flex justify-content-between'>
                <Form.Group style={{'width': '45%'}}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={newChoreData.title} onChange={handleChange} />
                </Form.Group>
                <div style={{'width':'45%'}}>
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
                </div>
            </div>
            <div className='d-flex justify-content-between'>
                <Form.Group controlId="eventDate" style={{'width': '45%'}}>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="start_date"
                        placeholder="Date"
                        value={newChoreData.start_date}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group
                    name="first_user_index"
                    style={{'width': '45%'}}
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