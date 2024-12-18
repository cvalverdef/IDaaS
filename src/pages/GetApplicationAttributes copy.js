import React, { useState } from "react";
import { getApplicationAttributes } from "../services/legalServices";

const GetApplicationAttributes = () => {
  const [attributes, setAttributes] = useState(null);

  const fetchAttributes = async () => {
    try {
      const result = await getApplicationAttributes();
      setAttributes(result);
    } catch (err) {
      console.error("Failed to fetch application attributes.", err);
    }
  };

  return (
    <div>
      <h2>Application Attributes</h2>
      <button onClick={fetchAttributes}>Fetch Attributes</button>
      {attributes && <pre>{JSON.stringify(attributes, null, 2)}</pre>}
    </div>
  );
};

export default GetApplicationAttributes;
