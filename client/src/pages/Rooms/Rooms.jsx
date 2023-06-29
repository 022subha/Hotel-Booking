import React, { useState,useEffect } from "react";
import Card from "../../components/Card/Card";
import "./Rooms.css";
export default function Rooms() {
  const [toggleBed, setToggleBed] = useState(false);
  const[togglePrice,setTogglePrice]=useState(false);
  const[data1,setData1]=useState(0);
  const[data2,setData2]=useState(0);
  const[SelectedOptions,setSelectedOptions]=useState([]);
  

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

const data=[
  {
    price : "$100",
    capacity :"2 guests",
    bedSize : "Queen"
  },
  {
    price : "$500",
    capacity :"7 guests",
    bedSize : "twin"
  },
  {
    price : "$1000",
    capacity :"4 guests",
    bedSize : "King"
  },
  {
    price : "$1500",
    capacity :"3 guests",
    bedSize : "California-King"
  },
  {
    price : "$2000",
    capacity :"10 guests",
    bedSize : "Full"
  },

]

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
                  value="twin" 
                  onChange={(e)=>{handleCheckBoxChange(e)}}
                  /> Twin
                </li>
                <li>
                  <input 
                  type="checkbox" 
                  id="option1" 
                  value="Full" 
                  onChange={(e)=>{handleCheckBoxChange(e)}}
                  />
                  Full
                </li>
                <li>
                  <input 
                  type="checkbox" 
                  id="option1" 
                  value="Queen" 
                  onChange={(e)=>{handleCheckBoxChange(e)}}
                  />
                  Queen
                </li>
                <li>
                  <input 
                  type="checkbox" 
                  id="option1" 
                  value="King" 
                  onChange={(e)=>{handleCheckBoxChange(e)}}
                  />
                  King
                </li>
                <li>
                  <input 
                  type="checkbox" 
                  id="option1" 
                  value="California-King" 
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
                <div>Min:{data1} Max:{data2}</div>
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
        {data.map((data)=>{
          const{price,capacity,bedSize}=data;
          const numericPrice = parseInt(price.substring(1)); // Convert price to a number

          const isValid =
            numericPrice >= parseInt(data1) &&
            numericPrice <= parseInt(data2) &&
            SelectedOptions.includes(bedSize);
          if(isValid)
          {
            return <Card price={data.price} capacity={data.capacity} size={data.bedSize}/>
            
          }

           return null;
        })
        }
      </div>
    </div>
  );
}
