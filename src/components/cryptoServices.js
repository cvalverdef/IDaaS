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
  
  export const createCryptoKey = async ({ localName, size }) => {
    try {
      if (window.AgentAPI) {
        const accountInfo = await window.AgentAPI.Account.Info();
        const { userName } = accountInfo;
  
        const namespace = "urn:nf:iot:e2e:1.0";
        const id = `${userName}-${localName}-${namespace}`;
        const nonce = `${Date.now()}`;
  
        const keyPassword = "defaultKeyPassword"; // Replace with user input if available
        const accountPassword = "defaultAccountPassword"; // Replace with user input if available
  
        if (!keyPassword || !accountPassword) {
          throw new Error("Key or account password is missing.");
        }
  
        const s1 = `${userName}:${window.location.host}:${localName}:${namespace}:${id}`;
        const key1 = new TextEncoder().encode(keyPassword);
        const data1 = new TextEncoder().encode(s1);
  
        const h1 = await window.crypto.subtle.importKey(
          "raw",
          key1,
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"]
        );
        const signature1 = await window.crypto.subtle.sign("HMAC", h1, data1);
        const keySignature = btoa(String.fromCharCode(...new Uint8Array(signature1)));
  
        const s2 = `${s1}:${keySignature}:${nonce}`;
        const key2 = new TextEncoder().encode(accountPassword);
        const data2 = new TextEncoder().encode(s2);
  
        const h2 = await window.crypto.subtle.importKey(
          "raw",
          key2,
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"]
        );
        const signature2 = await window.crypto.subtle.sign("HMAC", h2, data2);
        const requestSignature = btoa(String.fromCharCode(...new Uint8Array(signature2)));
  
        const payload = {
          localName,
          namespace,
          id,
          nonce,
          keySignature,
          requestSignature,
        };
  
        const keyResult = await window.AgentAPI.Crypto.CreateKey(payload);
        console.info("Created Crypto Key:", keyResult);
        return keyResult;
      } else {
        console.error("AgentAPI is not available.");
        return null;
      }
    } catch (error) {
      console.error("Error creating crypto key:", error);
      throw new Error(error.message || "Failed to create crypto key.");
    }
  };
  