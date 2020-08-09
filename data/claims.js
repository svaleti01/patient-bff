const axios = require('axios');

// const baseUrl =  process.env.PHARMACIST_URL;
const baseUrl = 'https://patient-arun205.sandbox-ocp43-one-176292-be5b1ee812fa4041cc73b6bbf969fc88-0000.eu-gb.containers.appdomain.cloud';

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
