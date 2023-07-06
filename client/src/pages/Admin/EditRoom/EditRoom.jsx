import React,{useState,useEffect} from 'react'
import Dashboard from '../../../components/Dashboard/DashboardLayout'
import './EditRoom.css';
import { Avatar, message as msg } from "antd";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { message } from 'antd';

export default function EditRoom() {
 const [imagePrev, setImagePrev] = useState([]);
  const [images, setImages] = useState([]);
  const [name, setName] = useState();
  const [capacity, setCapacity] = useState();
  const [bedSize, setBedSize] = useState();
  const [services, setServices] = useState([]);
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const[InitialValue,setInitialValue]=useState("");

  const params=useParams();
  const id=params.id;

 const getRoomById=()=>{
    axios.post(`${process.env.REACT_APP_API_URL}/api/room/getRoomById`,{
        roomId:id,
    }).then((result)=>{
       if(result.data.status)
       {
        // message.success(result.data.message);
        setInitialValue(result.data.roomDetails);
        console.log(result.data.roomDetails);
        setName(InitialValue.name);
       }
       else{
        message.error(result.data.message);
       }
    }).catch((error)=>{
        console.log(error);
    })
 }

  const handleUpdateRooms = async (e) => {
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
        `${process.env.REACT_APP_API_URL}/api/room/updateById/${id}`,
        bodyContent,
        {
          headers:
          {
              "Authorization":"Bearer "+localStorage.getItem("token"),
          }
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
        console.log(images);
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

  useEffect(() => {
    if (!InitialValue) {
      getRoomById();
    } else {
      setName(InitialValue.name);
      setCapacity(InitialValue.capacity);
      setDescription(InitialValue?.description);
      setPrice(InitialValue?.price);
      setServices(InitialValue?.services);
      // If no new file is selected, handle the fetched image URLs
        const fetchedImages = InitialValue?.images || [];
      setImagePrev(fetchedImages);
        // Create an array of dummy file objects for the fetched image URLs
        const fetchedFiles = fetchedImages.map((url) => new File([], url));
        setImages(fetchedFiles);
        // console.log(images);
      // Set other values here based on InitialValue
    }
  }, [InitialValue]);

  return (
    <Dashboard>
        <div className="edit-rooms-container">
        <div className="main-container">
          <div className="name">
            <p>Name:</p>
            <input
              type="text"
              value={name}
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
              value={description}
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
              <option value="">{InitialValue?.bedsize}</option>
              <option value="twin">Twin</option>
              <option value="twin-xl">Twin XL</option>
              <option value="full">Full/Double</option>
              <option value="queen">Queen</option>
              <option value="king">King</option>
              <option value="cal-king">California King</option>
            </select>
          </div>
          <div className="capacity">
            <p>Capacity:</p>
            <input
              type="number"
              value={capacity}
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
                    checked={services.includes("AC")}
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
                    checked={services.includes("Swimming Pool")}
                    onChange={(e) =>
                      handleServiceChange("Swimming Pool", e.target.checked)
                    }
                  />
                  <span>Swimming Pool</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={services.includes("Wifi")}
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
                    checked={services.includes("Canteen")}
                    onChange={(e) =>
                      handleServiceChange("Canteen", e.target.checked)
                    }
                  />
                  <span>Canteen</span>
                </label>
              </li>
            </ul>
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

          <div className="price">
            <p>Price:</p>
            <input
              type="number"
              value={price}
              placeholder="Enter Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
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
                handleUpdateRooms(e);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}
