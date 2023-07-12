import { Avatar, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/spinnerSlice";
import makePayment from "../../utils/paymentUtil";
import "./SingleRooms.css";

export default function SingleRooms() {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const { id } = params;
  const entryDate = searchParams.get("checkInDate");
  const exitDate = searchParams.get("checkOutDate");
  const date1 = new Date(entryDate);
  const date2 = new Date(exitDate);
  const { user } = useSelector((state) => state.user);

  const [singleRoom, setSingleRoom] = useState("");

  const findRoomById = () => {
    // dispatch(showLoading());
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/room/getRoomById`, {
        roomId: id,
      })
      .then((result) => {
        // dispatch(hideLoading());
        if (result.data.status) {
          setSingleRoom(result.data.roomDetails);
        } else {
          message.error(result.data.message);
        }
      })
      .catch((error) => {
        // dispatch(hideLoading());
        console.log(error);
      });
  };

  //for making payment
  const handlePayment = async (e, amount) => {
    e.preventDefault();
    if (user) {
      makePayment(amount, user, date1, date2, singleRoom);
    } else {
      message.error("Login First !!");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (id && !singleRoom) {
      findRoomById();
    }
  }, []);

  if (singleRoom)
    return (
      <div className="singlerooms-container">
        <div className="img">
          {singleRoom.images && singleRoom.images.length > 0 && (
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
              {singleRoom.images.map((image, index) => {
                return <img src={image} alt="" key={index} />;
              })}
            </Carousel>
          )}
        </div>
        <div className="mainsingle-container">
          <div className="description">
            <div className="desc1-container">
              <h2>{singleRoom.name}</h2>
            </div>

            <div className="desc2-container">
              <p>{singleRoom.description}</p>
            </div>

            <div className="desc3-container">
              <h2>Room Services</h2>
              <div className="part1">
                {singleRoom.services.length &&
                  singleRoom.services.map((service, index) => (
                    <div className="first" key={index}>
                      <img src={`/images/Icons/${service}.webp`} alt="" />
                      <span>{service}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="desc4-container">
              <h2>Details</h2>
              <div className="desc4-items">
                <div className="item1">
                  <p>Bed Size :</p>
                  <span>{singleRoom.bedsize}</span>
                </div>
                <div className="item2">
                  <p>Capacity : </p>
                  <span>max {singleRoom.capacity} are allowed</span>
                </div>
              </div>
            </div>
            <div className="desc5-container">
              <h2>Room Review</h2>
              <div className="apply">
                <div className="avatar">
                  <Avatar
                    src="	https://preview.colorlib.com/theme/roberto/img/bg-img/53.jpg"
                    size={80}
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

              <div className="apply">
                <div className="avatar">
                  <Avatar
                    src="	https://preview.colorlib.com/theme/roberto/img/bg-img/53.jpg"
                    size={80}
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

              <div className="apply">
                <div className="avatar">
                  <Avatar
                    src="	https://preview.colorlib.com/theme/roberto/img/bg-img/53.jpg"
                    size={80}
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
          <div className="button-single">
            <div className="listing-price">
              <div className="price">₹{singleRoom.price}</div>
              <div className="price-description">inclusive of all taxes</div>
            </div>
            <div className="date">
              <div className="entry">
                {date1.toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <div className="hiphen">-</div>
              <div className="exit">
                {date2.toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>
            </div>

            <div className="price-alltax">
              <div className="des2">
                <span>Total Price</span>
                <span>(incl. of all taxes)</span>
              </div>

              <div className="amo2">
                ₹
                {singleRoom.price *
                  Math.ceil(
                    Math.abs(date1.getTime() - date2.getTime()) /
                      (1000 * 3600 * 24)
                  )}
              </div>
            </div>
            <button
              type="submit"
              onClick={(e) => {
                handlePayment(
                  e,
                  singleRoom.price *
                    Math.ceil(
                      Math.abs(date1.getTime() - date2.getTime()) /
                        (1000 * 3600 * 24)
                    )
                );
              }}
            >
              Continue to Book
            </button>
          </div>
        </div>
      </div>
    );
}
