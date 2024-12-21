const AgentAPI = window.AgentAPI.Legal;

/**
 *
 * @param {String} CountryCode
 * @param {String} PNr
 * @returns {countrySupported: Boolean, isValid: Boolean,normalized: String}
 *
 */
export const validatePNr = async (CountryCode, PNr) => {
  try {
    return AgentAPI.ValidatePNr(CountryCode, PNr);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @returns {peerReview: Boolean,nrReviewers: Integer, nrPhotos: Integer,iso3166:Boolean,Required: String}
 */
export const getApplicationAttributes = async () => {
  try {
    return AgentAPI.GetApplicationAttributes();
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} LocalName
 * @param {String} Namespace
 * @param {String} KeyId
 * @param {String} KeyPassword
 * @param {String} AccountPassword
 * @param {String} Properties
 * @returns { Identity: String }
 */
export const applyId = async (
  LocalName,
  Namespace,
  KeyId,
  KeyPassword,
  AccountPassword,
  Properties
) => {
  try {
    return AgentAPI.ApplyId(
      LocalName,
      Namespace,
      KeyId,
      KeyPassword,
      AccountPassword,
      Properties
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} LocalName
 * @param {String} Namespace
 * @param {String} KeyId
 * @param {String} KeyPassword
 * @param {String} AccountPassword
 * @param {String} LegalId
 * @param {String} Attachment
 * @param {String} FileName
 * @param {String} ContentType
 * @returns { Identity: String }
 */
export const addIdAttachment = async (
  LocalName,
  Namespace,
  KeyId,
  KeyPassword,
  AccountPassword,
  LegalId,
  Attachment,
  FileName,
  ContentType
) => {
  try {
    return AgentAPI.AddIdAttachment(
      LocalName,
      Namespace,
      KeyId,
      KeyPassword,
      AccountPassword,
      LegalId,
      Attachment,
      FileName,
      ContentType
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @returns { legalId: String }
 */
export const readyForApproval = async (legalId) => {
  try {
    if(!legalId){
      throw new Error("Legal ID is required.")
    }
    return AgentAPI.ReadyForApproval(legalId);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @returns {Providers: { id: String, type: String,name: String, reviewerId: String,external: Boolean,iconUrl: String,iconWidth: Integer,iconHeight: Integer}} || {[]}
 */
export const getServiceProvidersForIdReview = async (legalId = null) => {
  try {
    return AgentAPI.GetServiceProvidersForIdReview(legalId);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} ServiceId
 * @param {String} ServiceProvider
 * @returns {}
 */
export const selectReviewService = async (ServiceId, ServiceProvider) => {
  try {
    return AgentAPI.SelectReviewService(ServiceId, ServiceProvider);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} LegalId
 * @param {String} RemoteId
 * @param {String} Authorized
 * @returns {}
 */
export const authorizeAccessToId = async (LegalId, RemoteId, Authorized) => {
  try {
    return AgentAPI.AuthorizeAccessToId(LegalId, RemoteId, Authorized);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} LocalName
 * @param {String} Namespace
 * @param {String} KeyId
 * @param {String} KeyPassword
 * @param {String} AccountPassword
 * @param {String} LegalId
 * @param {String} RemoteId
 * @param {String} PetitionId
 * @param {String} Purpose
 * @returns {}
 */
export const petitionPeerReview = async (
  LocalName,
  Namespace,
  KeyId,
  KeyPassword,
  AccountPassword,
  LegalId,
  RemoteId,
  PetitionId,
  Purpose
) => {
  try {
    return AgentAPI.PetitionPeerReview(
      LocalName,
      Namespace,
      KeyId,
      KeyPassword,
      AccountPassword,
      LegalId,
      RemoteId,
      PetitionId,
      Purpose
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} LocalName
 * @param {String} Namespace
 * @param {String} KeyId
 * @param {String} KeyPassword
 * @param {String} AccountPassword
 * @param {String} LegalId
 * @param {String} RemoteId
 * @param {String} PetitionId
 * @param {String} Purpose
 * @returns {}
 */
export const petitionId = async (
  LocalName,
  Namespace,
  KeyId,
  KeyPassword,
  AccountPassword,
  LegalId,
  RemoteId,
  PetitionId,
  Purpose
) => {
  try {
    return AgentAPI.PetitionId(
      LocalName,
      Namespace,
      KeyId,
      KeyPassword,
      AccountPassword,
      LegalId,
      RemoteId,
      PetitionId,
      Purpose
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} LocalName
 * @param {String} Namespace
 * @param {String} KeyId
 * @param {String} KeyPassword
 * @param {String} AccountPassword
 * @param {String} LegalId
 * @param {String} RemoteId
 * @param {String} PetitionId
 * @param {String} Purpose
 * @param {String} ContentBase64
 * @returns {}
 */
export const petitionSignature = async (
  LocalName,
  Namespace,
  KeyId,
  KeyPassword,
  AccountPassword,
  LegalId,
  RemoteId,
  PetitionId,
  Purpose,
  ContentBase64
) => {
  try {
    return AgentAPI.PetitionSignature(
      LocalName,
      Namespace,
      KeyId,
      KeyPassword,
      AccountPassword,
      LegalId,
      RemoteId,
      PetitionId,
      Purpose,
      ContentBase64
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} TemplateId
 * @param {String} Visibility
 * @param {{role: String, legalId: Strgin}? []} Parts
 * @param {{name: String, value: String}? []} Parameters
 * @returns
 */
export const createContract = async (
  TemplateId,
  Visibility,
  Parts,
  Parameters
) => {
  try {
    return AgentAPI.CreateContract(TemplateId, Visibility, Parts, Parameters);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} LegalId
 * @returns {Identity: String}
 */
export const getIdentity = async (LegalId) => {
  try {
    return AgentAPI.GetIdentity(LegalId);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} ContractId
 * @returns {Contract: Object}
 */
export const getContract = async (ContractId) => {
  try {
    return AgentAPI.GetContract(ContractId);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} LocalName
 * @param {String} Namespace
 * @param {String} KeyId
 * @param {String} KeyPassword
 * @param {String} AccountPassword
 * @param {String} ContractId
 * @param {String} LegalId
 * @param {String} Role
 * @returns {Contract: Object}
 */
export const signContract = async (
  LocalName,
  Namespace,
  KeyId,
  KeyPassword,
  AccountPassword,
  ContractId,
  LegalId,
  Role
) => {
  try {
    return AgentAPI.SignContract(
      LocalName,
      Namespace,
      KeyId,
      KeyPassword,
      AccountPassword,
      ContractId,
      LegalId,
      Role
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} LocalName
 * @param {String} Namespace
 * @param {String} KeyId
 * @param {String} KeyPassword
 * @param {String} AccountPassword
 * @param {String} LegalId
 * @param {String} DataBase64
 * @returns {Signature: String}
 */
export const signData = async (
  LocalName,
  Namespace,
  KeyId,
  KeyPassword,
  AccountPassword,
  LegalId,
  DataBase64
) => {
  try {
    return AgentAPI.SignData(
      LocalName,
      Namespace,
      KeyId,
      KeyPassword,
      AccountPassword,
      LegalId,
      DataBase64
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {Integer} Offset
 * @param {Integer} MaxCount
 * @returns {Identities: Object? []}
 */
export const getIdentities = async (Offset, MaxCount) => {
  try {
    return AgentAPI.GetIdentities(Offset, MaxCount);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {Integer} Offset
 * @param {Integer} MaxCount
 * @returns {Contracts: Object? []}
 */
export const getCreatedContracts = async (Offset, MaxCount) => {
  try {
    return AgentAPI.GetCreatedContracts(Offset, MaxCount);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} ContractId
 * @param {String} RemoteId
 * @param {Boolean} Authorized
 * @returns
 */
export const authorizeAccessToContract = async (
  ContractId,
  RemoteId,
  Authorized
) => {
  try {
    return AgentAPI.AuthorizeAccessToContract(ContractId, RemoteId, Authorized);
  } catch (error) {
    console.error(error);
  }
};
