import React, { useState, useEffect } from 'react';
import Home from './Home';
import Month from '../components/Month';
import Week from '../components/Week';
import CalendarSettings from '../components/CalendarSettings';
import DateBar from '../components/DateBar';
import NewChoreForm from '../components/NewChoreForm';

// props: handlePageChange(pageName)
export default function Calendar(props) {
    // can use Holidays by API-Ninja to add holidays etc to calendar for extra * pizazz *
    const [displayTS, setDisplayTS] = useState('');
    const [displayView, setDisplayView] = useState('');

    useEffect(() => {
        if (localStorage.hasOwnProperty('displayTS')) {
            setDisplayTS(localStorage.getItem('displayTS'));
        }

        if (localStorage.hasOwnProperty('displayView')) {
            setDisplayView(localStorage.getItem('setDisplayView'));
        }
    });

    // const renderTimeFrame = () => {
    //     if (displayView === 'month') {
    //         return (<Month />);
    //     } else if (displayView === 'week') {
    //         return (<Week />);
    //     } else {
    //         return (<Home />);
    //     }
    // }

    return (
        <div>
            <p>calendar view</p>
            {/* {renderTimeFrame()} */}
            <Month />
        </div>
    )


}




/*
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Date from '../utils/dateMethods';
import Modal from 'react-bootstrap/Modal';
import NewEventForm from './NewEventForm';
import DayBoxList from './DayBoxList';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function CalendarContainer() {
    const { view, timestamp, TSDate } = usePlannerContext();

    // states to store arrays of date objects to be displayed
    const [dates, setDates] = useState([]);
    const [months, setMonths] = useState([]);

    // date to be displayed on off canvas
    const [canvasDate, setCanvasDate] = useState(TSDate);

    // states to show/hide off-canvas display and new event form modal
    const [showCanvas, setShowCanvas] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // functions to show or hide off-canvas display
    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => setShowCanvas(true);
    
    // functions to show or hide new event form modal
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    let dateArr = [];
    let monthArr = [];

    let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    const getDateArr = () => {

        if (view === 'week') {
            dateArr = new Array();
            dateArr.push(TSDate.getWeekStart());
            let dayDate = new Date(TSDate.getWeekStart());
            console.log(`first day of week = ${dayDate}`);
            for (let i = 0; i < 6; i++) {
                dateArr.push(dayDate);
                dayDate = new Date(dayDate.nextDay());   
            }
            console.log(`week array = ${dateArr}`);
        }
        if (view === 'month') {
            dateArr = new Array();
            let dayDate = TSDate.getMonthStart();
            let dayNum = dayDate.getDay();
            let numDays = dayNum + dayDate.getDaysInMonth();
            dateArr.push(dayDate.getWeekStart());
            dayDate = dayDate.getWeekStart();

            for (let i = 1; i < numDays; i++) {
                dateArr.push(dayDate);
                dayDate = new Date(dayDate.nextDay());
            }

            while (dayDate.getDay() != 6) {
                dateArr.push(dayDate);
                dayDate = new Date(dayDate.nextDay());
            }
            
            monthArr = [];
            let index = 0;

            while (index < dateArr.length) {
                let weekArr = new Array();
                let weekIndex = 0;
                while (weekIndex < 7) {
                    weekArr.push(dateArr[index]);
                    index += 1;
                    weekIndex += 1;
                }
                monthArr.push(weekArr);
            }
        }
    };

    const getCardHeader = (day) => {
        if (view === 'month') {
            return day.getDate();
        }
        return (`${day.getDayName()} - ${day.getDisplayMonth()}/${day.getDate()}`);
    };

    return (
        <div style={{'border':'1px solid green', 'padding': '5px', 'margin': '5px'}}>
            <Container>
                {(view === 'month') ? (
                    <Row className="justify-content-md-center">
                        {dayNames.map(name => (
                            <Col id='WeekDayTitles' className='col-lg-2'>
                                {name}
                            </Col>
                        ))}
                    </Row>
                ) : (<></>)}
                <Row className="justify-content-md-center">
                    {dates.map(day => (
                        <Col style={{'margin': 0, 'padding': 0, 'width': '14%'}} className='col-lg-2'>
                            <Card 
                                key={day.getTimelessStamp()} 
                                id={`${view}Card`}
                                onClick={() => {
                                    console.log(`clicked ${new Date(day)}`);
                                    setCanvasDate(new Date(day));
                                    handleShowCanvas();
                                }}
                            >
                                <Card.Header style={{'margin': 0, 'padding': '2px'}}>{getCardHeader(day)}</Card.Header>
                                <Card.Body style={{'padding': '2px'}}>
                                    <DayBoxList dayDate={day} detailedView={false} />
                                </Card.Body>
                            </Card>                                   
                        </Col>
                    ))}
                </Row>
            </Container>

            <Offcanvas show={showCanvas} onHide={handleCloseCanvas} {...canvasDate}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Day's Events
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <DayBoxList dayDate={canvasDate} detailedView={true} />
                </Offcanvas.Body>
            </Offcanvas>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewEventForm />
                </Modal.Body>
            </Modal>
        </div>
    );

}

*/