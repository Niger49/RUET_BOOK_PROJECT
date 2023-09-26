const db = require("../config/database.config");
const mult_upload = require("../config/multer_blog.config");

exports.register = (req, res) => {
  // Object.keys(req.cookies).forEach((cookie) => {
  //   res.clearCookie(cookie);
  // });
  res.render('register')
}

exports.registerPost = (req, res) => {
  const { name, email, pass } = req.body
  db.query("INSERT INTO `users` (`user_id`, `email`, `password`, `user_name`, `user_image`) VALUES (NULL, ?, ?, ?, NULL) ",
  [email, pass, name], (err1, res1)=>{
    if (!err1) {
      res.redirect("/login")
    } else {
      res.send(err1)
    }
  })
}