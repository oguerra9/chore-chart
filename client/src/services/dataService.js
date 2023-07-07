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



class DataService {
    // async getUser(username) {
    //     await getDoc(doc(db, "users", username))
    //         .then((querySnapshot)=>{               
    //             return querySnapshot.data();
    //         })
    // }
    async addUser(userData) {
        // currently receiving Status 500: Internal Server Error when trying to add new user
        /* USER DATA
            {
                username: 'palle',
                password: '123',
                name: 'Palle'
            }
        */
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

    async addCalendar(calendarData) {
        // working to add new calendar with field 'title'
        // need to add functionality to automatically add current user to calendar list of users
        /*  CALENDAR DATA
            {
                title: 'calendar title',
                
            }
        */
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

    async addChore(choreData) {
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