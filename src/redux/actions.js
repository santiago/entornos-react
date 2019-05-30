import axios from 'axios';
const API_URL = 'http://localhost:8080/api';


function fetchDevices() {
  return function (dispatch) {
    const url = '/devices';

    axios
    .get(API_URL + url)
      .then(res => {
        dispatch({ type: 'SET_DEVICES', data: res.data });
      })
      .catch(e => console.log(e));
  };
}

function addDevice(name, description) {
  return function (dispatch) {
    const url = '/devices';
    axios
      .post(API_URL + url, { name, description })

      .then(() => {
        dispatch(fetchDevices());
      })
      .catch(e => console.log(e));
  };
}

function fetchEnvironms() {
  return function (dispatch) {
    const url = '/environs';
    axios
    .get(API_URL + url)

      .then(res => {
        dispatch({ type: 'SET_ENTORNOS', data: res.data });
      })
      .catch(e => console.log(e));
  };
}

function addEnvironm(name, description) {
  // console.log('description: ', description);
  // console.log('name: ', name);
  return function (dispatch) {
    const url = '/environs';
    axios
      .post(API_URL + url, { name, description })
      
      .then(() => {
        dispatch(fetchEnvironms());
      })
      .catch(e => console.log(e));
  };
}

function collapsed(collapsed) {
  return {
    type: 'COLLAPSED',
    data: collapsed
  };
}

export { collapsed, addDevice, fetchDevices, addEnvironm, fetchEnvironms };