const db = require("../config/database.config");
const multer = require("multer");
const mult_upload = require("../config/multer_blog.config");

exports.blog = (req, res) => {
  var isLogged = (req.cookies.login_status ? req.cookies.login_status : 0)
  var userId = (req.cookies.userId ? req.cookies.userId : 0)
  const { id } = req.params
  db.query("SELECT * FROM `blogs` INNER JOIN `users` ON `blogs`.`user_id` = `users`.`user_id` WHERE `blogs`.`blog_id` = ?",
  [id],
  (err1, res1)=>{
    if (!err1) {
      db.query("SELECT * FROM `comments` INNER JOIN `users` ON `comments`.`user_id` = `users`.`user_id` WHERE `comments`.`blog_id` = ?", [id],
      (err2, res2)=>{
        if (!err2) {
          res.render('blog_details', { blog: res1[0], isLogged, comments: res2, userId })
        } else {
          res.send(err2)
        }
      })
    } else {
      res.send(err1)
    }
  })
}

exports.cmntPost = (req, res) => {
  const { blog_id } = req.params;
  const { comment } = req.body;
  const isLogged = req.cookies.login_status ? req.cookies.login_status : 0;
  const userId = req.cookies.userId ? req.cookies.userId : 0;
  if (isLogged) {
    const regex = /[a-zA-Z]/;     // for filtering empty comments
    if (regex.test(comment)) {
      db.query(
        "INSERT INTO `comments` (`cmnt_id`, `user_id`, `blog_id`, `comment`) VALUES (NULL, ?, ?, ?)",
        [userId, blog_id, comment],
        (err1, res1) => {
          if (!err1) {
            res.redirect("back");
          } else {
            res.send(err1);
          }
        }
      );
    } else {
      res.redirect("back");
    }
  } else {
    res.redirect("/login");
  }
};



exports.cmntDel = (req, res) => {
  const { cmnt_id, user_id } = req.params
  var isLogged = (req.cookies.login_status ? req.cookies.login_status : 0)
  var userId = (req.cookies.userId ? req.cookies.userId : 0)
  if (user_id == userId) {
    db.query("DELETE FROM comments WHERE `comments`.`cmnt_id` = ?", [cmnt_id],
    (err1, res1)=>{
      if (!err1) {
        res.redirect("back")
      } else {
        res.send(err1)
      }
    })
  } else {
    res.send('<script>alert("Hahahaaha !"); window.history.go(-1);</script>')
  }
}


exports.blogWrite = (req, res) => {
  var isLogged = (req.cookies.login_status ? req.cookies.login_status : 0)
  var userId = (req.cookies.userId ? req.cookies.userId : 0)
  if (isLogged) {
    res.render('blog_write', { isLogged })
  } else {
    res.redirect('/login')
  }
}


exports.blogWritePost = (req, res) => {
  const upload = mult_upload.single("image");
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
    var pic_url = "http://localhost:3000/images/blogImg/" + req.file.filename;
    const { title, blog_des } = req.body
    var isLogged = (req.cookies.login_status ? req.cookies.login_status : 0)
    var userId = (req.cookies.userId ? req.cookies.userId : 0)
    if (isLogged) {
      db.query("INSERT INTO `blogs` (`blog_id`, `user_id`, `content`, `blog_image`, `title`) VALUES (NULL, ?, ?, ?, ?)",
        [userId, blog_des, pic_url, title], (err1, res1)=>{
        if (!err1) {
          res.redirect("/")
        } else {
          res.send(err1)
        }
      })
    } else {
      res.redirect('/login')
    }
  });
}


exports.blogDel = (req, res) => {
  const { bloggerId, blogId } = req.params
  var isLogged = (req.cookies.login_status ? req.cookies.login_status : 0)
  var userId = (req.cookies.userId ? req.cookies.userId : 0)
  if (isLogged) {
    if (bloggerId == userId) {
      db.query("DELETE FROM blogs WHERE`blogs`.`blog_id` = ?",
        [blogId], (err1, res1)=>{
          if (!err1) {
            res.redirect("/")
          } else {
            res.send(err1)
          }
        })
    }
  } else {
    res.redirect('/login')
  }
}


exports.editBlog = (req, res) => {
  const { blog_id } = req.params
  var isLogged = (req.cookies.login_status ? req.cookies.login_status : 0)
  var userId = (req.cookies.userId ? req.cookies.userId : 0)
  if (isLogged) {
    db.query("SELECT * FROM `blogs` WHERE `blog_id` = ?",
    [blog_id], (err1, res1)=>{
      if (!err1) {
        res.render('editBlog', {isLogged, blogInfo : res1[0]})
      } else {
        res.send(err1)
      }
    })
  } else {
    res.redirect('/login')
  }
}

exports.updateBlog = (req, res) => {
  const upload = mult_upload.single("image");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.send(err);
    } else if (err) {
      res.send(err);
    }

    const { blog_id } = req.params;
    const { title, blog_des } = req.body;
    const isLogged = req.cookies.login_status ? req.cookies.login_status : 0;
    const userId = req.cookies.userId ? req.cookies.userId : 0;

    if (!isLogged) {
      res.redirect('/login');
      return;
    }

    if (req.file) {
      const pic_url = "http://localhost:3000/images/blogImg/" + req.file.filename;
      db.query("UPDATE `blogs` SET `content` = ?, `blog_image` = ?, `title` = ? WHERE `blogs`.`blog_id` = ?",
        [blog_des, pic_url, title, blog_id], (err1, res1) => {
          if (!err1) {
            res.redirect("/");
          } else {
            res.send(err1);
          }
        });
    } else {
      db.query("UPDATE `blogs` SET `content` = ?, `title` = ? WHERE `blogs`.`blog_id` = ?",
        [blog_des, title, blog_id], (err1, res1) => {
          if (!err1) {
            res.redirect("/");
          } else {
            res.send(err1);
          }
        });
    }
  });
};
