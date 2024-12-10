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

  const [states, setStates] = useState([]); // Define states here

  useEffect(() => {
    if (formData.countryCode) {
      const selectedCountry = countries.find(
        (country) => country.dialCode === formData.countryCode
      );
      if (selectedCountry) {
        setStates(selectedCountry.states || []); // Use setStates properly here
      }
    }
  }, [formData.countryCode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.Agent) {
      window.Agent.register(formData, (response) => {
        console.info("Registration Response:", response);
        if (response.success) {
          alert("Registration successful!");
        } else {
          alert("Registration failed.");
        }
      });
    } else {
      console.error("Agent.js is not loaded.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Last Name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Country Code *</label>
          <select
            value={formData.countryCode}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, countryCode: e.target.value }))
            }
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.dialCode} value={country.dialCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>State</label>
          <select
            value={formData.state}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, state: e.target.value }))
            }
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>ZIP Code *</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, zipCode: e.target.value }))
            }
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
