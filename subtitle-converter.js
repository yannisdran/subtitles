var srt2vtt     = require('srt-to-vtt');
var fs          = require('fs');
var path        = require('path');
var argv        = require('minimist')(process.argv.slice(2));
var glob        = require('glob');
var chalk       = require('chalk');
var mkdirp      = require('mkdirp');
var errCount = 0,
    msg = function (message, type) {
      if (!type) {
        type = 'error';
      }
      var isError = type === 'error',
          headerColor = isError || type === 'failure' ?
              'bgRed' : 'bgGreen',
          header = chalk[headerColor].bold(type.toUpperCase());
      console.log(header + chalk.white.bold('\t' + message));
      if (isError) {
        errCount += 1;
      }
    };

glob(argv['i'] || '**/*.srt', {}, function (err, files) {
  if (err) {
    msg(err.message);
  } else if (!files.length) {
    msg('The path provided did not match any files.');
  } else {
    files.forEach(function (filePath) {
      var filePathNorm = path.normalize(filePath),
          fileName = path.basename(filePathNorm, path.extname(filePathNorm)) + '.vtt',
          filePathDir = path.dirname(filePathNorm),
          usePath;
      if (argv['o']) {
        // Keep relative paths when --o given
        usePath = path.resolve(argv['o'], path.relative(process.cwd(), filePathDir));
      } else {
        usePath = path.resolve(filePathDir);
      }
      var nextFile = usePath + path.sep + fileName;
      mkdirp(usePath, function (err2) {
        var writer;
        if (err2) {
          msg(err2.message)
        } else {
          writer = fs.createWriteStream(nextFile);

          fs.createReadStream(filePathNorm)
            .pipe(srt2vtt())
            .pipe(writer);

          writer.on('finish', function() {
            msg(nextFile, 'write');
          });

          writer.on('error', function(e) {
            msg(e.message);
          });
        }
      });
    });
  }
});

process.on('exit', function () {
  if (errCount > 0) {
    msg('Encountered ' + errCount + ' error' + (errCount !== 1 ? 's' : '') + '.', 'failure');
  } else {
    msg('Finished without error.', 'success');
  }
});
