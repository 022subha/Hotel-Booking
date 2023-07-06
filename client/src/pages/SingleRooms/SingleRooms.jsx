import React, { useEffect, useState } from "react";
import "./SingleRooms.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { Carousel } from "react-responsive-carousel";
import { useLocation } from "react-router-dom";
export default function SingleRooms() {
  const [singleRoom, setSingleRoom] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const entryDate=searchParams.get('checkinDate');
  const exitDate=searchParams.get('checkoutDate');
  const price=searchParams.get('price');
  const capacity=searchParams.get('capacity');
  const date1=new Date(entryDate);
  const date2=new Date(exitDate);
  console.log(price);

  const findRoomById = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/room/getRoomById`, {
        roomId: id,
      })
      .then((result) => {
        if (result.data.status) {
          setSingleRoom(result.data.roomDetails);
          console.log(result.data.roomDetails);
        } else {
          message.error(result.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //for making payment
  const checkoutHandler = async (e, amount) => {
    console.log(amount);
    e.preventDefault();
    try {
      const response1 = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/payment/get-key`
      );
      const response2 = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/checkout`,
        {
          amount,
        }
      );
      console.log(response1);
      const { key } = response1.data;
      const { order } = response2.data;

      const option = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "StayEasy",
        description: "Payment for Room Booking",
        image: "/images/favicon.svg",
        order_id: order.id,
        callback_url: `${process.env.REACT_APP_API_URL}/api/payment/payment-verification`,
        prefill: {
          name: "StayEasy",
          email: "stayeasy@gmail.com",
          contact: "9865541789",
        },
        notes: { address: "Botanical Garden Area, Howrah, West Bengal 711103" },
        theme: { color: "#e70b53" },
        handler: async (response) => {
          try {
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        },
      };
      const razor = window.Razorpay(option);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && !singleRoom) {
      findRoomById();
    }
  }, [id, singleRoom]);

  return (
    <div className="singlerooms-container">
      <div className="img">
       {singleRoom.images && singleRoom.images.length > 0 &&  
       <Carousel 
          showThumbs={false}
          selectedItem={0}
          showStatus={false}
          autoPlay
          interval={1000}
          infiniteLoop={false}
          showIndicators={false}
          showArrows={true}
        >
              {
               singleRoom.images.map((image)=>{
                  return(
                    <img src={image} alt="" />
                  )
               })
                
              }
        </Carousel>}
      </div>
      <div className="mainsingle-container">
        <div className="description">
          {/* description1 */}
          <div className="desc1-container">
            <div className="desc1-part1">
              <h6>
                "Size":
                <span>350-425sqf</span>
              </h6>
            </div>
            <div className="desc1-part1">
              <h6>
                "Capacity":
                <span>Max-Person:{singleRoom?.capacity}</span>
              </h6>
            </div>
            <div className="desc1-part1">
              <h6>
                "Bed":
                <span>{singleRoom?.bedsize}</span>
              </h6>
            </div>
            <div className="desc1-part1">
              <h6>
                "Services":
                {singleRoom.services && singleRoom.services.length > 0 && (
                  <div className="services-box">
                    {singleRoom.services.map((service, index) => (
                      <div key={index} className="service-item">
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                )}
              </h6>
            </div>
          </div>
          {/* description-2 */}
          <div className="desc2-container">
            <p>
              If you live in New York City or travel to and from New York City a
              lot, you know all about the traffic there. Getting places is often
              next to impossible, even with the gazillion yellow cabs. If you’re
              like me you often look with envy at those shiny limousines with
              their unformed drivers and wish you could sit in one. Well, you
              can. New York limo service is more affordable than you think,
              whether it’s for Newark airport transportation, LaGuardia airport
              transportation, or to drive wherever you wish to go.
            </p>
            <ul>
              <li>
                <ion-icon name="checkmark-outline"></ion-icon>
                Mauris molestie lectus in irdiet auctor.
              </li>
            </ul>
            <ul>
              <li>
                <ion-icon name="checkmark-outline"></ion-icon>
                Dictum purus at blandit molestie.
              </li>
            </ul>
            <ul>
              <li>
                <ion-icon name="checkmark-outline"></ion-icon>
                In sit amet sapien quis orci maximus.
              </li>
            </ul>
            <ul>
              <ul>
                <li>
                  <ion-icon name="checkmark-outline"></ion-icon>
                  Vestibulum rutrum diam vel eros tristique.
                </li>
              </ul>
              <li>
                <ion-icon name="checkmark-outline"></ion-icon>
                Donec id dui ac massa malesuada.
              </li>
            </ul>
            <p>
              Every time I hail a cab in New York City or wait for one at the
              airports, I hope I’ll be lucky enough to get one that’s halfway
              decent and that the driver actually speaks English. I have spent
              many anxious moments wondering if I ever get to my destination. Or
              whether I’d get ripped off. Even if all goes well, I can’t say I
              can remember many rides in New York cabs that were very pleasant.
              And given how much they cost by now, going with a limo makes ever
              more sense.
            </p>
          </div>
          {/* description-3 */}
          <div className="desc3-container">
            <h2>Room Services</h2>
            <div className="part1">
              <div className="first">
                <img
                  src="https://preview.colorlib.com/theme/roberto/img/core-img/icon1.png"
                  alt=""
                />
                <span>Air Conditioning</span>
              </div>
              <div className="first">
                <img
                  src="https://preview.colorlib.com/theme/roberto/img/core-img/icon2.png"
                  alt=""
                />
                <span>Free drinks</span>
              </div>
              <div className="first">
                <img
                  src="https://preview.colorlib.com/theme/roberto/img/core-img/icon3.png"
                  alt=""
                />
                <span>Restaurant Quality</span>
              </div>
            </div>
            <div className="part2">
              <div className="first">
                <img
                  src="	https://preview.colorlib.com/theme/roberto/img/core-img/icon4.png"
                  alt=""
                />
                <span>Cable TV</span>
              </div>
              <div className="first">
                <img
                  src="	https://preview.colorlib.com/theme/roberto/img/core-img/icon5.png"
                  alt=""
                />
                <span>Unlimited Wifi</span>
              </div>
              <div className="first">
                <img
                  src="	https://preview.colorlib.com/theme/roberto/img/core-img/icon6.png"
                  alt=""
                />
                <span>Services 24/24</span>
              </div>
            </div>
          </div>
          <div className="desc4-container">
            <h2>Room Review</h2>
            <div className="apply">
              <div className="info">
                <div className="img">
                  <img
                    src="	https://preview.colorlib.com/theme/roberto/img/bg-img/53.jpg"
                    alt=""
                  />
                </div>
                <div className="think">
                  <h4>27 Aug 2023</h4>
                  <h3>Brandon Kelley</h3>
                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit, sed quia non numquam eius
                    modi tempora.
                  </p>
                </div>
              </div>
            </div>

            <div className="apply">
              <div className="info">
                <div className="img">
                  <img
                    src="	https://preview.colorlib.com/theme/roberto/img/bg-img/53.jpg"
                    alt=""
                  />
                </div>
                <div className="think">
                  <h4>27 Aug 2023</h4>
                  <h3>Brandon Kelley</h3>
                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit, sed quia non numquam eius
                    modi tempora.
                  </p>
                </div>
              </div>
            </div>

            <div className="apply">
              <div className="info">
                <div className="img">
                  <img
                    src="	https://preview.colorlib.com/theme/roberto/img/bg-img/53.jpg"
                    alt=""
                  />
                </div>
                <div className="think">
                  <h4>27 Aug 2023</h4>
                  <h3>Brandon Kelley</h3>
                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit, sed quia non numquam eius
                    modi tempora.
                  </p>
                </div>
              </div>
            </div>

            <div className="apply">
              <div className="info">
                <div className="img">
                  <img
                    src="	https://preview.colorlib.com/theme/roberto/img/bg-img/53.jpg"
                    alt=""
                  />
                </div>
                <div className="think">
                  <h4>27 Aug 2023</h4>
                  <h3>Brandon Kelley</h3>
                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit, sed quia non numquam eius
                    modi tempora.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-single">
          <div className="date">
            <div className="entry">
            {date1.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            </div>
            <div className="exit">
            {date2.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            </div>
          </div>
          <div className="capacity">
          <span className="cap1">Capacity</span>
            <span className="val1">{capacity}</span>
          </div>
          <div className="price-alltax">
           <div className="savings">
            <span className="des1">Your Savings</span>
            <span className="amo1">$0</span>
           </div>
           <div className="price">
            <span className="des2">Total Price</span>
            <span className="amo2">${price}</span>
           </div>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              checkoutHandler(e, 100);
            }}
          >
            Booking-Now
          </button>
        </div>
      </div>
    </div>
  );
}
