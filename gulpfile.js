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

  gulp.watch("./resource/css/**/*.scss", ['sass']);
  gulp.watch("./resource/js/app.js", ['js']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
  gulp.watch("app/assets/css/*.css").on('change', browserSync.reload);
});

gulp.task('sass',function () {
  return gulp.src('./resource/css/app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./app/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src('./resource/js/app.js')
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
