import Axios from "axios";
import React, { useEffect, useState } from "react";
import Meme from "./Meme";
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
      {memes.map((m) => (
        <Meme key={m.id} {...m} />
      ))}
      <MemeUploader />
    </div>
  );
};

export default Memes;
