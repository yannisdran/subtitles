var srt2vtt     = require('srt-to-vtt');
var fs          = require('fs');
var path        = require('path');
var argv        = require('minimist')(process.argv.slice(2));
var glob        = require('glob');
var chalk       = require('chalk');

glob(argv['i'] || "**/*.srt", {}, function (err, files) {
  var msg = function (message, type) {
    if (!type) {
      type = 'error';
    }
    var headerColor = type === 'error' ? 'bgRed' : 'bgGreen',
        header = chalk[headerColor].bold(type.toUpperCase());
    console.log(header + chalk.white.bold('\t' + message));
  }, usePath;

  function processFile(filePath) {
  }

  if (err) {
    msg(err.message);
  } else if (!files.length) {
    msg('The path provided did not match any files.');
  } else {
    files.forEach(function (filePath) {
      var filePathNorm = path.normalize(filePath);
      var fileName = path.basename(filePathNorm) + '.vtt';
      var filePathDir = argv['o'] ? argv['o'] : path.dirname(filePathNorm);
      var usePath = path.resolve(filePathDir) + path.sep;
      var nextPath = usePath + fileName;
      var writer = fs.createWriteStream(nextPath);

      fs.createReadStream(filePathNorm)
        .pipe(srt2vtt())
        .pipe(writer);

      writer.on('finish', function() {
        msg(nextPath, 'write');
      });
    });
  }
});
