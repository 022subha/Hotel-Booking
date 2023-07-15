import React,{useState} from 'react'
import './Contact.css';
import axios from "axios";
import {message as msg} from 'antd';
import { useDispatch, useSelector } from "react-redux";

export default function Contact() {

  const {user}=useSelector((state)=>state.user);
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[phone,setPhone]=useState("");
  const[subject,setSubject]=useState("");
  const[message,setMessage]=useState("");
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/api/contact/contact-admin`,{
      userId:user.id,
      name,
      email,
      phone,
      subject,
      message,
    }).then((result)=>{
         if(result.data.status)
         {
          msg.success(result.data.message);
          console.log(result.data.AdminUser);
         }
         else{
          msg.error(result.data.message);
         }
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div className="final-main-container">
        <div className='background-image-container'>
          <h1 className='touch'>Get in Touch</h1>
        </div>
    <div className="main-contact-container">
        <div className="message-container">
        <h1 className='head1'>Send us a Message</h1>
        <div className="inputs">
          <div className="name">
            <input 
            type='text' 
            placeholder='Name'
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            ></input>
          </div>
          <div className="email">
            <input 
            type='text' 
            placeholder='Email Address'
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            ></input>
          </div>
          <div className="phone">
            <input 
            type='text' 
            placeholder='Phone Number'
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            ></input>
          </div>
          <div className="subject">
            <input 
            type='text' 
            placeholder='Subject'
            value={subject}
            onChange={(e)=>{setSubject(e.target.value)}}
            ></input>
          </div>
          <div className="message">
            <input 
            type='text' 
            placeholder='Message'
            value={message}
            onChange={(e)=>{setMessage(e.target.value)}}
            ></input>
          </div>
          <div className="button">
          <button 
          type='submit'
          onClick={(e)=>{handleSubmit(e)}}
          >Submit</button>
          </div>
       
          </div>
        </div>
        <div className="contactInfo-container">
          <h3 className='head2'>Contact Information</h3>
          <div className="content">
          <div className="email">
          <ion-icon name="mail-outline"></ion-icon>
          <p>stayeasy@gmail.com</p>
          </div>
          <div className="phone">
          <ion-icon name="call-outline"></ion-icon>
          <p>+91-98655 41789</p>
          </div>
          <div className="location">
          <ion-icon name="location-outline"></ion-icon>
          <p>Plot. 4A, Street no-15, Kolkata,West Bengal- 110059</p>
          </div>
          </div>
        </div>
    </div>
    </div>
  )
}
