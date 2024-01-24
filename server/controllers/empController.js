const mysql = require("mysql");

//db configs
const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.view = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    connection.query("SELECT * FROM emp", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }
    });
  });
};

exports.addUser = (req, res) => {
  res.render("addUser");
};

exports.save = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const { Name, Mobile } = req.body;

    connection.query(
      "insert into emp (Name,Mobile) values (?,?) ",
      [Name, Mobile],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("addUser", { msg: "Uploaded" });
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.editUser = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;
    const id = req.params.id;

    connection.query("SELECT * FROM emp where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render("editUser", { rows });
      } else {
        console.log(err);
      }
    });
  });
};

exports.edit = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const id = req.params.id;
    const { Name, Mobile } = req.body;

    connection.query(
      "update emp set Name=?,Mobile=? where ID=? ",
      [Name, Mobile, id],
      (err, rows) => {
        connection.release();
        if (!err) {
          con.getConnection((err, connection) => {
            if (err) throw err;
            const id = req.params.id;

            connection.query(
              "SELECT * FROM emp where id=?",
              [id],
              (err, rows) => {
                connection.release();
                if (!err) {
                  res.render("editUser", { rows, msg: "Changed" });
                } else {
                  console.log(err);
                }
              }
            );
          });
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.delete = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const id = req.params.id;

    connection.query("delete from emp where id=? ", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.redirect("/");
      } else {
        console.log(err);
      }
    });
  });
};
