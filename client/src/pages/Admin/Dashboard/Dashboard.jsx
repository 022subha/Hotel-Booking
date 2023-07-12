import React,{useState,useEffect} from "react";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import './Dashboard.css';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, LineChart, Line } from 'recharts';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import axios from "axios";
// Sample data for available rooms
const available_rooms_data = [
  { name: 'not-available', value: 215, fill: '#eeeeee' },
  { name: 'available', value: 785, fill: '#0000ff' },
];

// sample data for booked rooms today
const booked_rooms_today_data = [
  { name: "Pending", pending: 234, },
  { name: "Done", done: 765, },
  { name: "Finish", finish: 263, },
];

// sample data for check in
const check_in_data = [
  { name: 'not_checked_in', value: 30, fill: '#eeeeee' },
  { name: 'checked_in', value: 70, fill: '#0000ff' },
];
// sample data for check out
const check_out_data = [
  { name: 'not_checked_out', value: 70, fill: '#eeeeee' },
  { name: 'checked_out', value: 30, fill: '#ff9900' },
];

// Reservation statistics data
// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];


const CustomerReview = () => {
  return (
    <div className="cust-review">
      <div className="cust-photo">
        <img src="/images/404.png" alt="" srcset="" height="50px" width="50px" />
      </div>
      <div className="cust-details">
        <div className="cust-name">Customer Name</div>
        <div className="cust-date">Posted on 12/06/2023, 11:23 AM</div>
        <p className="cust-comment">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur voluptate
          odit possimus ipsum! Rem odit ratione, facere provident architecto illo
          expedita sapiente distinctio quo vero unde iusto? Esse, quisquam sit.
          Laborum dicta perferendis magnam velit architecto quasi totam sunt voluptas
          nisi temporibus officiis.
        </p>
      </div>
    </div>
  )
}



export default function Dashboard() {

  const[totalBookings,setTotalBooking]=useState(0);
  const[todaysBooking,setTodaysBooking]=useState(0);
  const[checkOut,setCheckOut]=useState(0);
  const[availableRoom,setAvailableRoom]=useState(0);
  const [data,setData]=useState([]);
  
  const getRoomDetails=()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/booking-details`)
    .then((result)=>{
      if(result.data.status)
      {
        setTotalBooking(result.data.booking.length);
        // console.log(result.data.booking);

        result.data.today_booking.map((data1)=>{
           const timestamp=new Date(data1.timestamp).toLocaleDateString();
           const date= new Date().toLocaleDateString();
          //  console.log(date);
          //  console.log(timestamp);
           if(date===timestamp)
           {
             setTodaysBooking(todaysBooking+1);
           }
        })
        
        result.data.booking.map((data1)=>{
          // console.log(data1);
          const timestamp=new Date(data1.checkOut).toLocaleDateString();
          const date=new Date().toLocaleDateString();
          // console.log(timestamp);
          // console.log(date);
          if(timestamp <= date)
          {
             setCheckOut(checkOut+1);
          }
        })


        setAvailableRoom(result.data.total_rooms.length-result.data.booking.length);

        // console.log(result.data.booking);
        let CountbyDate={};
        result.data.booking.forEach((bookings) => {
             let timestampDate=new Date(bookings.timestamp).toLocaleDateString();
             if(!CountbyDate[timestampDate])
             {
              CountbyDate[timestampDate]={
                  checkInDateCount:0,
                  checkOutDateCount:0,
              }
             }

             CountbyDate[timestampDate].checkInDateCount++;
             CountbyDate[timestampDate].checkOutDateCount++;
        });
        console.log(CountbyDate);
        
        for (const [date, counts] of Object.entries(CountbyDate)){
          console.log(date);
          const dataObject={
            name:date.toString(),
            uv:counts.checkInDateCount,
            pv:counts.checkOutDateCount,
          }

           setData((prevData)=>[...prevData,dataObject]);
        }

      }
      else{
        console.log(result.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    if(!totalBookings)
       getRoomDetails();
  },[])
  return (
    <DashboardLayout>
      <div className="admin-dashboard-container-fluid">
        <div className="admin-dashboard-row">
          <div className="admin-card new-bookings">
            <div className="title-content">
              <div className="card-title">{totalBookings}</div>
              <div className="card-content">Total Bookings</div>
            </div>
            <ion-icon name="bookmark-outline" style={{ fontSize: 48, color: 'white' }}></ion-icon>
          </div>
          <div className="admin-card schedule-rooms">
            <div className="title-content">
              <div className="card-title">{todaysBooking}</div>
              <div className="card-content">Todays Rooms</div>
            </div>
            <ion-icon name="calendar-clear-outline" style={{ fontSize: 48, color: 'white' }}></ion-icon>
          </div>
          <div className="admin-card check-in">
            <div className="title-content">
              <div className="card-title">{totalBookings-todaysBooking}</div>
              <div className="card-content">Check in</div>
            </div>
            <ion-icon name="log-in-outline" style={{ fontSize: 56, color: 'white' }}></ion-icon>
          </div>
          <div className="admin-card check-out">
            <div className="title-content">
              <div className="card-title">{checkOut}</div>
              <div className="card-content">Check-out</div>
            </div>
            <ion-icon name="exit-outline" style={{ fontSize: 56, color: 'white', transform: 'rotate(180deg)' }}></ion-icon>
          </div>
        </div>
        <div className="admin-two-charts">
          <div className="available-rooms-today">
            <PieChart className="donut-chart" width={150} height={150}>
              <Pie data={available_rooms_data} dataKey="value" outerRadius={60}
                innerRadius={35} startAngle={-270} />
            </PieChart>
            <div className="art-title">
              {availableRoom}
            </div>
            <div className="art-content">Available Rooms Today</div>
          </div>
          <div className="booked-rooms-today">
            <div className="brt-name">Booked Rooms Today</div>
            <ResponsiveContainer width='100%' aspect={4.0 / 3.0}>
              <BarChart data={booked_rooms_today_data} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" hide reversed type="category" />
                <Legend />
                <Bar legendType="circle" dataKey="pending" barSize={20} fill="#ff0000" name="Pending" />
                <Bar legendType="circle" dataKey="done" barSize={20} fill="#00ff00" name="Done" />
                <Bar legendType="circle" dataKey="finish" barSize={20} fill="#0000ff" name="Finish" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="reservation-statistics-chart">
          <div className="res-stat-title">Reservation Statistics</div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="check-in-check-out-chart">
          <div className="check">
            <PieChart className="donut-chart" width={150} height={150}>
              <Pie data={check_in_data} dataKey="value" outerRadius={60}
                innerRadius={50} startAngle={-270} />
            </PieChart>
            <div className="desc">
              <div className="check-val">70%</div>
              <div className="check-title">Check in</div>
            </div>
          </div>
          <div className="check">
            <PieChart className="donut-chart" width={150} height={150}>
              <Pie data={check_out_data} dataKey="value" outerRadius={60}
                innerRadius={50} startAngle={-270} />
            </PieChart>
            <div className="desc">
              <div className="check-val">30%</div>
              <div className="check-title">Check out</div>
            </div>
          </div>
        </div>
        <div className="customer-reviews-card">
          <div className="cust-rev-title">Latest Customer Reviews</div>
          <CustomerReview/>
          <CustomerReview/>
          <CustomerReview/>
          <div className="load-more">
            <ion-icon name="arrow-down-outline" style={{ fontSize: 32, color: 'blue' }}></ion-icon>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
