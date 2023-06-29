import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Dashboard from '../../../components/Dashboard/DashboardLayout';
import { message } from 'antd';
import './AllRooms.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
export default function AllRooms() {
    const[Rooms,setRooms]=useState();


    const getAllRooms=()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/api/room/getAllRooms`)
        .then((result)=>{
          if(result.data.status)
          {
            console.log(result.data.rooms);
            setRooms(result.data.rooms);
          }
          else{
            message.error(result.message);
          }
        })
        .catch((error)=>{
          console.log(error);
        })
      }

   useEffect(()=>{
    if(!Rooms || Rooms.length === 0)
     getAllRooms();
 },[Rooms])


 
 return (
    <Dashboard>
        <div className="header">
            <div className="img">  <h2>Image</h2></div>
            <div className="bed"><h2>Bed-Size</h2></div>
            <div className="fac"><h2>Facility</h2></div>
            <div className="price"><h2>Price</h2></div>
            <div className="max"><h2>Max-count</h2></div>
        </div>
      {Rooms && Rooms.length > 0 ? (
        Rooms.map((room) => (
          <React.Fragment key={room.id}>
            <div className="all-rooms">
            <div className="all-room-img">
              {room.images && room.images.length > 0 && (
                <Carousel showThumbs={false} selectedItem={0}>
                {room.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt="" />
                  </div>
                ))}
              </Carousel>
              )}
            </div>
            <div className="allroom-bedsize">{room.bedsize}</div>
            <div className="allroom-facility">
                {
                    room?.services.map((service)=>{
                        return(
                            <>
                              {service},
                            </>
                        )
                    })
                }
            </div>
            <div className="allroom-price">
                {room?.price}
            </div>
            <div className="allroom-capacity">
                {room?.capacity}
            </div>
            </div>
          </React.Fragment>
        ))
      ) : (
        <div>No rooms available.</div>
      )}
    </Dashboard>
  );
}  
