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

const BASE_URL = "https://34.148.183.141:8111/";

class DataService {
    /*                      ADD METHODS                     */
    
    // called when a user signs up
    // newUserData = { username, password }
    async addUser(newUserData) {
        let userResult = await fetch(`${BASE_URL}add_user_`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserData),
        }).then((response) => {
            console.log(`add user response:`);
            console.log(response);
            return response;
        });

        return userResult;
    }

    // called when a new calendar is created
    // calendarData = { title, display_name, color_code, user_id }
    async addCalendar(calendarData) {
        await fetch(`${BASE_URL}add_calendar_`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: calendarData.title,
                display_name: calendarData.display_name,
                color_code: calendarData.color_code,
                user_id: calendarData.user_id
            }),
        }).then((response) => {
            console.log(`add calendar response:`);
            console.log(response);
        });
    }

    // called when a user joins an existing calendar
    // joinData = { share_id, user_id, display_name, color_code }
    async joinCalendar(joinData) {
        await fetch(`${BASE_URL}add_calendar_user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                share_id: joinData.calendar_id,
                display_name: joinData.display_name,
                color_code: joinData.color_code,
                user_id: joinData.user_id
            }),
        }).then((response) => {
            console.log('join calendar response:');
            console.log(response);
        });
    }

    // called when a new chore is created
    // choreData = { calendar_id, title, description, start_date, end_date, first_user_idx, freq, time_frame, time_inc, does_repeat }
    async addChore(choreData) {
        console.log('addChore data');
        console.log(choreData);
        await fetch(`${BASE_URL}add_chore_`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(choreData),
        }).then((response) => {
            console.log(`add chore response`);
            console.log(response);
        });
    }

    /*                      GET METHODS                     */

    // called when user logs in
    // name = username entered on login
    async getUserByUsername(name) {
        let result = await fetch(`${BASE_URL}get_user_?` + new URLSearchParams({
            username: name
        }))
            .then(res => res.json())
            .then(body => {
                console.log('getUserByUsername body:');
                console.log(body)
                return body;
            });
        
        return result;
    }

    // called when displaying current user's available calendars
    // userId = current user's id
    async getUserCalendars(userId) {
        let result = await fetch(`${BASE_URL}get_user_calendars?` + new URLSearchParams({
            user_id: userId
        }))
            .then(res => res.json())
            .then(body => {
                console.log('getUserCalendars body');
                console.log(body)
                return body;
            });
        return result;
    }

    // called when displaying calendar data. returns chores and users belonging to that calendar
    // calendarId = id of calendar to display
    async getCalendarData(calendarId) {
        let result = await fetch(`${BASE_URL}get_calendar_chores_users?` + new URLSearchParams({
            calendar_id: calendarId
        }))
            .then(res => res.json())
            .then(body => {
                console.log('getCalendarData body:');
                console.log(body)
                return body;
            });
        return result;
    }

    /*                      EDIT METHODS                        */
    
    // called when calendar data (title) is edited
    // calendarData = { calendar_id, title }
    async editCalendar(calendarData) {
        console.log(`editing calendar with data:`);
        console.log(calendarData);
        await fetch(`${BASE_URL}edit_calendar`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(calendarData),
          })
            .then((response) => {
                console.log('edit calendar response:');
                console.log(response);
            });
    }

    // called when user updates display data for calendar 
    // userDisplayData = { user_id, display_name, color_code }
    async editUserDisplay(userDisplayData) {
        await fetch(`${BASE_URL}edit_calendar_users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userDisplayData}),
        })
            .then((response) => {
                console.log('edit user display response:');
                console.log(response);
            });     
    }

    // called when chore data is updated
    // choreData = { chore_id, description, start_date, time_frame }  ** chore_id is required
    //addChore({ string calendar_id, string title, string description, string start_date, string end_date, int first_user_idx, int freq, string time_frame, int time_inc, bool does_repeat })

    async editChore(choreData) {
        console.log(choreData);
        await fetch(`${BASE_URL}edit_chore`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(choreData),
        })
            .then((response) => {
                console.log('edit chore response');
                console.log(response);
            });
    }

    /*                      DELETE METHODS                      */

    //deleteCalendarUser({ string user_id, string calendar_id })
    async deleteCalendarUser(ids) {
        await fetch(`${BASE_URL}delete_user_in_calendar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteCalendarUser),
        });
    }
    
    //deleteChore( string choreId )
    async deleteChore(choreId) {
        fetch(`${BASE_URL}delete_chore`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                  chore_id: choreId
              }),
          });
    }

    //deleteCalendar( string calendar_id )
    async deleteCalendar(calendarId) {
        fetch(`${BASE_URL}delete_calendar`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                  calendar_id: calendarId
              }),
          });
                  
    }
}

let DS = new DataService();

export default DS;