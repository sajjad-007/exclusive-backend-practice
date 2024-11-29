class errorResponse {
    constructor(statusCode,message,error,data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}

module.exports = {errorResponse}