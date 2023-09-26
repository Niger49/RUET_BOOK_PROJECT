const db = require("../config/database.config");
const multer = require("multer");
const mult_upload = require("../config/multer_user.config");

exports.profile =  (req, res) => {
  var isLogged = (req.cookies.login_status ? req.cookies.login_status : 0)
  var userId = (req.cookies.userId ? req.cookies.userId : 0)
  console.log(isLogged, userId)
  if (isLogged) {
      db.query("SELECT * FROM `users` WHERE `users`.`user_id` = ?", [userId] , (err1, res1)=>{
      if (!err1) {
        db.query("SELECT * FROM `blogs` WHERE `user_id` = ?", [userId], (err2, res2)=>{
            if (!err2) {
                res.render("profile", { userInfo: res1[0], isLogged, blogs : res2 });
            } else {
                res.send(err2)
            }
        })
      } else {
        res.send(err1)
      }
    })
  } else {
    res.redirect("/login")
  }
};

exports.editPic =  (req, res) => {
    const upload = mult_upload.single("user_img");
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.send(err);
        } else if (err) {
            res.send(err);
        }
        if (!req.file) {
            res.cookie("img_message", "No picture uploaded", { maxAge: 1000 * 1 });
            res.redirect("back");
            return;
        }
        var pic_url = "http://localhost:3000/images/userImg/" + req.file.filename;
        var isLogged = (req.cookies.login_status ? req.cookies.login_status : 0)
        var userId = (req.cookies.userId ? req.cookies.userId : 0)
        if (isLogged) {
            db.query("UPDATE `users` SET `user_image` = ? WHERE `users`.`user_id` = ?",
                [pic_url, userId], (err1, res1)=>{
                res.redirect("back")
            })
        } else {
            res.redirect("/login")
        }
    });
}

exports.updateProfile =  (req, res) => {
    var isLogged = (req.cookies.login_status ? req.cookies.login_status : 0)
    var userId = (req.cookies.userId ? req.cookies.userId : 0)
    if (isLogged) {
        const { name } = req.body
        db.query("UPDATE `users` SET `user_name` = ? WHERE `users`.`user_id` = ?",
        [name, userId], (err1, res1)=>{
            if (!err1) {
                res.redirect("back")
            } else {
                res.send(err1)
            }
        })
    } else {
        res.redirect("/login")
    }
}