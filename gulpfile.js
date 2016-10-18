// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var sourcePath = './src'; // dossier de travail
var destinationPath = './dist'; // dossier de prod
var bower = './bower_components'; // dossier bower

// Tâche Initialisation Bower
gulp.task('bower', function () {
  return plugins.bower({
    cmd: 'update'
  });
});

// Tâche CSS (compilation, réorganisation)
gulp.task('css', function () {
  return gulp.src(sourcePath + '/assets/sass/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.sourcemaps.write('./maps'))
    //.pipe(plugins.csscomb())
    //.pipe(plugins.cssbeautify({
    //  indent: '  '
    // }))
    .pipe(gulp.dest(destinationPath + '/assets/css/'))
//    .on('end', function () {
//      plugins.util.log(plugins.util.colors.bgGreen.white.bold('♠ Fichiers SCSS compilé avec succès ' + plugins.util.colors.bgGreen.red.bold('(ou pas)') + ' ♠'));
//    })
  ;
});

gulp.task('default', function() {
  // place code for your default task here
});