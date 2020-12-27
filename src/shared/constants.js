const CONSTANTS = {};

CONSTANTS.SECRETKEY_PATTERN =
'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9\\s]).{8,16}$';
CONSTANTS.JWT_TOKEN_EXPIRY = '2d';
CONSTANTS.JWT_TOKEN_PREFIX = 'Bearer';
CONSTANTS.JWT_HEADER_STRING = 'Authorization';

CONSTANTS.JWT_ISSUER = "Teknotrait";
CONSTANTS.JWT_SECRET_KEY = "aaaagyttddededed";
module.exports = CONSTANTS; 