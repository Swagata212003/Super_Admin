


// import HttpClientXml from "../utils/HttpClientXml";

// const getLoginProfile = async () => {
//   let endPoint = "get-profile";
//   return HttpClientXml.get(endPoint);
// };


// const getCities = async () => {
//   let endPoint = "city";
//   return HttpClientXml.get(endPoint);
// };

// const addCity = async (data) => {
//   let endPoint = "city";
//   return HttpClientXml.post(endPoint, data);
// };


// // const addCity = async (data) => {
// //   let endPoint = "city";
// //   return HttpClientXml.post(endPoint, data, {
// //       headers: { "Content-Type": "application/json" } // Ensure JSON format
// //   });
// // };


// const updateCity = async (id, data) => {
//   let endPoint = `city/${id}`;
//   return HttpClientXml.put(endPoint, data);
// };

// const deleteCity = async (id) => {
//   let endPoint = `city/${id}`;
//   return HttpClientXml.delete(endPoint);
// };

// const getSalesPipeline = async () => {
//   let endPoint = "leads";
//   return HttpClientXml.get(endPoint);
// };

// const addSalesPipeline = async (data) => {
//   let endPoint = "leads";
//   return HttpClientXml.post(endPoint, data);
// };

// const updateSalesPipeline = async (id, data) => {
//   let endPoint = `leads/${id}`;
//   return HttpClientXml.put(endPoint, data);
// };

// const deleteSalesPipeline = async (id) => {
//   let endPoint = `leads/${id}`;
//   return HttpClientXml.delete(endPoint);
// };

// export default {
//   getLoginProfile,
//   getCities,
//   addCity,        
//   deleteCity,      
//   getSalesPipeline,
//   addSalesPipeline,
//   updateSalesPipeline, 
//   deleteSalesPipeline,
// };


















// import HttpClientXml from "../utils/HttpClientXml";

// const getLoginProfile = async () => {
//   let endPoint = "get-profile";
//   return HttpClientXml.get(endPoint);
// };
// const getCities = async () => {
//   let endPoint = "city";
//   return HttpClientXml.get(endPoint);
// };
// const getSalesPipeline = async () => {
//   let endPoint = "leads";
//   return HttpClientXml.get(endPoint);
// };
// const addSalesPipeline = async (data) => {
//   let endPoint = "leads";
//   return HttpClientXml.post(endPoint, data);
// };
// const updatSalesPipeline = async (id, data) => {
//   let endPoint = `leads/${id}`;
//   return HttpClientXml.put(endPoint, data);
// };
// const deleteSalesPipeline = async (id, data) => {
//   let endPoint = `leads/${id}`;
//   return HttpClientXml.deletemethod(endPoint, data);
// };


// // Fetch Villages
// const getVillages = async () => {
//   let endPoint = "villages";
//   return HttpClientXml.get(endPoint);
// };

// // Add Village
// const addVillage = async (data) => {
//   let endPoint = "villages";
//   return HttpClientXml.post(endPoint, data);
// };

// // Upload Image (if needed separately)
// const uploadImage = async (file) => {
//   let endPoint = "image-upload";
//   let data = new FormData();
//   data.append("image", file);
//   return HttpClientXml.fileUplode(endPoint, "POST", data);
// };

// export default {
//   getLoginProfile,
//   getCities,
//   getSalesPipeline,
//   addSalesPipeline,
//   updatSalesPipeline,
//   deleteSalesPipeline,
// };



















import HttpClientXml from "../utils/HttpClientXml";

const getLoginProfile = async () => {
  let endPoint = "get-profile";
  return HttpClientXml.get(endPoint);
};

const getCities = async () => {
  let endPoint = "city";
  return HttpClientXml.get(endPoint);
};

// ✅ Fetch localities for a given city
const getLocalities = async (cityId) => {
  let endPoint = `localities?cityId=${cityId}`;
  return HttpClientXml.get(endPoint);
};

// ✅ Add a new locality
const addLocality = async (data) => {
  let endPoint = "localities";
  return HttpClientXml.post(endPoint, data);
};

// ✅ Update a locality
const updateLocality = async (id, data) => {
  let endPoint = `localities/${id}`;
  return HttpClientXml.put(endPoint, data);
};

// ✅ Delete a locality
const deleteLocality = async (id) => {
  let endPoint = `localities/${id}`;
  return HttpClientXml.deletemethod(endPoint);
};

// Fetch Sales Pipeline
const getSalesPipeline = async () => {
  let endPoint = "leads";
  return HttpClientXml.get(endPoint);
};

const addSalesPipeline = async (data) => {
  let endPoint = "leads";
  return HttpClientXml.post(endPoint, data);
};

const updatSalesPipeline = async (id, data) => {
  let endPoint = `leads/${id}`;
  return HttpClientXml.put(endPoint, data);
};

const deleteSalesPipeline = async (id, data) => {
  let endPoint = `leads/${id}`;
  return HttpClientXml.deletemethod(endPoint, data);
};

// Fetch Villages
const getVillages = async () => {
  let endPoint = "villages";
  return HttpClientXml.get(endPoint);
};

// Add Village
const addVillage = async (data) => {
  let endPoint = "villages";
  return HttpClientXml.post(endPoint, data);
};

// Upload Image (if needed separately)
const uploadImage = async (file) => {
  let endPoint = "image-upload";
  let data = new FormData();
  data.append("image", file);
  return HttpClientXml.fileUplode(endPoint, "POST", data);
};

export default {
  getLoginProfile,
  getCities,
  getLocalities, // ✅ New method added
  addLocality, // ✅ New method added
  updateLocality, // ✅ New method added
  deleteLocality, // ✅ New method added
  getSalesPipeline,
  addSalesPipeline,
  updatSalesPipeline,
  deleteSalesPipeline,
  getVillages,
  addVillage,
  uploadImage,
};
