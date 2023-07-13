import { Avatar, message as msg } from "antd";
import axios from "axios";
import React, { useState } from "react";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import "./AddRooms.css";

export default function AddRooms() {
  const [imagePrev, setImagePrev] = useState([]);
  const [images, setImages] = useState([]);
  const [name, setName] = useState();
  const [capacity, setCapacity] = useState();
  const [bedSize, setBedSize] = useState();
  const [services, setServices] = useState([]);
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  const handleAddRooms = async (e) => {
    e.preventDefault();
    try {
      const bodyContent = new FormData();
      bodyContent.append("name", name);
      bodyContent.append("capacity", capacity);
      bodyContent.append("bedsize", bedSize);
      services.forEach((service) => {
        bodyContent.append("services", service);
      });
      bodyContent.append("description", description);
      bodyContent.append("price", price);
      images.forEach((image) => {
        bodyContent.append("images", image);
      });

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/room/add-rooms`,
        bodyContent,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const { status, message } = response.data;

      if (status) {
        msg.success(message);
      } else {
        msg.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const prevImages = [...imagePrev]; // Make a copy of existing preview images array
        prevImages.push(reader.result); // Add new image URLs to the array
        setImagePrev(prevImages);
        setImages([...images, file]);
      };
    }
  };

  const handleDelete = (index) => {
    const updatedImages = imagePrev.filter((image, index1) => {
      return index1 !== index;
    });
    setImagePrev(updatedImages);
  };

  const handleServiceChange = (service, checked) => {
    if (checked) {
      setServices([...services, service]);
    } else {
      const updatedServices = services.filter((s) => s !== service);
      setServices(updatedServices);
    }
  };

  return (
    <DashboardLayout>
      <div className="add-rooms-container">
        <div className="main-container">
          <div className="name">
            <p>Name:</p>
            <input
              type="text"
              placeholder="Enter Name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="description">
            <p>Description:</p>
            <textarea
              placeholder="Enter Description"
              required
              rows={10}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="size">
            <p>Bed Size:</p>
            <select
              onChange={(e) => {
                setBedSize(e.target.value);
              }}
            >
              <option value="">Select Bed Size</option>
              <option value="King">King</option>
              <option value="Queen">Queen</option>
              <option value="Double">Double</option>
              <option value="Single">Single</option>
            </select>
          </div>
          <div className="capacity">
            <p>Capacity:</p>
            <input
              type="number"
              placeholder="Enter max-capacity"
              onChange={(e) => {
                setCapacity(e.target.value);
              }}
            ></input>
          </div>

          <div className="services">
            <p>Services:</p>
            <ul>
              <li>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleServiceChange("AC", e.target.checked)
                    }
                  />
                  <span>AC</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleServiceChange("TV", e.target.checked)
                    }
                  />
                  <span>TV</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleServiceChange("Wifi", e.target.checked)
                    }
                  />
                  <span>Wifi</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleServiceChange("Food Service", e.target.checked)
                    }
                  />
                  <span>Food Service</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="price">
            <p>Price:</p>
            <input
              type="number"
              placeholder="Enter Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="images">
            <p>Images:</p>
            <input
              type="file"
              accept="image/*"
              placeholder="Images of the Room"
              multiple
              onChange={changeImageHandler}
            />
          </div>

          <div className="preview">
            {imagePrev.map((image, index) => {
              return (
                <div key={index} className="image-preview">
                  <ion-icon
                    name="close-outline"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  ></ion-icon>
                  <Avatar
                    key={index} // Add the key prop
                    size={60}
                    shape="square"
                    src={image}
                  />
                </div>
              );
            })}
          </div>
          <div className="btn">
            <button
              className="submit"
              onClick={(e) => {
                handleAddRooms(e);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
