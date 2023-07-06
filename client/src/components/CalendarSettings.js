import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// props = calendarData, handleChangeData
export default function CalendarSettings(props) {
    /*
        title, users, chores, shareId
    */

    const [formData, setFormData] = useState(props.calendarData);
    const [editData, setEditData] = useState({});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = () => {
        props.handleChangeData(formData);
    };

    const editUser = (event) => {
        let userData = event.target.name;

    }


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
        <Form>
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
                            <p style={{'color': user.color_code}} className="m-2 mb-0 d-flex align-self-center" key={user}>{user.display_name}</p>
                            <Button onClick={editUser} name={JSON.stringify(user)} id="editButton">🔧</Button>
                        </div>
                        
                    ))}
                </div>
            </div>
            <div>
                <h4>Chores</h4>
                <div>
                    {formData.chores.map((chore) => (
                        <div key={chore.title}>{chore.title}</div>
                    ))}
                </div>
            </div>
            <div>
                <h4>Share Id</h4>
                <p>{formData.id}</p>
            </div>
            <Button onClick={handleSubmit}>Save Changes</Button>
        </Form>

        {/* <Modal>
            <Modal.Header>Edit User</Modal.Header>

        </Modal> */}
        </>
    );
}