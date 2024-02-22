var express = require('express');
var router = express.Router();

var connection = require('../config/database.js');

router.get('/', function(req, res, next){
    connection.query('select * from kategori order by id_kategori desc', function(err, rows){
        if(err) {
            req.flash('error', err);
        }else{
            res.render('kategori/index', {
                data: roWS
            });
        }
    });
});

module.exports = router;