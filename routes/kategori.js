var express = require('express');
var router = express.Router();

var connection = require('../config/database.js');

router.get('/', function(req, res, next){
    connection.query('select * from kategori order by id_kategori desc', function(err, rows){
        if(err) {
            req.flash('error', err);
        }else{
            res.render('kategori/index', {
                data: rows            });
        }
    });
});

router.get("/create", function (req, res, next) {
    res.render("kategori/create", {
      nama_kategori: "",
    });
  });
  
  router.post("/store", function (req, res, next) {
    try {
      let { nama_kategori } = req.body;
      let Data = {
        nama_kategori,
      };
      connection.query(
        "insert into kategori set ?",
        Data,
        function (err, result) {
          if (err) {
            req.flash("error", "Gagal menyimpan data!");
          } else {
            req.flash("success", "Berhasil menyimpan data!");
          }
          res.redirect("/kategori");
        }
      );
    } catch {
      req.flash("error", "Terjadi kesalahan pada fungsi");
      res.redirect("/kategori");
    }
  });

module.exports = router;