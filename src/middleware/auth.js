const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const User = require("../models/user");
const CustomErrorHandler = require("../helper/CustomErrorHandler");

const auth = async (req, res, next) => {
  try {
    // get token from header
    let authHeader = req.headers.authorization;
    if (!authHeader) throw CustomErrorHandler.unAuthorized();

    const token = authHeader.split(" ")[1];

    //verify token
    const verifyuser = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: verifyuser._id });
    if (!user) if (!authHeader) throw CustomErrorHandler.unAuthorized();

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const authorizationCheck = (predicate) => async (req, res, next) => {
  console.log(
    "predicate(req)=================================",
    predicate(req)
  );

  if (!predicate(req))
    return res.send({
      status: 403,
      message: "You don't have permission to perform this action!",
    });

  next();
};

const isAdmin = (req) =>
  req.user && (req.user.role === "admin" || req.user.role === "root");
const allowAdmin = authorizationCheck(isAdmin);

const isRoot = (req) => req.user && req.user.role === "root";
const allowRoot = authorizationCheck(isRoot);

const isSelf = (req) =>
  (req.params.id && req.params.id === req.user._id.toString()) ||
  (req.query && req.query.userId === req.user._id.toString());
const allowSelf = authorizationCheck(isSelf);

const allowAdminOrSelf = authorizationCheck(
  (req) => isAdmin(req) || isSelf(req)
);

module.exports = { auth, allowAdmin, allowRoot, allowSelf, allowAdminOrSelf };
