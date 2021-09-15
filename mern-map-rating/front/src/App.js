import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import "./app.css";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [points, setPoints] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const [title, setTitle] = useState(null);
  const [comment, setComment] = useState(null);
  const [rating, setRating] = useState(0);

  const [showRegister, setShowRegister] = useState(0);
  const [showLogin, setShowLogin] = useState(0);

  const [viewport, setViewport] = useState({
    width: "200vw",
    height: "100vw",
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });

  useEffect(() => {
    const getPoints = async () => {
      try {
        const res = await axios.get("/points");
        setPoints(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPoints();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewLocation({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPoint = {
      username: currentUser,
      title,
      comment,
      rating,
      latitude: newLocation.lat,
      long: newLocation.long,
    };

    try {
      const res = await axios.post("/pins", newPoint);
      setPoints([...points, res.data]);
      setNewLocation(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles"
        onDblClick={handleAddClick}
        transitionDuration="300"
      >
        {points.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-viewport.zoom * 3.5}
              offsetTop={-viewport.zoom * 7}
            >
              <Room
                style={{
                  fontSize: viewport.zoom * 7,
                  color: p.username === currentUser ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                anchor="top"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>PLACE</label>
                  <h4>{p.title}</h4>
                  <label>REVIEW</label>
                  <p className="desc">{p.comment}</p>
                  <label>RATE</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>

                  <label>INFO</label>
                  <span className="user">
                    Created by <b>p.username</b>
                  </span>
                  <span className="date">{TimeAgo(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        <Popup
          latitude={20}
          longitude={20}
          closeButton={true}
          closeOnClick={false}
          anchor="top"
          onClose={() => setNewLocation(null)}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Review</label>
              <textarea
                placeholder="say us something"
                onChange={(e) => setComment(e.target.value)}
              />
              <label>Rating</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">
                Ekle
              </button>
            </form>
          </div>
        </Popup>

        {currentUser ? (
          <div className="buttons">
            <button className="btnexit" onClick={handleLogout}>
              Çıkış Yap
            </button>
          </div>
        ) : (
          <div className="buttons">
            <button
              className="btnsignin"
              onClick={() => {
                setShowLogin(true);
              }}
            >
              Giriş
            </button>
            <button
              className="btnsignup"
              onClick={() => {
                setShowRegister(true);
              }}
            >
              Kayıt Ol
            </button>
          </div>
        )}
        {showRegister && <Signup setShowRegister={setShowRegister} />}
        {showLogin && (
          <Signin
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
