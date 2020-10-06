import Axios from "axios";
import React, { useEffect, useState } from "react";
import MemeUploader from "./MemeUploader";

const Memes = (props) => {
  const [memes, setMemes] = useState([]);
  useEffect(() => {
    Axios.get("/api/memes").then((res) => {
      setMemes(res.data);
    });
  }, []);
  return (
    <div>
      <h1>Memes</h1>
      {memes.map((m) => {
        return (
          <div>
            <img src={m.image_url} />
            <p>{m.description}</p>
          </div>
        );
      })}
      <MemeUploader />
    </div>
  );
};

export default Memes;
