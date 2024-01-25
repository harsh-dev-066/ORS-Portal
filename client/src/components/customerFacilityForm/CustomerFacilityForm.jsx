import React, { useState, useEffect } from "react";
import { Form, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./style.css";

const CustomerFacilityForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [facility, setFacility] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [isSubmitLoading, setSubmitLoading] = useState(false);

  const availableFacilities = ["Restaurant", "Hotel", "Spa", "Saloon"];

  const history = useHistory();

  const formSubmit = async (body) => {
    try {
      setErrorMsg("");
      setSubmitLoading(true);
      await axios.post("/api/v1/user", body);
      // alert("Form Submitted");
      setSubmitLoading(false);
      history.push("/customer/thanks");
    } catch (err) {
      setErrorMsg(err.message);
      setSubmitLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userForm = {
      name: name,
      mobileNumber: mobile,
      email: email,
      address: address,
      phoneNumber: phone,
      facility: facility.toLowerCase(),
    };
    formSubmit(userForm);
  };

  useEffect(() => {
    if (name && mobile && email && facility) setSubmitDisabled(false);
  }, [name, mobile, email, facility]);

  return (
    <div>
      <h3 style={{ margin: " 20px 0px" }}>Facility Booking Form</h3>
      <Form onSubmit={onSubmit} error={!!errorMsg}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Name"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Input
            fluid
            label="Mobile number"
            placeholder="Enter your mobile number"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Email"
            placeholder="Enter your email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Input
            fluid
            label="Phone number"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.TextArea
          label="Address"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {/* <Form.Input
          fluid
          label="Facilities"
          placeholder="What type of facility you are looking for..."
          value={facility}
          onChange={(e) => setFacility(e.target.value)}
        /> */}
        <div className="facility-label">
          Available Facilities <span className="required">*</span>{" "}
        </div>
        <div className="dropdown">
          <div
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className={`dropdown-label ${facility ? "" : "default"}`}
          >
            {facility || "Select Facility"}
          </div>
          {isDropdownOpen && (
            <div className="dropdown-body">
              {availableFacilities?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setFacility(item);
                    setDropdownOpen(false);
                  }}
                  className="dropdown-item"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <div></div>
        <Message error header="Oops!" content={errorMsg} />
        <Form.Button
          loading={isSubmitLoading}
          disabled={isSubmitDisabled}
          floated="right"
          primary
        >
          Submit
        </Form.Button>
      </Form>
    </div>
  );
};

export default CustomerFacilityForm;
