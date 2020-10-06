import React, { useState } from "react";
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

const MemeUploader = (props) => {
  const handleUpdate = (files) => {
    let data = new FormData();
    data.append("could_be_name_just_file", files[0].file);
    Axios.post("/api/memes/generate_chuck_with_cu", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [files, setFiles] = useState([]);
  const [xFiles, setXFiles] = useState([]);
  return (
    <div className="App">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        // maxFiles={3}
        server="/api/memes/generate_chuck/3"
        name="files"
        // this won't authenticate or user
        // {/* sets the file input name, it's filepond by default */}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />

      <FilePond
        files={xFiles}
        onupdatefiles={handleUpdate}
        allowMultiple={false}
        // maxFiles={3}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};

export default MemeUploader;
