import React, { useState,useEffect } from "react";
import Card from "../../components/Card/Card";
import "./Rooms.css";
import axios from "axios";
import {message} from 'antd';
export default function Rooms() {
  const [toggleBed, setToggleBed] = useState(false);
  const[togglePrice,setTogglePrice]=useState(false);
  const[data1,setData1]=useState(0);
  const[data2,setData2]=useState(0);
  const[SelectedOptions,setSelectedOptions]=useState([]);
  
  const[RoomData,setRoomData]=useState([]);

  const getAllRooms=()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/room/getAllRooms`)
    .then((result)=>{
      if(result.data.status)
      {
        console.log(result.data.rooms);
        setRoomData(result.data.rooms);
        console.log(RoomData);
      }
      else{
        message.error(result.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }



  const handleCheckBoxChange=(event)=>{
    const value=event.target.value;
    const isChecked=event.target.checked;
   
    if(isChecked)
    {
       setSelectedOptions([...SelectedOptions,value]);
    }
    else{
      const updatedValues=SelectedOptions.filter((option)=>{return(option!==value)});
      setSelectedOptions(updatedValues);
    }

  }

  const handleToggleBed = () => {
    setToggleBed(!toggleBed);
  };
  const handleTogglePrice = () => {
    setTogglePrice(!togglePrice);
  };

  useEffect(()=>{
    console.log(data1);console.log(data2);
  },[data1,data2])
 useEffect(()=>{
  if(SelectedOptions)
   console.log(SelectedOptions);
 },[SelectedOptions])

 useEffect(()=>{
    if(!RoomData || RoomData.length === 0)
     getAllRooms();
 },[RoomData])


  return (
    <div className="room-container">
      <div className="filter-container">
        <div className="first">
          <div className="head">
            <h2>Bed Size</h2>
            {toggleBed ? (
              <ion-icon
                name="chevron-up-outline"
                onClick={(e) => {
                  handleToggleBed(e);
                }}
              ></ion-icon>
            ) : (
              <ion-icon
                name="chevron-down-outline"
                onClick={(e) => {
                  handleToggleBed(e);
                }}
              ></ion-icon>
            )}
          </div>
          {toggleBed ? (
            <div className="bed-options">
              <ul>
                <li>
                  <input 
                  type="checkbox" 
                  id="option1" 
                  value="twin-xl" 
                  onChange={(e)=>{handleCheckBoxChange(e)}}
                  /> Twin-xl
                </li>
                <li>
                  <input 
                  type="checkbox" 
                  id="option1" 
                  value="full" 
                  onChange={(e)=>{handleCheckBoxChange(e)}}
                  />
                  Full
                </li>
                <li>
                  <input 
                  type="checkbox" 
                  id="option1" 
                  value="queen" 
                  onChange={(e)=>{handleCheckBoxChange(e)}}
                  />
                  Queen
                </li>
                <li>
                  <input 
                  type="checkbox" 
                  id="option1" 
                  value="king" 
                  onChange={(e)=>{handleCheckBoxChange(e)}}
                  />
                  King
                </li>
                <li>
                  <input 
                  type="checkbox" 
                  id="option1" 
                  value="california-king" 
                  onChange={(e)=>{handleCheckBoxChange(e)}}
                  />
                  california-King
                </li>
              </ul>
            </div>
          ) : (
            <div></div>
          )}
        </div>



        <div className="second">
        <div className="head">
            <h2>Price Range</h2>
            {togglePrice ? (
              <ion-icon
                name="chevron-up-outline"
                onClick={() => {
                  handleTogglePrice();
                }}
              ></ion-icon>
            ) : (
              <ion-icon
                name="chevron-down-outline"
                onClick={() => {
                  handleTogglePrice();
                }}
              ></ion-icon>
            )}
          </div>
          {togglePrice ? (
            <div className="price-options">
              <div className="val">
                <div className="mini">
                    Min:{data1}
                </div>
                <div className="maxi">
                   Max:{data2}
                </div>
              </div>
              <div className="input">
              <input type="range" min='0' max='1000' steps='1' id='min' className="min" value={data1} onChange={(e)=>{setData1(e.target.value)}}></input>
              <input type="range" min='1000' max='2000' steps='1' id='max' className="max" value={data2} onChange={(e)=>{setData2(e.target.value)}}></input>
              </div>
             
            </div>
          ) : (
            <div></div>
          )}
          <div/>

          <div className="third">
            <h2>Date Range: </h2>
            <div className="range">
            <div className="entry">
                <input type="date"></input>
            </div>
            <div className="exit">
             <input type="date"></input>
            </div>
            </div>
          </div>


        </div>
      </div>

      <div className="card-container">
        {RoomData?.map((data)=>{
          const{price,capacity,bedsize}=data;
          console.log(data);
          // const numericPrice = parseInt(price.substring(1)); // Convert price to a number

          const isValid =
           price >= parseInt(data1) &&
            price <= parseInt(data2) &&
            SelectedOptions.includes(bedsize);
          if(isValid)
          {
            return <Card price={data.price} capacity={data.capacity} size={data.bedsize} image={data.images} services={data.services} id={data._id}/>
            
          }

           return null;
        })
        }
      </div>
    </div>
  );
}
