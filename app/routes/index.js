
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html');
};

exports.watch = function(req, res){
  res.render('watch')
}
