export const PageRoutes = {
  MAIN_PAGE: "/",
  EDIT_PAGE: "/editUser/:userId",
  NEW_USER_PAGE: "/editUser",
};
export const RedirectToRoutes = {
  EDIT_PAGE: (userId) => `/editUser/${userId}`,
};
