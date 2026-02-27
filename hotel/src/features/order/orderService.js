// import axios from "axios";

// const API_URL = "http://localhost:8080/api/orders/";

// // Get token from localStorage
// const getToken = () => {
//   return localStorage.getItem("token");
// };

// // Create new order (USER)
// const createOrder = async (orderData) => {
//   const token = getToken();
//   const config = { 
//     headers: { 
//       Authorization: `Bearer ${token}` 
//     } 
//   };
//   const response = await axios.post(API_URL, orderData, config);
//   return response.data;
// };

// // Get user's orders (USER)
// const getMyOrders = async () => {
//   const token = getToken();
//   const config = { 
//     headers: { 
//       Authorization: `Bearer ${token}` 
//     } 
//   };
//   const response = await axios.get(`${API_URL}my`, config);
//   return response.data;
// };

// // Get all orders (ADMIN only)
// const getAllOrders = async () => {
//   const token = getToken();
//   const config = { 
//     headers: { 
//       Authorization: `Bearer ${token}` 
//     } 
//   };
//   const response = await axios.get(API_URL, config);
//   return response.data;
// };

// // Update order status (ADMIN only) - You can add this later if needed
// const updateOrderStatus = async (id, statusData, token) => {
//   const config = { 
//     headers: { 
//       Authorization: `Bearer ${token}` 
//     } 
//   };
//   const response = await axios.put(`${API_URL}${id}`, statusData, config);
//   return response.data;
// };

// // Delete order (ADMIN only) - You can add this later if needed
// const deleteOrder = async (id, token) => {
//   const config = { 
//     headers: { 
//       Authorization: `Bearer ${token}` 
//     } 
//   };
//   const response = await axios.delete(`${API_URL}${id}`, config);
//   return response.data;
// };

// const orderService = {
//   createOrder,
//   getMyOrders,
//   getAllOrders,
//   updateOrderStatus,
//   deleteOrder,
// };

// export default orderService;
import axios from "axios";

const API_URL = "http://localhost:8080/api/orders/";

// Get token
const getToken = () => {
  return localStorage.getItem("token");
};

// CREATE ORDER
const createOrder = async (orderData) => {
  const token = getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

// MY ORDERS
const getMyOrders = async () => {
  const token = getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}my`, config);
  return response.data;
};

// ALL ORDERS (ADMIN)
const getAllOrders = async () => {
  const token = getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// ✅ UPDATE ORDER STATUS
const updateOrderStatus = async (id, statusData) => {
  const token = getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}${id}`, statusData, config);
  return response.data;
};

// ✅ DELETE ORDER
const deleteOrder = async (id) => {
  const token = getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}${id}`, config);
  return response.data;
};

const orderService = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};

export default orderService;
