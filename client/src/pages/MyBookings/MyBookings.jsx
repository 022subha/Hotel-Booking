import { Pagination, message as msg } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/spinnerSlice.js";
import "./MyBookings.css";

const BookingStatus = ({
  name,
  price,
  roomId,
  checkIn,
  checkOut,
  handleAddReview,
  reviewBoxId,
  setReviewBoxId,
}) => {
  return (
    <div className="status-and-card big-card">
      <div className="main-content-container">
        <div className="header">
          <h2>
            <span>{name}</span>
          </h2>
        </div>
        <div className="paisa">
          <h4>
            {new Date(checkIn).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(checkOut).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </h4>
        </div>

        <div className="footer">
          <Link to={`/singlerooms/${roomId}`}>
            <h3>View details</h3>
          </Link>
        </div>
      </div>
      <div className="my-bookings-stay-interval">
        <div className="from-to-dates small-cards">Amount : ₹{price}</div>
        <div className="payment small-cards">Payment : Done</div>
        <div className="review-btn">
          <ion-icon name="add"></ion-icon>
          <button type="submit" onClick={handleAddReview}>
            Add Review
          </button>
        </div>
      </div>
    </div>
  );
};

const MyBookings = () => {
  const dispatch = useDispatch();

  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showReview, setShowReview] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewBoxId, setReviewBoxId] = useState();
  const itemPerPage = window.innerWidth < 1060 ? 1 : 5;

  const { user } = useSelector((state) => state.user);
  const getUserBooking = (id) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/getBookingByUser`, {
        userId: id,
      })
      .then((result) => {
        if (result.data.status) {
          setBookingData(result.data.booking);
        } else {
          console.log(result.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddReview = (e, id) => {
    e.preventDefault();
    setShowReview(true);
    setReviewBoxId(id);
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReviewSubmit = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/review/add-review`,
        { userId: user.id, roomId: reviewBoxId, review: reviewText }
      );
      dispatch(hideLoading());
      const { status, message } = response.data;
      if (status) {
        msg.success(message);
        setReviewText("");
        setShowReview(false);
      } else {
        msg.error(message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (user) {
      getUserBooking(user.id);
    }
  }, []);
  return (
    <>
      <div className="room-container">
        <div className="card-container">
          {bookingData.slice(
            (currentPage - 1) * itemPerPage,
            currentPage * itemPerPage
          ).length &&
            bookingData
              .slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage)
              .map((item, index) => (
                <BookingStatus
                  key={index}
                  name={item.roomId.name}
                  price={item.totalCost}
                  roomId={item.roomId._id}
                  checkIn={item.checkIn}
                  checkOut={item.checkOut}
                  handleAddReview={(e) => handleAddReview(e, item.roomId._id)}
                  reviewBoxId={reviewBoxId}
                  setReviewBoxId={setReviewBoxId}
                />
              ))}
        </div>
        {showReview && (
          <div className="review-input-container">
            <textarea
              className="review-textarea"
              placeholder="Write your review..."
              value={reviewText}
              onChange={handleReviewChange}
            />
            <button
              className="review-submit-btn"
              type="button"
              onClick={handleReviewSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>
      <Pagination
        className="pagination-component"
        current={currentPage}
        total={bookingData.length * 10}
        pageSize={itemPerPage * 10}
        showSizeChanger={false}
        onChange={handleChangePage}
        responsive
      />
    </>
  );
};

export default MyBookings;
