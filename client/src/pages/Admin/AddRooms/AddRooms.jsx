import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import axios from 'axios';
import "./AddRooms.css";
import {message} from 'antd';
import Dashboard from "../../../components/Dashboard/Dashboard";

export default function AddRooms() {
  const [imagePrev, setImagePrev] = useState([]);
  const [images, setImages] = useState([]);

  const[Name,setName]=useState();
  const[Size,setSize]=useState();
  const[Capacity,setCapacity]=useState();
  const[Bedsize,setBedsize]=useState();
  const[Services,setServices]=useState();
  const[Description,setDescription]=useState();
  const[Location,setLocation]=useState();
  const[Price,setPrice]=useState();


  const handleAddRooms=(e)=>{
    const bodyContent = new FormData();
    bodyContent.append("Name", Name);
    bodyContent.append("Capacity", Capacity);
    bodyContent.append("Bedsize", Bedsize);
    bodyContent.append("Services", Services);
    bodyContent.append("Description", Description);
    bodyContent.append("Location", Location);
    bodyContent.append("Price", Price);
    bodyContent.append("Image", images);
     axios.post("http://localhost:5000/api/room/add-rooms",{
      bodyContent
     }).then((result)=>{
      if(result.data.status)
      {
        message.success(result.data.message);
      }
      else{
        message.error(result.data.message);
      }
     }).catch((error)=>{
      console.log(error);
     })
    }


  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const prevImages = [...imagePrev]; // Make a copy of existing preview images array
        prevImages.push(reader.result); // Add new image URLs to the array
        setImagePrev(prevImages);
        setImages([...images,file]);
      };
    }
  };

  const handleDelete=(index)=>{
    const updatedImages=imagePrev.filter((image,index1)=>{
        return index1!=index;
    })
    setImagePrev(updatedImages);
  }

  useEffect(() => {
    console.log(imagePrev);
  }, [imagePrev]);


  useEffect(() => {
    console.log(images);
  }, [images]);
  return (
    <Dashboard>
    <div className="add-rooms-container">
      <h2>Enter All Descriptions</h2>
      <div className="main-container">
        <div className="name">
          <p>Name:</p>
          <input 
          type="text" 
          placeholder="Enter Name"
          onChange={(e)=>{setName(e.target.value)}}
          ></input>
        </div>
        <div className="size">
          <p>Size:</p>
          <select onChange={(e)=>{setSize(e.target.value)}}>
            <option value="">Select Bed Size</option>
            <option value="twin">Twin</option>
            <option value="twin-xl">Twin XL</option>
            <option value="full">Full/Double</option>
            <option value="queen">Queen</option>
            <option value="king">King</option>
            <option value="cal-king">California King</option>
          </select>
        </div>
        <div className="capacity">
          <p>Capacity:</p>
          <input 
          type="number" 
          placeholder="Enter max-capacity"
          onChange={(e)=>{setCapacity(e.target.value)}}
          ></input>
        </div>
        <div className="bed-size">
          <p>Bed-Size:</p>
          <select onChange={(e)=>{setBedsize(e.target.value)}}>
            <option value="">Select Bed Size</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="queen">Queen</option>
            <option value="king">King</option>
          </select>
        </div>
        <div className="services">
          <p>Services:</p>
          <input 
          type="text" 
          placeholder="Enter Services"
          onChange={(e)=>{setServices(e.target.value)}}
          ></input>
        </div>
        <div className="description">
          <p>Description:</p>
          <input 
          type="text" 
          placeholder="Enter Description"
          onChange={(e)=>{setDescription(e.target.value)}}
          ></input>
        </div>
        <div className="location">
          <p>Location:</p>
          <select onChange={(e)=>{setLocation(e.target.value)}}>
            <option value="">Select Localtion:</option>
            <option value="Delhi">Delhi</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Banglore">Banglore</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>
        <div className="price">
          <p>Price:</p>
          <input 
          type="number" 
          placeholder="Enter Price"
          onChange={(e)=>{setPrice(e.target.value)}}
          ></input>
        </div>
        <div className="images">
          <p>Images:</p>
          <input
            type="file"
            accept="image/*"
            placeholder="Choose Your Avatar"
            multiple
            onChange={changeImageHandler}
          />
          <div className="avatar">
            {imagePrev.map((image, index) => {
              return (
                <div key={index} className="images1">
                  <ion-icon
                   name="close-outline"
                   onClick={()=>{handleDelete(index)}}
                  ></ion-icon>
                  <Avatar
                    key={index} // Add the key prop
                    size={120}
                    src={image}
                  />
                </div>
              );
            })}
          </div>
          <button 
          className="submit"
          onClick={()=>{handleAddRooms()}}
          >Submit</button>
        </div>
      </div>
    </div>
    </Dashboard>
  );
}

// 1. Name
// 2. Size
// 3. Max Capacity
// 4. Bed Size
// 5. Services
// 6. Description
// 7. Images
// 8. Location
// 9. Price per Night
