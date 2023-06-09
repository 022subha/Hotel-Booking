import React from 'react'
import './Card.css';
export default function Card() {
  return (
    <div className='card-container'>
        <div className='main-container'>
            <div className='img'>
                <img src="/images/Rooms/Rooms1.webp"/>
            </div>
            <div className="description">
                <div className="header">
                     <h2>Room View sea</h2>
                </div>
                <div className='paisa'>
                    <h4>400$/day</h4>
                </div>
                <div className="middle">
                     <div className="size">
                      <h3>
                        Size:
                        <span>30ft</span>
                      </h3>
                      <h3>
                        capacity:
                        <span>Max Person 5</span>
                      </h3>
                     </div>
                     <div className="bed">
                       <h3>
                        Bed:
                        <span>kings bed</span>
                        </h3>
                       <h3>
                        Services:
                        <span>Wifi,Television</span>
                        </h3>
                     </div>
                </div>
                <div className="footer">
                   <h3>View details--</h3>
                </div>
            </div>
        </div>
    </div>
  )
}
