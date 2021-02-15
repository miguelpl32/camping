module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "Debe iniciar sesión");
        return res.redirect("/login");
    }
    next();
};
