import React, { useState, useEffect } from 'react';
import Date from '../utils/dateUtils';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';


export default function Month() {
    const [displayTS, setDisplayTS] = useState('');
    //const [pageDate, setPageDate] = useState('');
    const [dateArr, setDateArr] = useState([]);

    const [showCanvas, setShowCanvas] = useState(false);
    const [canvasDate, setCanvasDate] = useState('');

    // functions to show or hide off-canvas display
    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => setShowCanvas(true);

    let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        if (localStorage.hasOwnProperty('displayTS')) {
            setDisplayTS(localStorage.getItem('displayTS'));
            console.log('set display ts');
            setCanvasDate(localStorage.getItem('displayTS'));
        }
        getDateArr();

    });

    const getDateArr = () => {
        let myDateArr = new Array();
        let dayDate = displayTS.getMonthStart();
        let dayNum = dayDate.getDay();
        let numDays = dayNum + dayDate.getDaysInMonth();
        myDateArr.push(dayDate.getWeekStart());
        dayDate = dayDate.getWeekStart();

        for (let i = 1; i < numDays; i++) {
            dateArr.push(dayDate);
            dayDate = new Date(dayDate.nextDay());
        }

        while (dayDate.getDay() != 6) {
            dateArr.push(dayDate);
            dayDate = new Date(dayDate.nextDay());
        }
        
        let monthArr = [];
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

        setDateArr(monthArr);
    }

    const getCardHeader = (day) => {
        return day.getDate();
    };

    return (
        <div style={{'border':'1px solid green', 'padding': '5px', 'margin': '5px'}}>
            <Container>
                    <Row className="justify-content-md-center">
                        {dayNames.map(name => (
                            <Col id='WeekDayTitles' className='col-lg-2'>
                                {name}
                            </Col>
                        ))}
                    </Row>
                <Row className="justify-content-md-center">
                    {dateArr.map(day => (
                        <Col style={{'margin': 0, 'padding': 0, 'width': '14%'}} className='col-lg-2'>
                            <Card 
                                key={day.getTimelessStamp()} 
                                id={`dateCard`}
                                onClick={() => {
                                    console.log(`clicked ${new Date(day)}`);
                                    setCanvasDate(new Date(day));
                                    handleShowCanvas();
                                }}
                            >
                                <Card.Header style={{'margin': 0, 'padding': '2px'}}>{getCardHeader(day)}</Card.Header>
                                <Card.Body style={{'padding': '2px'}}>
                                    {/* <DayBoxList dayDate={day} detailedView={false} /> */}
                                    <div>Day List</div>
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
                    {/* <DayBoxList dayDate={canvasDate} detailedView={true} /> */}
                    <div>Day List</div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )

}