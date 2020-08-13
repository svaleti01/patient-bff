const axios = require('axios');

const baseUrl =  process.env.PATIENT_URL;

const getClaims = () => {
  return apiGetCall();
};

const addClaims = (claims) => {
  return apiPostCall(claims);
};

const apiGetCall = async() => {
  try {
    const resp = await axios.get( baseUrl + '/getUserHistory?username=user1');
    return resp.data;
  } catch(error) {
    console.log(error);
  }
}

const apiPostCall = async(claims) => {
  try {
    const resp = await axios.post( baseUrl + '/claimsRequest', claims)
    return resp.data
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  getClaims,
  addClaims
};
