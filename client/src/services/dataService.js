/*  FUNCTIONS       [ * = NEEDED ]
    User
        addUser
        getUserList
        getUserById(id)
        getUserByUsername(username)
        * editUser
    Calendar
        addCalendar
        getCalendarList
        getCalendarById(id)
        * editCalendar
    Chores
        addChore
        * getChore(id)
        * editChore(id)

*/

/*      CURRENT ENDPOINTS

fetch('http://34.73.17.225:8111/add_user_', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'palle',
        password: '123',
        name: 'Palle'
    }),
});


fetch('http://34.73.17.225:8111/add_calender_', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: 'My Calender'
    }),
});

fetch('http://34.73.17.225:8111/add_chore_', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: 'My Chore',
        description: 'My chore desc',
        start_date: '2023/07/06',
        end_date: '2023/08/06',
        first_user_idx: 1,
        freq: 2,
        time_inc: 1,
        does_repeat: true
    }),
});

*/

/*

//Get calenders list
fetch('http://34.73.17.225:8111/get_calender_').then(res => res.json()).then(body => {console.log(body)});


//Get calender view for a given calender with id
fetch('http://34.73.17.225:8111/get_calender_?' + new URLSearchParams({
    id: '1'
})).then(res => res.json()).then(body => {console.log(body)});


//Get users list
fetch('http://34.73.17.225:8111/get_user_').then(res => res.json()).then(body => {console.log(body)});



fetch('http://34.73.17.225:8111/get_user_?' + new URLSearchParams({
    id: '1'
})).then(res => res.json()).then(body => {console.log(body)});
*/

/*

//Get calenders list
fetch('http://34.73.17.225:8111/get_calender_').then(res => res.json()).then(body => {console.log(body)});

//Get calender view for a given calender with id
fetch('http://34.73.17.225:8111/get_calender_?' + new URLSearchParams({
    id: '1'
})).then(res => res.json()).then(body => {console.log(body)});

//Get users list
fetch('http://34.73.17.225:8111/get_user_').then(res => res.json()).then(body => {console.log(body)});

fetch('http://34.73.17.225:8111/get_user_?' + new URLSearchParams({
    id: '1'
})).then(res => res.json()).then(body => {console.log(body)});
*/

class DataService {
    async addUser(userData) {
        fetch('http://34.73.17.225:8111/add_user_', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        }).then(function (response) {
            console.log(response);
            return response.json();
        })
    }

    async getUserList() {
        fetch('http://34.73.17.225:8111/get_user_')
            .then(res => res.json())
            .then(body => {
                console.log(body)
            });
    }

    async getUserById(userId) {
        fetch('http://34.73.17.225:8111/get_user_?' + new URLSearchParams({
            id: userId
        }))
            .then(res => res.json())
            .then(body => {
                console.log(body)
            });
    }

    async getUserByUsername(username) {
        fetch('http://34.73.17.225:8111/get_user_?' + new URLSearchParams({
            username: username
        }))
            .then(res => res.json())
            .then(body => {
                console.log(body)
            });
    }

    async addCalendar(calendarData) {
        fetch('http://34.73.17.225:8111/add_calender_', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(calendarData),
        }).then(function (response) {
            console.log(response);
            return response.json();
        });
    }

    async getCalendarList() {
        fetch('http://34.73.17.225:8111/get_calender_')
            .then(res => res.json())
            .then(body => {
                console.log(body)
            });
    }

    async getCalendarById(calendarId) {
        fetch('http://34.73.17.225:8111/get_calender_?' + new URLSearchParams({
            id: calendarId
        }))
            .then(res => res.json())
            .then(body => {
                console.log(body)
            });
    }

    async addChore(choreData) {
        fetch('http://34.73.17.225:8111/add_chore_', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(choreData),
        });
    }
}


let DS = new DataService();

export default DS;