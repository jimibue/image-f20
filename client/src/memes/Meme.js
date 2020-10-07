import axios from "axios";
import React, { useState } from "react";
// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Axios from "axios";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function Meme({
  id,
  image_url,
  description: intialDescription,
}) {
  const [editing, setEditing] = useState(false);
  // const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  // I want to pre-populate the value of my input
  const [description, setDescription] = useState(intialDescription);

  const displayMeme = () => {
    return (
      <div>
        <div>
          <img src={image_url} />
          <p>{description}</p>
        </div>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("des", description);
    data.append("fileX", file);
    axios
      .put(`/api/memes/${id}?descriptionX=${description}`, data)
      .then((res) => {})
      .catch((err) => {});
  };

  const handleUpdate = (files) => {
    // lets set our file
    // debugger;
    setFile(files[0].file);
  };
  const displayEditor = () => {
    return (
      <div>
        <h1>edit here</h1>
        <form onSubmit={handleSubmit}>
          <FilePond
            // files={files}
            onupdatefiles={handleUpdate}
            allowMultiple={false}
            // name="files"
          />
          <textarea
            style={{ width: "600px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="10"
            cols="30"
          ></textarea>
          <button type="submit">add</button>
        </form>
      </div>
    );
  };

  return (
    <>
      <h1 onClick={() => setEditing(!editing)}>
        {editing ? "cancel edit" : "edit"}
      </h1>
      {editing ? displayEditor() : displayMeme()}
    </>
  );
}
