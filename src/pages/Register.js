import React, { useState, useEffect } from "react";
import countries from "../data/countries";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    state: "",
    zipCode: "",
  });
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (formData.countryCode) {
      const selectedCountry = countries.find((c) => c.dialCode === formData.countryCode);
      setStates(selectedCountry ? selectedCountry.states || [] : []);
    }
  }, [formData.countryCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration data:", formData);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
        <input type="text" name="lastName" placeholder="Last Name" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
        <input type="email" name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <select name="countryCode" onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.dialCode} value={country.dialCode}>
              {country.name}
            </option>
          ))}
        </select>
        <select name="state" onChange={(e) => setFormData({ ...formData, state: e.target.value })}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <input type="text" name="zipCode" placeholder="ZIP Code" onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
