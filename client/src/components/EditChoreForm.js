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


// props = calendarUsers, choreData
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

    console.log(props.choreData);
    const [repeating, setRepeating] = useState(props.choreData.does_repeat);
    const [choreIcon, setChoreIcon] = useState('');
    const [calendarId, setCalendarId] = useState(useParams().id);

    // addChore({ calendar_id, title, description, start_date, end_date, first_user_idx, freq, time_frame, time_inc, does_repeat })

    const [newChoreData, setNewChoreData] = useState({...props.choreData});

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'start_date' || name === 'end_date') {
            setNewChoreData({...newChoreData, [name]: new Date(value).getTimelessStamp()});
        } else {
            setNewChoreData({...newChoreData, [name]: value});
        }
        
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
        if (isNaN(newChoreData.end_date)) {
            newChoreData.end_date = '';
        }
        let startTS = parseInt(new Date(newChoreData.start_date).getTimelessStamp());
        newChoreData.start_date = startTS.toString();

        if (repeating) {
            let endTS = parseInt(new Date(newChoreData.end_date).getTimelessStamp());
            newChoreData.end_date = endTS.toString();
        } else {
            newChoreData.end_date = startTS.toString();
        }
        
        newChoreData.chore_title = `${newChoreData.chore_title} ${choreIcon}`;
        
        newChoreData.freq = parseInt(newChoreData.freq);
        const ms_in_one_day = 86400000;
        if (newChoreData.time_frame === 'week') {
            newChoreData.time_inc = (ms_in_one_day * 7 * newChoreData.freq);
        } else if (newChoreData.time_frame === 'day') {
            newChoreData.time_inc = (ms_in_one_day * newChoreData.freq);
        }

        console.log(calendarId);
        setNewChoreData({...newChoreData, does_repeat: repeating, calendar_id: calendarId});
        console.log(`adding chore with data:`);
        console.log(newChoreData);
        newChoreData.calendar_id = calendarId;
        // addChore({ string calendar_id, string title, string description, string start_date, string end_date, int first_user_idx, int freq, string time_frame, int time_inc, bool does_repeat })
        (DS.editChore(newChoreData)).then((response) => {
            console.log(newChoreData);
            console.log('adding chore...');
            console.log(response);
        });
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
                        value={new Date(parseInt(newChoreData.start_date)).toDateBoxString()}
                        onChange={handleChange}
                        defaultValue={newChoreData.start_date}
                    />
                </Form.Group>
                <Form.Group
                    name="first_user_idx"
                    style={{'width': '45%'}}
                    value={newChoreData.first_user_idx}
                    defaultValue={newChoreData.first_user_idx}
                    placeholder="User"
                    onChange={(e) => {
                        console.log(e.target.value)
                        setNewChoreData({ ...newChoreData, first_user_idx: e.target.value })}}
                >
                    <Form.Label>Assign first user:</Form.Label>
                    <Form.Select>
                        <option default value={newChoreData.first_user_idx}>{props.calendarUsers[newChoreData.first_user_idx].display_name}</option>
                        {(props.calendarUsers).map((user, index) => (
                            <option value={index}>{user.display_name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </div>

            
            
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="chore_description" value={newChoreData.chore_description} onChange={handleChange} />
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
                            {newChoreData.time_frame === 'week' ? (
                                <>
                                <option default value="week">Weeks</option>
                                <option value="day">Days</option>
                                </>
                            ) : (
                                <>
                                <option default value="day">Days</option>
                                <option value="week">Weeks</option>
                                </>
                            )}
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
                        {newChoreData.end_date === '' ? (
                            <Form.Control
                                type="date"
                                name="end_date"
                                placeholder="Date"
                                value={newChoreData.end_date}
                                onChange={handleChange}
                                defaultValue={newChoreData.end_date}
                            />
                        ) : (
                            <Form.Control
                                type="date"
                                name="end_date"
                                placeholder="Date"
                                value={new Date(parseInt(newChoreData.end_date)).toDateBoxString()}
                                onChange={handleChange}
                                defaultValue={new Date(parseInt(newChoreData.end_date)).toDateBoxString()}
                            />
                        )}
                    </Form.Group>

                    
                </>
            ) : (
                <></>
            )}
            <Button id="appButton" onClick={submitChoreForm}>Add Chore</Button>
        </Form>
    );
}

// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

// import Date from '../utils/dateUtils';
// import DS from '../services/dataService';
// /* CURRENT DATASERVICE METHODS
//   ADD METHODS
//     addUser({ string username, string password})
//     addCalendar({ string title, string display_name, string color_code, string user_id })
//     joinCalendar({ string share_id, string user_id, string display_name, string color_code })
//     addChore({ string calendar_id, string title, string description, string start_date, string end_date, int first_user_idx, int freq, string time_frame, int time_inc, bool does_repeat })
//   GET METHODS
//     getUserByUsername( string username )
//     getUserCalendars( string userId )
//     getCalendarData( string calendarId )
//   EDIT METHODS
//     editCalendar({ string calendarId, string title })
//     editUserDisplay({ string userId, string display_name, string color_code }) ** only userId is required
//     editChore({ string choreId, string description, string start_data, string time_frame })  ** only choreId is required
//   DELETE METHODS
//     deleteCalendarUser({ string user_id, string calendar_id })
//     deleteChore( string choreId )
//     deleteCalendar( string calendar_id )
// */

// // props = calendarUsers, choreData
// export default function EditChoreForm(props) {
//     // will appear in modal with the following input areas:
//     //  (string) title
//     //  (checkbox) repeating
//     //      - when repeating clicked, new option for chore frequency

//     // let users = [
//     //     {
//     //         id:'0',
//     //         name:'Liv'
//     //     },
//     //     {
//     //         id:'1',
//     //         name:'Mia'
//     //     }
//     // ];

//     // console.log(props.calendarUsers);

//     const [repeating, setRepeating] = useState(props.choreData.does_repeat);

//     const [newChoreData, setNewChoreData] = useState(props.choreData);

//     const handleChange = (event) => {
//         const {name, value} = event.target;
//         setNewChoreData({...newChoreData, [name]: value});
//     };

//     /*
//         chore_title: '',
//         chore_description: '',
//         first_user_idx: '',
//         start_date: '',
//         end_date: '',
//         time_inc: '',
//         does_repeat: '',
//         time_frame: '',
//         freq: ''   
//     */

//     const toggleRepeating = () => {
//         if (repeating === true) {
//             setRepeating(false);
//         } else {
//             setRepeating(true);
//         }
//     };

//     const submitChoreForm = async () => {
//         // add functionality to add chore to database
//         // get calendar id from local storage
//         // assign to user
//         if (isNaN(newChoreData.end_date)) {
//             newChoreData.end_date = '';
//         }
//         newChoreData.does_repeat = repeating;
//         let startTS = new Date(parseInt(newChoreData.start_date)).getTimelessStamp();
//         newChoreData.start_date = JSON.stringify(startTS);

//         if (repeating) {
//             let endTS = new Date(parseInt(newChoreData.end_date)).getTimelessStamp();
//             newChoreData.end_date = JSON.stringify(endTS);
//         } else {
//             //newChoreData.end_date = startTS;
//             setNewChoreData({...newChoreData, time_inc: '', time_frame: '', freq: '', end_date: JSON.stringify(startTS)});
//         }
        
        
//         const ms_in_one_day = 86400000;
//         if (newChoreData.time_frame === 'week') {
//             newChoreData.time_inc = (ms_in_one_day * 7 * newChoreData.freq);
//         } else if (newChoreData.time_frame === 'day') {
//             newChoreData.time_inc = (ms_in_one_day * newChoreData.freq);
//         }

//         console.log('chore form submitted');
//         console.log(newChoreData);

//         newChoreData.chore_id = JSON.stringify(newChoreData.chore_id);
//         newChoreData.calendar_id = JSON.stringify(newChoreData.calendar_id);
//         //editChore({ string choreId, string description, string start_data, string time_frame })  ** only choreId is required
//         await (DS.editChore(newChoreData)).then((response) => {
//             console.log('chore updated');
//             console.log(response);
//         });
//     };

//     return (
//         <Form id="appForm">
//             <Form.Group>
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control type="text" name="chore_title" value={newChoreData.chore_title} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="eventDate">
//                 <Form.Label>Start Date</Form.Label>
//                 <Form.Control
//                     type="date"
//                     name="start_date"
//                     placeholder="Date"
//                     value={new Date(parseInt(newChoreData.start_date)).toDateBoxString() ? new Date(parseInt(newChoreData.start_date)).toDateBoxString() : 'yyyy-MM-dd'}
//                     onChange={handleChange}
//                 />
//             </Form.Group>
//             <Form.Group
//                 name="first_user_idx"
//                 value={newChoreData.first_user_idx}
//                 placeholder="User"
//                 onChange={(e) => {setNewChoreData({ ...newChoreData, first_user_idx: e.target.value })}}
//             >
//                 <Form.Label>Assign first user:</Form.Label>
//                 <Form.Select>
//                     <option>User</option>
//                     {(props.calendarUsers).map((user, index) => (
//                         <option value={index}>{user.display_name}</option>
//                     ))}
//                 </Form.Select>
//             </Form.Group>
//             <Form.Group>
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control type="text" name="chore_description" value={newChoreData.chore_description} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group>
//                 <Form.Check 
//                     type="switch"
//                     name="repeating"
//                     label="Repeating"
//                     onClick={toggleRepeating}
//                     defaultChecked={repeating}
//                 />
//             </Form.Group>
//             {repeating ? (
//                 <>
//                 <Form.Group>
//                     <Form.Label>Repeat every</Form.Label>
//                     <div className='d-flex justify-content-center'>
//                     <Form.Control 
//                         type="text"
//                         name="freq"
//                         value={newChoreData.freq}
//                         placeholder='Quantity'
//                         style={{'width':'45%'}}
//                         onChange={handleChange}
//                     />
//                     <Form.Group
//                         name='time_frame'
//                         value={newChoreData.time_frame}
//                         onChange={(e) => {setNewChoreData({ ...newChoreData, time_frame: e.target.value })}}
//                         style={{'width':'45%'}}
//                     >
//                         <Form.Select aria-label="Frequency">
//                             <option>Frequency</option>
//                             <option value="week">Weeks</option>
//                             <option value="day">Days</option>
//                         </Form.Select>
//                     </Form.Group>
//                     </div>
//                 </Form.Group>



//                     {/* <Form.Group
//                         name="weekdays"
//                         onChange={handleChange}
//                         value={newChoreData.weekday}
//                     >
//                         {dayOptions.map(day => (
//                             <Form.Check
//                                 inline
//                                 label={day}
//                                 name={day}
//                                 type="checkbox"
//                             />
//                         ))}
//                     </Form.Group> */}
//                     <Form.Group className="mb-3" controlId="eventDate">
//                         <Form.Label>End Date</Form.Label>
//                         {newChoreData.end_date === '' ? (
//                             <Form.Control
//                                 type="date"
//                                 name="end_date"
//                                 placeholder="Date"
//                                 value={newChoreData.end_date}
//                                 onChange={handleChange}
//                             />
//                         ) : (
//                             <Form.Control
//                                 type="date"
//                                 name="end_date"
//                                 placeholder="Date"
//                                 value={new Date(parseInt(newChoreData.end_date)).toDateBoxString() ? new Date(parseInt(newChoreData.end_date)).toDateBoxString() : 'yyyy-MM-dd'}
//                                 onChange={handleChange}
//                             />
//                         )}
//                     </Form.Group>

                    
//                 </>
//             ) : (
//                 <></>
//             )}
//             <Button id="appButton" onClick={submitChoreForm}>Save</Button>
//         </Form>
//     );
// }