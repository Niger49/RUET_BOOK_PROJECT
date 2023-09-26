const db = require("../config/database.config");
const mult_upload = require("../config/multer_blog.config");


exports.login = (req, res) => {
  // res.clearCookie('userId', { path: '/' });
  res.render('login')
  /* clear all cookies
  Object.keys(req.cookies).forEach((cookie) => {
    res.clearCookie(cookie);
  });
  */
}

exports.loginPost = (req, res) => {
  const { email, pass } = req.body;
  db.query("SELECT * FROM `users` WHERE `email` = ?", [email], (err1, res1) => {
    if (!err1) {
      if (res1.length > 0) {
        if (res1[0].password == pass) {
          res.cookie('userId', res1[0].user_id, { path: '/' });
          res.cookie('login_status', 1, { path: '/' });
          res.redirect("/");
        } else {
          res.send('<script>alert("Invalid Password"); window.history.go(-1);</script>');
        }
      } else {
        res.send('<script>alert("No User With this Email"); window.history.go(-1);</script>');
      }
    } else {
      res.send(err1);
    }
  });
};


exports.logout = (req, res) => {
  // res.clearCookie('userId', { path: '/' }); clear all cookies
  Object.keys(req.cookies).forEach((cookie) => {
    res.clearCookie(cookie);
  });
  res.redirect("/login")
}
