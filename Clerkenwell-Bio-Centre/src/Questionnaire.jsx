import React, { useState } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { conditionsData, theatreDates } from "./constants";

const RenderQuestion = ({
  currentQuestion,
  userName,
  setUserName,
  error,
  selectedConditions,
  handleConditionChange,
  email,
  setEmail,
  handleOtherConditionChange,
  handleTrialOptionChange,
  selectedTrialOptions,
}) => {
  const navigate = useNavigate();
  const customStyles = {
    control: (provided) => ({
      ...provided,
      color: "black",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9, // Adjust the zIndex to ensure it overlays other elements
    }),
  };

  const handleBack = () => {
    navigate("/");
  };

  switch (currentQuestion) {
    case 1:
      return (
        <div>
          <p className="text-black ft" >What's your name?</p>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      );
    case 2:
      return (
        <div>
          <p className="text-black ft">
            Do you have any of the following? Please click on all that apply.
          </p>
          <Select
            isMulti
            name="Condition"
            options={conditionsData}
            classNamePrefix="select"
            styles={customStyles}
            value={selectedConditions}
            onChange={handleConditionChange}
          />
          {selectedConditions.some(
            (condition) => condition.value === "Other"
          ) && (
            <Form.Control
              type="text"
              placeholder="Specify other condition"
              className="mt-3"
              value={
                selectedConditions.find((c) => c.value === "Other")?.label || ""
              }
              onChange={handleOtherConditionChange}
            />
          )}
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      );
    case 3:
      return (
        <div>
          <p className="text-white ft">
            Please choose all trials you would be able to attend.
          </p>
          <Select
            isMulti
            name="TrialOption"
            options={theatreDates}
            classNamePrefix="select"
            styles={customStyles}
            value={selectedTrialOptions}
            onChange={handleTrialOptionChange}
          />
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      );
    case 4:
      return (
        <FormGroup>
          <p className="text-black ft">What is your email address?</p>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-danger mt-2">{error}</p>}
        </FormGroup>
      );
    default:
      return (
        <div>
          <p className="text-black ft">
            Thank you for submitting your application!
          </p>
          <button
            className="animated-button mt-4 mb-5 mt-3"
            onClick={handleBack}
          >
            <span>Go Back</span>
            <span></span>
          </button>
        </div>
      );
  }
};

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedTrialOptions, setSelectedTrialOptions] = useState([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // Data to be sent in the request body

    const conditionsValues = selectedConditions.map(condition => condition.value);
    const trialOptionsValues = selectedTrialOptions.map(option => option.value);
    const data = {
      userName,
      conditionsValues,
      trialOptionsValues,
      email,
    };


    // Endpoint to which the POST request will be sent
    const url = `${import.meta.env.VITE_BACKEND_URL}/send-email`; // Replace with your actual endpoint

    // Options for the fetch request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON as the content type
      },
      body: JSON.stringify(data), // Convert data to JSON string
    };

    // Make the POST request
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse response body as JSON
      })
      .then((data) => {
        console.log("Response:", data); // Handle the response data
        // You can perform further actions here, such as showing a success message
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
        // You can show an error message to the user or retry the request, etc.
      });
  };

  const handleNextQuestion = () => {
    switch (currentQuestion) {
      case 1:
        if (!userName.trim()) {
          setError("Please enter your name");
          return;
        }
        break;
      case 2:
        if (selectedConditions.length === 0) {
          setError("Please select at least one condition");
          return;
        }
        break;
      case 3:
        if (selectedTrialOptions.length === 0) {
          setError("Please select at least one trial option");
          return;
        }
        break;
      case 4:
        if (!email.trim()) {
          setError("Please enter your email address");
          return;
        }
        if (!isValidEmail(email.trim())) {
          setError("Please enter a valid email address");
          return;
        }
        handleSubmit();
        break;
      default:
        break;
    }
    setCurrentQuestion((prev) => prev + 1);
    setError("");
  };

  const handleConditionChange = (selectedOptions) => {
    setSelectedConditions(selectedOptions);
  };

  const handleTrialOptionChange = (selectedOptions) => {
    setSelectedTrialOptions(selectedOptions);
  };

  const handleOtherConditionChange = (e) => {
    const otherConditionOption = { value: "Other", label: e.target.value };
    setSelectedConditions((prevOptions) => {
      const filteredOptions = prevOptions.filter(
        (option) => option.value !== "Other"
      );
      return [...filteredOptions, otherConditionOption];
    });
  };

  const isValidEmail = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="app-background questionnaire-container">
      <div className="question-container">
        <RenderQuestion
          currentQuestion={currentQuestion}
          userName={userName}
          setUserName={setUserName}
          error={error}
          selectedConditions={selectedConditions}
          handleConditionChange={handleConditionChange}
          email={email}
          setEmail={setEmail}
          handleOtherConditionChange={handleOtherConditionChange}
          handleTrialOptionChange={handleTrialOptionChange}
          selectedTrialOptions={selectedTrialOptions}
        />
        {currentQuestion !== 5 && (
          <button
            className="animated-button mt-4 mb-5 mt-3"
            onClick={handleNextQuestion}
          >
            <span className="text-black">Next</span>
            <span></span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
