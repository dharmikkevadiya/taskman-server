const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/task-man";
const JWT_SECRET = process.env.JWT_SECRET || "hellojwt123";
const PORT = process.env.PORT || 5000;

module.exports = {
  MONGODB_URL,
  PORT,
  JWT_SECRET,
};
