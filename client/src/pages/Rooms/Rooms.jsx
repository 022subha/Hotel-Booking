import { Pagination, Slider, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner.jsx";
import "./Rooms.css";

export default function Rooms() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkIn = searchParams.get("checkIn")
    ? searchParams.get("checkIn")
    : new Date().toISOString().slice(0, 10);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkOut = searchParams.get("checkOut")
    ? searchParams.get("checkOut")
    : tomorrow.toISOString().slice(0, 10);

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
  const [filteredData, setFilteredData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = window.innerWidth < 1060 ? 1 : 5;

  const getAllRooms = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/room/getAllRooms`
      );
      if (result.data.status) {
        setRoomData(result.data.rooms);
        setFilteredData(
          result.data.rooms.filter((data) =>
            checkAvailibility(data.unavailableDates, checkInDate, checkOutDate)
          )
        );
      } else {
        message.error(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAvailibility = (unavailableDates, checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const date = new Date(start.getTime());

    while (date <= end) {
      console.log(unavailableDates);
      console.log(date.toISOString().slice(0, 10));
      if (unavailableDates.includes(new Date(date).toISOString().slice(0, 10)))
        return false;
      date.setDate(date.getDate() + 1);
    }

    return true;
  };

  const handleBedSizeOptions = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;

    setSelectedBedSize((prevselectedBedSize) => {
      if (isChecked) {
        setFilteredData(
          roomData.filter((data) => {
            return (
              data.price >= parseInt(minPrice) &&
              data.price <= parseInt(maxPrice) &&
              checkAvailibility(
                data.unavailableDates,
                checkInDate,
                checkOutDate
              ) &&
              [...prevselectedBedSize, checkboxValue].includes(data.bedsize) &&
              selectedServices.every((service) =>
                data.services.includes(service)
              )
            );
          })
        );

        return [...prevselectedBedSize, checkboxValue];
      } else {
        setFilteredData(
          roomData.filter((data) => {
            return (
              (data.price >= parseInt(minPrice) &&
                data.price <= parseInt(maxPrice) &&
                checkAvailibility(
                  data.unavailableDates,
                  checkInDate,
                  checkOutDate
                ) &&
                (!prevselectedBedSize.filter(
                  (option) => option !== checkboxValue
                ).length ||
                  prevselectedBedSize
                    .filter((option) => option !== checkboxValue)
                    .includes(data.bedsize)) &&
                !selectedServices.length) ||
              selectedServices.every((service) =>
                data.services.includes(service)
              )
            );
          })
        );

        return prevselectedBedSize.filter((option) => option !== checkboxValue);
      }
    });
  };

  const handleServicesOptions = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;

    setSelectedServices((prevselectedBedSize) => {
      if (isChecked) {
        setFilteredData(
          roomData.filter((data) => {
            return (
              data.price >= parseInt(minPrice) &&
              data.price <= parseInt(maxPrice) &&
              checkAvailibility(
                data.unavailableDates,
                checkInDate,
                checkOutDate
              ) &&
              (!selectedBedSize.length ||
                selectedBedSize.includes(data.bedsize)) &&
              (![...prevselectedBedSize, checkboxValue].length ||
                [...prevselectedBedSize, checkboxValue].every((service) =>
                  data.services.includes(service)
                ))
            );
          })
        );
        return [...prevselectedBedSize, checkboxValue];
      } else {
        setFilteredData(
          roomData.filter((data) => {
            return (
              data.price >= parseInt(minPrice) &&
              data.price <= parseInt(maxPrice) &&
              checkAvailibility(
                data.unavailableDates,
                checkInDate,
                checkOutDate
              ) &&
              (!selectedBedSize.length ||
                selectedBedSize.includes(data.bedsize)) &&
              (!prevselectedBedSize.filter((option) => option !== checkboxValue)
                .length ||
                prevselectedBedSize
                  .filter((option) => option !== checkboxValue)
                  .every((service) => data.services.includes(service)))
            );
          })
        );
        return prevselectedBedSize.filter((option) => option !== checkboxValue);
      }
    });
  };

  const handleSliderChange = (value) => {
    const [newMinPrice, newmaxPrice] = value;
    setMinPrice(newMinPrice);
    setMaxPrice(newmaxPrice);
    setFilteredData(
      roomData.filter(
        (data) =>
          data.price >= parseInt(newMinPrice) &&
          data.price <= parseInt(newmaxPrice) &&
          checkAvailibility(data.unavailableDates, checkInDate, checkOutDate) &&
          (!selectedBedSize.length || selectedBedSize.includes(data.bedsize)) &&
          (!selectedServices.length ||
            selectedServices.every((service) =>
              data.services.includes(service)
            ))
      )
    );
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

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  // console.log(filteredData);
  if (filteredData)
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
                      value="King"
                      onChange={(e) => {
                        handleBedSizeOptions(e);
                      }}
                    />
                    King
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="option2"
                      value="Queen"
                      onChange={(e) => {
                        handleBedSizeOptions(e);
                      }}
                    />
                    Queen
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="option3"
                      value="Double"
                      onChange={(e) => {
                        handleBedSizeOptions(e);
                      }}
                    />
                    Double
                  </li>

                  <li>
                    <input
                      type="checkbox"
                      id="option4"
                      value="Single"
                      onChange={(e) => {
                        handleBedSizeOptions(e);
                      }}
                    />
                    Single
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
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => {
                    setCheckInDate(e.target.value);
                    const minimumCheckOutDate = new Date(e.target.value);
                    minimumCheckOutDate.setDate(
                      minimumCheckOutDate.getDate() + 1
                    );

                    if (new Date(checkOut) < minimumCheckOutDate) {
                      setCheckOutDate(
                        minimumCheckOutDate.toISOString().substring(0, 10)
                      );
                    }
                    setFilteredData(
                      roomData.filter(
                        (data) =>
                          data.price >= parseInt(minPrice) &&
                          data.price <= parseInt(maxPrice) &&
                          checkAvailibility(
                            data.unavailableDates,
                            e.target.value,
                            checkOutDate
                          ) &&
                          (!selectedBedSize.length ||
                            selectedBedSize.includes(data.bedsize)) &&
                          (!selectedServices.length ||
                            selectedServices.every((service) =>
                              data.services.includes(service)
                            ))
                      )
                    );
                  }}
                ></input>
              </div>
              <div className="exit">
                <input
                  type="date"
                  value={checkOutDate}
                  min={tomorrow.toISOString().slice(0, 10)}
                  onChange={(e) => {
                    setCheckOutDate(e.target.value);
                    setFilteredData(
                      roomData.filter(
                        (data) =>
                          data.price >= parseInt(minPrice) &&
                          data.price <= parseInt(maxPrice) &&
                          checkAvailibility(
                            data.unavailableDates,
                            checkInDate,
                            e.target.value
                          ) &&
                          (!selectedBedSize.length ||
                            selectedBedSize.includes(data.bedsize)) &&
                          (!selectedServices.length ||
                            selectedServices.every((service) =>
                              data.services.includes(service)
                            ))
                      )
                    );
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>

        <div className="card-container">
          {filteredData.length ? (
            filteredData
              .slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage)
              ?.map((data, index) => {
                const {
                  price,
                  capacity,
                  bedsize,
                  images,
                  services,
                  _id,
                  name,
                } = data;

                return (
                  <Card
                    name={name}
                    price={price}
                    capacity={capacity}
                    size={bedsize}
                    image={images}
                    services={services}
                    id={_id}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    key={index}
                    singleRoom={data}
                  />
                );
              })
          ) : (
            <p>No Data Found</p>
          )}
          <Pagination
            className="pagination-component"
            current={currentPage}
            total={filteredData.length * 10}
            pageSize={itemPerPage * 10}
            showSizeChanger={false}
            onChange={handleChangePage}
            responsive
          />
        </div>
      </div>
    );
  else return <Spinner />;
}
