import React from "react";

const Compliance = () => {
  return (
    <div>
      <h1>Compliance</h1>
      <p>Ensure your compliance status is up-to-date. Upload your necessary documents below:</p>
      <form>
        <div>
          <label>Upload Document:</label>
          <input type="file" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Compliance;
