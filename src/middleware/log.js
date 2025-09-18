const logRequest = (req, res, next) => {
    console.log('log req ke path : ', req.path);
    next();
}

module.exports = logRequest;