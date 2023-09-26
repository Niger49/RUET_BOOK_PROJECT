const db = require("../config/database.config");
const mult_upload = require("../config/multer_blog.config");

exports.home = (req, res) => {
  var isLogged = (req.cookies.login_status ? req.cookies.login_status : 0)
  db.query("SELECT * FROM `blogs` INNER JOIN `users` ON `blogs`.`user_id` = `users`.`user_id`", (err1, res1)=>{
    if (!err1) {
      res.render('home', { blogs: res1, isLogged })
    } else {
      res.send(err1)
    }
  })
}