// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var sourcePath = './src'; // dossier de travail
var destinationPath = './dist'; // dossier de prod
var bower = './bower_components'; // dossier bower
var flagError = false; // flag pour check erreurs

// Tâche Initialisation Bower
gulp.task('bower', function () {
  return plugins.bower({
    cmd: 'update'
  });
});

// Tâche CSS
gulp.task('css', function () {
  return gulp.src(sourcePath + '/assets/sass/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', function(error, result) {
      plugins.util.log(plugins.util.colors.bgRed.white('♠ Echec compilation des fichiers SCSS ♠'));
      plugins.util.log(error.message);
      this.emit('end');
      flagError = true;
    }))
    .pipe(plugins.autoprefixer({
      browsers: ['> .1%'] // En fonction des stats de caniuse.com // PS: Attention aux @keyframes
    }))
    .pipe(plugins.csso({
      debug: false // true pour vérifier s'il n'y a pas eu de pb lors du minify css
    }))
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest(destinationPath + '/assets/css/'))
    .on('end', function () {
      // à améliorer avec AppleScript pour les nofitications OS (voir équivalent windows)
      if (flagError) {
        plugins.util.log(plugins.util.colors.bgYellow.white('♠ Voir l\'erreur ci-dessous pour continuer le script ♠'));
        flagError = false;
      } else {
        plugins.util.log(plugins.util.colors.bgGreen.white('♠ Fichiers SCSS compilé avec succès ♠'));
      }
    });
});

// Tâche Watch (surveillance)
gulp.task('watch', function () {
  gulp.watch(sourcePath + '/assets/sass/*.scss', ['css']);
});

// Tâche par défaut
gulp.task('default', ['watch']);