const messageList = {
    400: "bad request",
    401: "unauthorized",
    403: "forbidden",
    404: "not found",
    409: "conflict"
}


const HttpError = (status, message = messageList[status]) => {
    const error = new Error(message);
    error.status = status
    return error

}

export default HttpError