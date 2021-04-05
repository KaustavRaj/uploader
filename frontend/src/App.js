import React, { Fragment, useState } from "react";
import { UploadIcon, XIcon } from "@heroicons/react/solid";
import { CheckIcon } from "@heroicons/react/outline";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const uploadUrl = "/api/upload";

  function validateFileType(file, onSuccess, onError) {
    let filename = file.name;
    var dotIndex = filename.lastIndexOf(".") + 1;
    var extension = filename.substr(dotIndex, filename.length).toLowerCase();
    if (extension === "xlsx" || extension === "xls") {
      return onSuccess(file);
    }
    return onError();
  }

  const handleUpload = (event) => {
    let uploadedFile = event.target.files[0];
    console.log("FILE", uploadedFile);

    validateFileType(
      uploadedFile,
      (file) => {
        setError(null);
        setFile(file);
      },
      () => {
        setError("Oops! Invalid file format");
      }
    );
  };

  const submissionError = (error) => {
    setError(error);
  };

  const handleSubmit = (event) => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(uploadUrl, formData)
      .then(
        (response) => {
          setSubmitted(true);
          setFile(null);
        },
        (error) => submissionError("Error in file submission.")
      )
      .catch((error) => submissionError("Unknown error occurred."));
  };

  const Header = () => (
    <div className="app-header">
      <h1>Add from Excel</h1>
      <XIcon className="h-6 w-6" />
    </div>
  );

  const SuccessScreen = () => (
    <div className="success-wrapper">
      <h1 className="font-bold text-green-600">Thank You!</h1>
      <span className="inline-msg">
        <CheckIcon className="check-icon" />
        <h3>File Succesfully Uploaded.</h3>
      </span>
      <h3>Your record will be processed shortly.</h3>
    </div>
  );

  const UploadSection = () => (
    <Fragment>
      <UploadIcon className="upload-icon" />
      <span>
        {error ? (
          <h3 className="text-red-600">{error}</h3>
        ) : file ? (
          file.name
        ) : (
          "Upload a .xlsx or .xls file here"
        )}
      </span>
      {file && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </Fragment>
  );

  return (
    <div className="app-main">
      <div className="app-wrapper">
        <Header />
        <div className="app-content">
          <h1 className="font-medium mb-10">Add Candidates to Database</h1>
          <input
            type="file"
            id="upload"
            name="upload"
            onChange={handleUpload}
            disabled={submitted}
            hidden
          />
          <label htmlFor="upload" className="upload-container">
            {submitted ? <SuccessScreen /> : <UploadSection />}
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
