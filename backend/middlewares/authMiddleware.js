const protect = async (req, res, next) => {
    console.log("Protect middleware");

    next();
}

module.exports = protect;