import httpStatus from "http-status";

//INFO: HOW TO CREATE GLOBAL ERROR HANDLER, IT HAS ERR PARAMETER TOO.
const globalErrorHandler = () => (err,req,res,next) => {
    const error = new Error();
    error.status = err.status || 500;
    error.message = err.message || `Something went wrong`;
    error.success = false;
    return res.status(error.status).send(error);
};

export default globalErrorHandler;