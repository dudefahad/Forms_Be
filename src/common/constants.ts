
export const corsConfig = {
  origin: ['http://localhost:3000', 'https://gf-clone-c266a.web.app/'],
  allowedHeaders: [
    "Authorization",
    "X-Requested-With",
    "Content-Type",
    "x-auth-token",
  ],
  maxAge: 86400, // NOTICE: 1 day
  credentials: false
};

export const SOCKET_CHANNEL_NAMES = {
  USER_RESPONSE: 'USER_RESPONSE'
}