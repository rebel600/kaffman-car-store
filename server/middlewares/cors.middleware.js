export const corsMiddleware = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(`[${timeStamp}] ${req.method} ${req.url}`);

  // Allow your frontend origin
  // res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_DEVELOPMENT_URL || process.env.FRONTEND_PRODUCTION_URL);
  
  // Allow specific methods
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Allow headers like Content-Type
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle the "Preflight" request
  // if (req.method === 'OPTIONS') {
  //   return res.sendStatus(200);
  // }
  
  next();
};
