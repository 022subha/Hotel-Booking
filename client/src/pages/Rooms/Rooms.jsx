import { Pagination, Slider, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card/Card";
import Searchbar from "../../components/Searchbar/Searchbar";
import "./Rooms.css";

export default function Rooms() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const room = searchParams.get("room");
  const adult = searchParams.get("adult");
  const children = searchParams.get("childrean");

  const [toggleBed, setToggleBed] = useState(false);
  const [toggleServices, setToggleServices] = useState(false);
  const [togglePrice, setTogglePrice] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [checkInDate, setCheckInDate] = useState(checkIn);
  const [checkOutDate, setCheckOutDate] = useState(checkOut);
  const [selectedBedSize, setSelectedBedSize] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = window.innerWidth < 1060 ? 1 : 5;

  const getAllRooms = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/room/getAllRooms`)
      .then((result) => {
        if (result.data.status) {
          setRoomData(result.data.rooms);
        } else {
          message.error(result.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBedSizeOptions = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;

    setSelectedBedSize((prevselectedBedSize) => {
      if (isChecked) {
        if (prevselectedBedSize.length === 5) {
          return [checkboxValue];
        } else {
          return [...prevselectedBedSize, checkboxValue];
        }
      } else {
        return prevselectedBedSize.filter((option) => option !== checkboxValue);
      }
    });
  };

  const handleServicesOptions = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;

    setSelectedServices((prevselectedBedSize) => {
      if (isChecked) {
        if (prevselectedBedSize.length === 5) {
          return [checkboxValue];
        } else {
          return [...prevselectedBedSize, checkboxValue];
        }
      } else {
        return prevselectedBedSize.filter((option) => option !== checkboxValue);
      }
    });
  };

  const handleToggleBed = () => {
    setToggleBed(!toggleBed);
  };

  const handleToggleServices = () => {
    setToggleServices(!toggleServices);
  };

  const handleTogglePrice = () => {
    setTogglePrice(!togglePrice);
  };

  const checkAvailibility = (unavailableDates, checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const date = new Date(start.getTime());

    while (date <= end) {
      if (unavailableDates.includes(date)) return false;
      date.setDate(date.getDate() + 1);
    }

    return true;
  };

  const handleSliderChange = (value) => {
    const [newMinPrice, newmaxPrice] = value;
    setMinPrice(newMinPrice);
    setMaxPrice(newmaxPrice);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!roomData || roomData.length === 0) getAllRooms();
  }, [roomData]);

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
                    onChange={(e) => {
                      handleBedSizeOptions(e);
                    }}
                  />
                  Twin-xl
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="option1"
                    value="full"
                    onChange={(e) => {
                      handleBedSizeOptions(e);
                    }}
                  />
                  Full
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="option1"
                    value="queen"
                    onChange={(e) => {
                      handleBedSizeOptions(e);
                    }}
                  />
                  Queen
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="option1"
                    value="king"
                    onChange={(e) => {
                      handleBedSizeOptions(e);
                    }}
                  />
                  King
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="option1"
                    value="california-king"
                    onChange={(e) => {
                      handleBedSizeOptions(e);
                    }}
                  />
                  california-King
                </li>
              </ul>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="first">
          <div className="head">
            <h2>Services</h2>
            {toggleServices ? (
              <ion-icon
                name="chevron-up-outline"
                onClick={(e) => {
                  handleToggleServices(e);
                }}
              ></ion-icon>
            ) : (
              <ion-icon
                name="chevron-down-outline"
                onClick={(e) => {
                  handleToggleServices(e);
                }}
              ></ion-icon>
            )}
          </div>
          {toggleServices ? (
            <div className="bed-options">
              <ul>
                <li>
                  <input
                    type="checkbox"
                    id="option1"
                    value="AC"
                    onChange={(e) => {
                      handleServicesOptions(e);
                    }}
                  />
                  AC
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="option1"
                    value="Wifi"
                    onChange={(e) => {
                      handleServicesOptions(e);
                    }}
                  />
                  WiFi
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="option1"
                    value="TV"
                    onChange={(e) => {
                      handleServicesOptions(e);
                    }}
                  />
                  TV
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="option1"
                    value="Food Service"
                    onChange={(e) => {
                      handleServicesOptions(e);
                    }}
                  />
                  Food Service
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
                <div className="mini">Min:{minPrice}</div>
                <div className="maxi">Max:{maxPrice}</div>
              </div>
              <Slider
                range={{
                  draggableTrack: true,
                }}
                min={0}
                max={2000}
                defaultValue={[0, 2000]}
                onAfterChange={handleSliderChange}
                trackStyle={{ background: "#e70b53" }}
              />
            </div>
          ) : (
            <div></div>
          )}
          <div />
        </div>

        <div className="third">
          <h2>Date Range: </h2>
          <div className="range">
            <div className="entry">
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => {
                  setCheckInDate(e.target.value);
                }}
              ></input>
            </div>
            <div className="exit">
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => {
                  setCheckOutDate(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
      </div>

      <div className="card-container">
        {roomData
          .slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage)
          ?.map((data) => {
            const {
              price,
              capacity,
              bedsize,
              images,
              services,
              _id,
              unavailableDates,
            } = data;

            const isValid =
              price >= parseInt(minPrice) &&
              price <= parseInt(maxPrice) &&
              checkAvailibility(unavailableDates, checkInDate, checkOutDate) &&
              (!selectedBedSize.length || selectedBedSize.includes(bedsize)) &&
              (!selectedServices.length ||
                selectedServices.every((service) =>
                  services.includes(service)
                ));

            if (isValid) {
              return (
                <Card
                  price={price}
                  capacity={capacity}
                  size={bedsize}
                  image={images}
                  services={services}
                  id={_id}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  room={room}
                  adult={adult}
                  children={children}
                />
              );
            }

            return null;
          })}
        <Pagination
          className="pagination-component"
          current={currentPage}
          total={Rooms.length * 10}
          pageSize={itemPerPage * 10}
          showSizeChanger={false}
          onChange={handleChangePage}
          responsive
        />
      </div>
    </div>
  );
}
