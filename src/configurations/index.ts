export default () => ({
  port: +process.env.PORT,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_secret_refresh_key: process.env.JWT_SECRET_REFRESH_KEY,
  jwt_token_expire_time: process.env.TOKEN_EXPIRE_TIME,
});
