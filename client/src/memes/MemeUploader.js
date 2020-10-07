import React, { useState } from "react";
import { FilePond, File, registerPlugin } from "react-filepond";
import axios from "axios";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Axios from "axios";

const HEADERS = ["access-token", "token-type", "client", "expiry", "uid"];

export const getTokens = async (storage) => {
  let headers = {};
  for (let token of HEADERS) {
    const t = await localStorage.getItem(token);
    headers[token] = t;
  }

  console.log(headers);
  return headers;
};

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const MemeUploader = (props) => {
  const [files, setFiles] = useState([]);
  const [xFiles, setXFiles] = useState([]);
  const ref = React.useRef();

  const handleUpdate = (files) => {
    console.log("called");
    console.log(ref);
    console.log(axios);
    // if (xFiles.length == 0) {
    //   setXFiles(files);
    //   return;
    // }
    debugger;
    let data = new FormData();
    data.append("could_be_name_just_file", files[0].file);
    // setXFiles(files[0].file)
    Axios.post("/api/memes/generate_chuck_with_cu", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        // maxFiles={3}
        //
        // *THIS WAY UPLAODS, but doesn't have new token in the respone on onload
        // server={{
        //   process: {
        //     url: "/api/memes/generate_chuck/3",
        //     headers: {
        //       ...getTokens(),
        //       Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        //       "access-token": localStorage.getItem("access-token"),
        //       "token-type": localStorage.getItem("token-type"),
        //       client: localStorage.getItem("client"),
        //       expiry: localStorage.getItem("expiry"),
        //       uid: localStorage.getItem("uid"),
        //     },
        //     // ondata: (x) => {
        //     //   debugger;
        //     // },
        //     onload: (res) => {
        //       console.log(ref);
        //       console.log(axios);
        //       debugger;
        //     },
        //   },
        // }}
        server={{
          process: (
            fieldName,
            file,
            metadata,
            load,
            error,
            progress,
            abort,
            transfer,
            options
          ) => {
            // fieldName is the name of the input field
            // file is the actual file object to send
            const formData = new FormData();
            formData.append(fieldName, file, file.name);

            const request = new XMLHttpRequest();

            // need to add out header
            request.open("POST", "/api/memes/generate_chuck/3");
            console.log(localStorage.getItem("access-token"));
            request.setRequestHeader(
              "access-token",
              localStorage.getItem("access-token")
            );
            request.setRequestHeader(
              "token-type",
              localStorage.getItem("token-type")
            );
            request.setRequestHeader("client", localStorage.getItem("client"));
            request.setRequestHeader("expiry", localStorage.getItem("expiry"));
            request.setRequestHeader("uid", localStorage.getItem("uid"));

            // Should call the progress method to update the progress to 100% before calling load
            // Setting computable to false switches the loading indicator to infinite mode
            request.upload.onprogress = (e) => {
              progress(e.lengthComputable, e.loaded, e.total);
            };

            // Should call the load method when done and pass the returned server file id
            // this server file id is then used later on when reverting or restoring a file
            // so your server knows which file to return without exposing that info to the client
            request.onload = function () {
              if (request.status >= 200 && request.status < 300) {
                // the load method accepts either a string (id) or an object

                // need to set new token from response
                localStorage.setItem(
                  "access-token",
                  request.getResponseHeader("access-token")
                );
                localStorage.setItem(
                  "client",
                  request.getResponseHeader("client")
                );
                localStorage.setItem("uid", request.getResponseHeader("uid"));
                localStorage.setItem(
                  "expiry",
                  request.getResponseHeader("expiry")
                );
                localStorage.setItem(
                  "token-type",
                  request.getResponseHeader("token-type")
                );
                console.log(request.getResponseHeader("access-token"));
                // load(request.responseText);
                load(request);
              } else {
                // Can call the error method if something is wrong, should exit after
                error("oh no");
              }
            };

            request.send(formData);

            // Should expose an abort method so the request can be cancelled
            return {
              abort: () => {
                // This function is entered if the user has tapped the cancel button
                request.abort();

                // Let FilePond know the request has been cancelled
                abort();
              },
            };
          },
        }}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />

      <FilePond
        ref={ref}
        instantUpload={false}
        onupdatefiles={handleUpdate}
        allowMultiple={false}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};

export default MemeUploader;
