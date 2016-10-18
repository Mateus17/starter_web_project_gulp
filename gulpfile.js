// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = './src'; // dossier de travail
var destination = './dist'; // dossier de prod
var bower = './bower_components'; // dossier bower

// Tâche Initialisation Bower
gulp.task('bower', function () {
  return plugins.bower({
    cmd: 'update'
  });
});

gulp.task('default', function() {
  // place code for your default task here
});