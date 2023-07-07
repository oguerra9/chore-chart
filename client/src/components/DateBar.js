import React from 'react';
import Date from '../utils/dateUtils';
import Button from 'react-bootstrap/Button';

// props = displayTS, handleChangeDate
export default function DateBar(props) {
    // on click update displayTS

    let dateString = `${new Date(props.displayTS).getMonthName()} ${new Date(props.displayTS).getFullYear()}`;

    const handleIncrement = () => {
        let currDate = new Date(props.displayTS);
        currDate.nextMonth();
        props.handleChangeDate(currDate.getTimelessStamp());
    };

    const handleDecrement = () => {
        let currDate = new Date(props.displayTS);
        currDate.prevMonth();
        props.handleChangeDate(currDate.getTimelessStamp());
    };

    return (
        <div className="d-flex justify-content-center">
                <div md="auto" >
                    <Button style={{'margin': '10px 0px 10px 0px'}} onClick={handleDecrement}>{'<'}</Button>
                </div>
                <div className="col-lg-4 justify-content-md-center">
                    <h1 style={{'textAlign': 'center', 'margin': '10px 0px 10px 0px'}} id="headText">{dateString}</h1>
                </div>
                <div md="auto">
                    <Button style={{'margin': '10px 0px 10px 0px'}} onClick={handleIncrement}>{'>'}</Button>
                </div>
        </div>
    );
}