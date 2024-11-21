import React, { useState } from "react";

const Onboarding = () => {
  const [formData, setFormData] = useState({ cpf: "", cnpj: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`CPF: ${formData.cpf}, CNPJ: ${formData.cnpj}`);
  };

  return (
    <div>
      <h1>Onboarding</h1>
      <p>Enter your CPF or CNPJ to start the onboarding process.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            placeholder="Enter CPF"
          />
        </div>
        <div>
          <label>CNPJ:</label>
          <input
            type="text"
            value={formData.cnpj}
            onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
            placeholder="Enter CNPJ"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Onboarding;
