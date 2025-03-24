import { reactLocalStorage } from 'reactjs-localstorage';
const BASE_URL = 'http://43.205.231.210:8157/api/v1/admin/';

const ALLOW_ORIGIN = '68.183.95.204:4002';
const USER_TYPE = 'Admin';

function get(endpoint, params) {
  return requestData(endpoint, params);
}

function post(endpoint, params) {
  return requestData(endpoint, params, 'POST');
}

function put(endpoint, params) {
  return requestData(endpoint, params, 'PUT');
}

function deletemethod(endpoint, params) {
  return requestData(endpoint, params, 'DELETE');
}

async function requestData(url, data = {}, method = 'GET') {
  let xhr = new XMLHttpRequest();
  xhr.open(method, BASE_URL + url);
  if (checkingAuth()) xhr.setRequestHeader('authorization', checkingAuth());
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  xhr.setRequestHeader('userType', USER_TYPE);

  return new Promise((resolve, reject) => {
    if (method == 'GET') {
      xhr.send();
    } else {
      xhr.send(JSON.stringify(data));
    }
    xhr.onload = () => {
      console.log(xhr.status);
      let response = JSON.parse(xhr.response);

      if (xhr.status === 200 || xhr.status === 400 || xhr.status === 403 || xhr.status === 500 || xhr.status === 406) {
        resolve(response);
      } else {
        reject(response);
      }
    };
  });
}


async function fileUplode(url, method, file, object_get = {}, tokenCustom = null) {
  let token = '';
  let user = reactLocalStorage.get('token');

  if (user && user != null && Object.keys(user).length > 0) {
    token = user;
  }
  // let bash_url = "http://13.127.101.102:5011/api/v1/";
  let apiUrl = BASE_URL + url;



  if (token != '') {
    var toooo = token;
  }
  //  console.log("tokenn",toooo);
  let headers = {
    // 'Accept': 'application/json',
    // "Content-Type": "multipart/form-data",
    // "Access-Control-Allow-Origin": "http://13.127.101.102:5008",
    authorization: toooo,
    userType: 'Admin',
    // 'Authorization': 'Bearer ' + login_status,
  };



  return await fetch(apiUrl, {
    method: method,
    body: file,
    redirect: 'follow',
    headers: headers,
  })
    .then(response => {
      console.log("responseee", response, headers);
      return response.json();
    })
    .then(
      result => {
        console.log('ResponIMG', result);
        return result;
      },
      error => {
        return error;
      }
    );
}

async function fileVideoUplode(url, method, file, object_get = {}, tokenCustom = null) {
  let token = '';
  let user = reactLocalStorage.get('token');
  // console.log("UserTok", user);
  if (user && user != null && Object.keys(user).length > 0) {
    token = user;
  }
  // let bash_url = "http://13.127.101.102:5011/api/v1/";
  let apiUrl = BASE_URL + url;
  // let data = new FormData();
  // data.append("image", file);
  // Object.keys(object_get).forEach(function (key) {
  //   let ddd = object_get[key];
  //   data.append(key, ddd);
  // });

  if (token != '') {
    var toooo = token;
  }
  //  console.log("tokenn",toooo);
  let headers = {
    // 'Accept': 'application/json',
    // "Content-Type": "multipart/form-data",
    // "Access-Control-Allow-Origin": "http://13.127.101.102:5008",
    authorization: toooo,
    userType: 'Admin',
    // 'Authorization': 'Bearer ' + login_status,
  };



  return await fetch(apiUrl, {
    method: method,
    body: file,
    redirect: 'follow',
    headers: headers,
  })
    .then(response => {
      // console.log("responseee", response, headers);
      return response.json();
    })
    .then(
      result => {
        console.log('ResponIMG', result);
        return result;
      },
      error => {
        return error;
      }
    );
}

function checkingAuth() {
  let token = reactLocalStorage.get('token');
  if (token) {
    return token;
  }
  return false;
}

export default {
  requestData,
  get,
  post,
  put,
  deletemethod,
  fileUplode,
  fileVideoUplode,
};










