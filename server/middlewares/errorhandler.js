class ErrorHandler extends Error {
   constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
   }
}
export const handleError = (err, req, res, next) => {
   let statusCode = err.statusCode || 500;
   let message = err.message || "Internal Server Error";

   return res.status(statusCode).json({
      success: false,
      message: message,
   });
};

export default ErrorHandler;
