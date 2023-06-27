import React from 'react'
import './MyBookings.css';

const BookingStatus = () => {
    return (
        <div className="status-and-card big-card">
            <div className="main-content-container">
                <div className="header">
                    <h2>
                        <span>Room </span>
                        <span>View </span>
                        <span>sea</span>
                    </h2>
                </div>
                <div className="paisa">
                    <h4>400$/day</h4>
                </div>

                <div className="footer">
                    <h3>View details-</h3>
                </div>
            </div>
            <div className='my-bookings-stay-interval'>
                <div className='from-to-dates small-cards'>
                    12/08/2023 to 24/09/2023
                </div>
                <div className='payment small-cards'>
                    Payment : Not Done
                </div>
                <div className='my-rating small-cards'>
                    My Rating : Not Done
                </div>
            </div>
        </div>
    )
}
const MyBookings = () => {
    return (
        <div className="room-container">
            <div className="card-container">
                <BookingStatus />
                <BookingStatus />
                <BookingStatus />
            </div>
        </div>
    )
}

export default MyBookings