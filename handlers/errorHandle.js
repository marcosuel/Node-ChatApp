



exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: "Internal server error"
    });
};


exports.notFound = (req, res, next) => {
    res.status(404).json({
        message: "Route not found"
    });
};