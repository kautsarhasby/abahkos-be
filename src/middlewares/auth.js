async function isAdmin(req, res, next) {
  next();
}

export const AuthMiddleWare = {
  isAdmin,
};
