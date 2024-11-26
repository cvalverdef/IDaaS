import React, { useState, useEffect } from "react";
import countries from "../data/countries"; // Ensure this file includes countries, states, cities, and zip masks.

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    countryCode: "",
    areaCode: "",
    mobileNumber: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    addressLine1: "",
    addressLine2: "",
    documentType: "Select",
    documentNumber: "",
    documentUpload: null,
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [zipMask, setZipMask] = useState("");
  const [errors, setErrors] = useState({});
  const [showUploadInstructions, setShowUploadInstructions] = useState(false);

  useEffect(() => {
    // Auto-fill the Country field when Country Code is selected
    if (formData.countryCode) {
      const selectedCountry = countries.find(
        (country) => country.dialCode === formData.countryCode
      );
      if (selectedCountry) {
        setFormData({ ...formData, country: selectedCountry.name });
        setStates(selectedCountry.states || []);
        setZipMask(selectedCountry.zipMask || "");
        setCities([]);
      }
    }
  }, [formData.countryCode]);

  const handleStateChange = (e) => {
    const selectedState = states.find((state) => state.name === e.target.value);
    setFormData({ ...formData, state: e.target.value, city: "" });
    setCities(selectedState?.cities || []);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documentUpload: e.target.files[0] });
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "confirmEmail",
      "countryCode",
      "areaCode",
      "mobileNumber",
      "country",
      "state",
      "city",
      "zipCode",
      "addressLine1",
      "documentType",
      "documentNumber",
      "documentUpload",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Emails do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Submit the form
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            placeholder="Enter your first name"
            className="w-full border p-2 rounded"
          />
          {errors.firstName && <p className="text-red-600">{errors.firstName}</p>}
        </div>

        {/* Middle Name */}
        <div>
          <label>Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={(e) =>
              setFormData({ ...formData, middleName: e.target.value })
            }
            placeholder="Enter your middle name (optional)"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Last Name */}
        <div>
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            placeholder="Enter your last name"
            className="w-full border p-2 rounded"
          />
          {errors.lastName && <p className="text-red-600">{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
            className="w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>

        {/* Confirm Email */}
        <div>
          <label>Confirm Email *</label>
          <input
            type="email"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={(e) =>
              setFormData({ ...formData, confirmEmail: e.target.value })
            }
            placeholder="Confirm your email"
            className="w-full border p-2 rounded"
          />
          {errors.confirmEmail && (
            <p className="text-red-600">{errors.confirmEmail}</p>
          )}
        </div>

        {/* Country Code */}
        <div>
          <label>Country Code *</label>
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={(e) =>
              setFormData({ ...formData, countryCode: e.target.value })
            }
            className="w-full border p-2 rounded"
          >
            <option value="">Select Country Code</option>
            {countries.map((country) => (
              <option key={country.dialCode} value={country.dialCode}>
                {country.flag} {country.name} ({country.dialCode})
              </option>
            ))}
          </select>
          {errors.countryCode && (
            <p className="text-red-600">{errors.countryCode}</p>
          )}
        </div>

        {/* Area Code */}
        <div>
          <label>Area Code *</label>
          <input
            type="text"
            name="areaCode"
            value={formData.areaCode}
            onChange={(e) =>
              setFormData({ ...formData, areaCode: e.target.value })
            }
            placeholder="Enter your area code"
            className="w-full border p-2 rounded"
          />
          {errors.areaCode && <p className="text-red-600">{errors.areaCode}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label>Mobile Number *</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({ ...formData, mobileNumber: e.target.value })
            }
            placeholder="Enter your mobile number"
            className="w-full border p-2 rounded"
          />
          {errors.mobileNumber && (
            <p className="text-red-600">{errors.mobileNumber}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label>Country *</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* State */}
        <div>
          <label>State/Province/Region *</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleStateChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select a State/Province</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-600">{errors.state}</p>}
        </div>

        {/* City */}
        <div>
          <label>City *</label>
          <select
            name="city"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
            className="w-full border p-2 rounded"
          >
            <option value="">Select a City</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-red-600">{errors.city}</p>}
        </div>

        {/* Zip/Postal Code */}
        <div>
          <label>Zip/Postal Code *</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
            placeholder={zipMask || "Enter Zip/Postal Code"}
            className="w-full border p-2 rounded"
          />
          {errors.zipCode && <p className="text-red-600">{errors.zipCode}</p>}
        </div>

        {/* Address Line 1 */}
        <div>
          <label>Address Line 1 *</label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={(e) =>
              setFormData({ ...formData, addressLine1: e.target.value })
            }
            placeholder="Enter your address"
            className="w-full border p-2 rounded"
          />
          {errors.addressLine1 && (
            <p className="text-red-600">{errors.addressLine1}</p>
          )}
        </div>

        {/* Address Line 2 */}
        <div>
          <label>Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={(e) =>
              setFormData({ ...formData, addressLine2: e.target.value })
            }
            placeholder="Enter additional address information (optional)"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Document Type */}
        <div>
          <label>Document Type *</label>
          <select
            name="documentType"
            value={formData.documentType}
            onChange={(e) =>
              setFormData({ ...formData, documentType: e.target.value })
            }
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="National ID">National ID</option>
            <option value="Driver's License">Driver's License</option>
            <option value="Passport">Passport</option>
          </select>
          {errors.documentType && (
            <p className="text-red-600">{errors.documentType}</p>
          )}
        </div>

        {/* Document Number */}
        <div>
          <label>Document Number *</label>
          <input
            type="text"
            name="documentNumber"
            value={formData.documentNumber}
            onChange={(e) =>
              setFormData({ ...formData, documentNumber: e.target.value })
            }
            placeholder="Enter document number"
            className="w-full border p-2 rounded"
          />
          {errors.documentNumber && (
            <p className="text-red-600">{errors.documentNumber}</p>
          )}
        </div>

        {/* Upload Document */}
        <div>
          <label>Upload Document *</label>
          <input
            type="file"
            onChange={handleFileChange}
            className={`w-full border p-2 rounded ${
              errors.documentUpload ? "border-red-500" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowUploadInstructions(true)}
            className="text-blue-600 underline"
          >
            View Upload Instructions
          </button>
          {showUploadInstructions && (
            <div className="bg-gray-100 p-4 border rounded mt-2">
              <h4 className="font-bold">Document Upload Instructions:</h4>
              <p>Ensure your document is clear and legible.</p>
              <p>Acceptable formats: JPG, PNG, PDF.</p>
              <p>Max file size: 10MB.</p>
              <button
                type="button"
                onClick={() => setShowUploadInstructions(false)}
                className="text-red-600 underline"
              >
                Close Instructions
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
