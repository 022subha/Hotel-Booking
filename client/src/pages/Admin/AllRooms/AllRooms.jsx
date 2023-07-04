import { message, Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../components/Dashboard/DashboardLayout";
import { hideLoading, showLoading } from "../../../redux/features/spinnerSlice";
import "./AllRooms.css";

export default function AllRooms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Rooms, setRooms] = useState([]);
  const [autoPlay, setAutoPlay] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = window.innerWidth < 1060 ? 1 : 5;

  const handleMouseEnter = (index) => {
    setAutoPlay(index);
  };

  const handleMouseLeave = () => {
    setAutoPlay(null);
  };

  const getAllRooms = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/room/getAllRooms`)
      .then((result) => {
        if (result.data.status) {
          console.log(result.data.rooms);
          setRooms(result.data.rooms);
        } else {
          message.error(result.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    dispatch(showLoading());
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/room/deleteById`, {
        data: {
          RoomId: id,
        },
      })
      .then((result) => {
        dispatch(hideLoading());
        if (result.data.status) {
          console.log(result.data.message);
          message.success(result.data.message);
          console.log(result.data.updatedRooms);
        } else {
          message.error(result.data.error);
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        console.log(error);
      });
  };

  const handleCreate = (id) => {
    navigate(`/admin/edit-room/${id}`);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!Rooms || Rooms.length === 0) getAllRooms();
  }, [Rooms]);

  return (
    <Dashboard>
      <table className="room-table">
        <thead>
          <tr>
            <th></th>
            <th>Room Name</th>
            <th>Bed-Size</th>
            <th>Facility</th>
            <th>Price</th>
            <th>Max-count</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Rooms.slice(
            (currentPage - 1) * itemPerPage,
            currentPage * itemPerPage
          ).length > 0 ? (
            Rooms.slice(
              (currentPage - 1) * itemPerPage,
              currentPage * itemPerPage
            ).map((room, index) => (
              <React.Fragment key={room.id}>
                <tr
                  className="room-data"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td className="room-image">
                    {room.images && room.images.length > 0 && (
                      <Carousel
                        showThumbs={false}
                        selectedItem={0}
                        showStatus={false}
                        autoPlay={index === autoPlay}
                        interval={1000}
                        infiniteLoop={true}
                        showIndicators={false}
                        showArrows={false}
                      >
                        {room.images.map((image, index) => (
                          <img src={image} alt="" key={index} />
                        ))}
                      </Carousel>
                    )}
                  </td>
                  <td className="room-name">
                    <p>{room?.name}</p>
                  </td>
                  <td className="room-bedsize">{room.bedsize}</td>
                  <td className="room-facility">
                    {room?.services.map((service) => (
                      <span key={service}>{service}, </span>
                    ))}
                  </td>
                  <td className="room-price">{room?.price}</td>
                  <td className="room-capacity">{room?.capacity}</td>
                  <td className="room-status">Available</td>
                  <td className="room-edit-delete">
                    <ion-icon
                      name="create"
                      onClick={() => {
                        handleCreate(room._id);
                      }}
                    ></ion-icon>
                    <ion-icon
                      name="trash"
                      onClick={() => {
                        handleDelete(room._id);
                      }}
                    ></ion-icon>
                  </td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="6">No rooms available.</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        className="pagination-component"
        current={currentPage}
        total={Rooms.length * 10}
        pageSize={itemPerPage * 10}
        showSizeChanger={false}
        onChange={handleChangePage}
        responsive
      />
    </Dashboard>
  );
}
