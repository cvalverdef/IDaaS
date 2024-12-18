
export const getCryptoAlgorithms = async () => {
  try {
    if (window.AgentAPI) {
      const algorithms = await window.AgentAPI.Crypto.GetAlgorithms();
      console.info("Fetched Crypto Algorithms:", algorithms);
      return algorithms;
    } else {
      console.error("AgentAPI is not available.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching crypto algorithms:", error);
    return null;
  }
};

export const createCryptoKey = async ({ localName, keyPassword, accountPassword, keyId }) => {
  console.log(keyId)
  try {
    if (!keyPassword || !accountPassword || !keyId || !localName ) {
      throw new Error("Key or account password is missing.");
    }

    if (window.AgentAPI) {

      const namespace = "urn:nf:iot:e2e:1.0";
      
      const keyResult = await window.AgentAPI.Crypto.CreateKey(localName, namespace, keyId, keyPassword, accountPassword);
      console.info("Created Crypto Key:", keyResult);
      return { ...keyResult, keyId };
    } else {
      console.error("AgentAPI is not available.");
      return null;
    }
  } catch (error) {
    console.error("Error creating crypto key:", error);
    throw new Error(error.message || "Failed to create crypto key.");
  }
};

export const getPublicKey = async (keyId = null) => {
  try {
    if (window.AgentAPI) {
      return window.AgentAPI.Crypto.GetPublicKey(keyId)
    }
  } catch (error) {
    console.log("Error on getting Key", error)
  }
}