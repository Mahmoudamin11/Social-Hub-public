export const BASE_URL = `http://localhost:8800/api`;

export const API = {
  /* ======= Authentication ======= */
  signup: `${BASE_URL}/auth/signup`,
  signin: `${BASE_URL}/auth/signin`,




  /* ======= User ======= */
  showUsers: `${BASE_URL}/user/show`,
  createUser: `${BASE_URL}/user/create`,
  getUser: `${BASE_URL}/user/showbyid`,
  updateUser: `${BASE_URL}/user/update`,
  deleteUser: `${BASE_URL}/user/delete`,
  /* ======= Product ======= */
  showProducts: `${BASE_URL}/product/show`,
  createProduct: `${BASE_URL}/product/create`,
  getProduct: `${BASE_URL}/product/showbyid`,
  updateProduct: `${BASE_URL}/product/update`,
  deleteProduct: `${BASE_URL}/product/delete`,
  /* ======= Category ======= */
  getAllCategories: `${BASE_URL}/category/`,
  addCategory: `${BASE_URL}/category/`,
  updateCategory: `${BASE_URL}/category/`,
  deleteCategory: `${BASE_URL}/category/`,
  getSpecificCategory: `${BASE_URL}/category/`,
  /* ======= subcategory ======= */
  getAllSubcategories: `${BASE_URL}/subcategory/`,
  addSubcategory: `${BASE_URL}/subcategory/`,
  updateSubcategory: `${BASE_URL}/subcategory/`,
  deleteSubcategory: `${BASE_URL}/subcategory/`,
  getSpecificSubcategory: (subcategoryId) => `${BASE_URL}/subcategory/${subcategoryId}`,
  getAllSubcategoriesForSpecificCategory: (categoryId) =>  `${BASE_URL}/category/${categoryId}/subcategories/`,
  /* ======= Orders ======= */
  showOrders: `${BASE_URL}/order/show`,
  createOrder: `${BASE_URL}/order/create`,
  getOrder: `${BASE_URL}/order/showbyid`,
  updateOrder: `${BASE_URL}/order/update`,
  deleteOrder: `${BASE_URL}/order/delete`,

};
