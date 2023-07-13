import React from 'react'
import './Contact.css';
export default function Contact() {
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
            <input type='text' placeholder='Name'></input>
          </div>
          <div className="email">
            <input type='text' placeholder='Email Address'></input>
          </div>
          <div className="phone">
            <input type='text' placeholder='Phone Number'></input>
          </div>
          <div className="subject">
            <input type='text' placeholder='Subject'></input>
          </div>
          <div className="address">
            <input type='text' placeholder='Address'></input>
          </div>
          <div className="button">
          <button type='submit'>Submit</button>
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
