import React from 'react';
import Button from 'react-bootstrap/Button';

// props: handlePageChange(pageName)
export default function Navi(props) {
    // options
    // (if logged in): log out
    // month view
    // week view
    // 
    const directPage = (pageName) => {
        window.location.pathname = `/${pageName}`;
    };

    const handleLogout = () => {
        localStorage.removeItem('currUser');
        window.location.pathname = `/login`;
    }

    return (
        <div>
            <Button onClick={directPage('home')}>Chore Chart</Button>
            <Button onClick={directPage('home')}>Home</Button>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}