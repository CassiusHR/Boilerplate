const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const minify      = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
  browserSync.init({
      server: {
          baseDir: "./app/",
          ws: true
          //directory: true
      },
  });

  gulp.watch("./resources/css/**/*.scss", ['sass']);
  gulp.watch("./resources/js/app.js", ['js']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
  gulp.watch("./resources/css/**/*.scss").on('change', browserSync.reload);
  gulp.watch("app/assets/css/*.css").on('change', browserSync.reload);
});

gulp.task('sass',function () {
  return gulp.src('./resources/css/app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./app/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src('./resources/js/app.js')
    .pipe(minify({
      ext:{
        min: '.min.js'
      },
      noSource: ['.js'],
        ignoreFile: ['.min.js', '-min.js']
    }))
    .pipe(gulp.dest('./app/assets/js'))
    .pipe(browserSync.stream());
});
