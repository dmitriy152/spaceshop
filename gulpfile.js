
const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps=require('gulp-sourcemaps')
const concat=require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');
var postcss = require('gulp-postcss');
var pxtoviewport = require('postcss-px-to-viewport-8-plugin');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify-es').default;

gulp.task('mobile', function () {
  gulp.series('less',)
  var processors = [
      pxtoviewport({
          viewportWidth: 320,
          viewportUnit: 'vw',
          unitPrecision: 2,
      })
  ];

  return gulp.src(['less/mobile_320px/*.less', '!less/mobile_320px/main.less'])
      .pipe(less())
      .pipe(postcss(processors))
      .pipe(concat("style.mobile.min.less"))
      .pipe(gulp.dest('less'));
});
gulp.task('tablet', function () {
  gulp.series('less',)
  var processors = [
      pxtoviewport({
          viewportWidth: 768,
          viewportUnit: 'vw',
          unitPrecision: 2,
      })
  ];

  return gulp.src(['less/tablet_768px/*.less', '!less/tablet_768px/main.less'])
      .pipe(less())
      .pipe(postcss(processors))
      .pipe(concat("style.tablet.min.less"))
      .pipe(gulp.dest('less'));
});
gulp.task('desktope', function () {
  gulp.series('less',)
  var processors = [
      pxtoviewport({
          viewportWidth: 1000,
          viewportUnit: 'vw',
          unitPrecision: 5,
      })
  ];

  return gulp.src(['less/desktope_1512px/*.less', '!less/desktope_1512px/main.less'])
      .pipe(less())
      .pipe(postcss(processors))
      .pipe(concat("style.desktope.min.less"))
      .pipe(gulp.dest('less'));
});

gulp.task('less', function () {
  return gulp.src(`less/style.less`)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      overrideBrowserslist:  ['last 2 versions'],
      cascade: false
  }))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'));
});
gulp.task("uglify", function () {
	return gulp.src("index.js")
		.pipe(rename("index.min.js"))
		.pipe(uglify(/* options */))
		.pipe(gulp.dest("js"));
});
gulp.task('images', function() {
  return gulp.src("img/**")
      .pipe(newer("img_min"))
      .pipe(imagemin())
      .pipe(gulp.dest("img_min"));
 
});
gulp.task('webp', () =>
    gulp.src('img/**')
    .pipe(newer("img_webp"))
    .pipe(webp())
    .pipe(gulp.dest('img_webp'))
);  
gulp.task('watch', function () {
  gulp.watch('less/mobile_320px/*.less', gulp.series('mobile',));
  gulp.watch('less/tablet_768px/*.less', gulp.series('tablet',));
  gulp.watch('less/desktope_1512px/*.less', gulp.series('desktope',));
  gulp.watch('less/*.less', gulp.series('less',));
  gulp.watch('index.js', gulp.series('uglify',));
  gulp.watch("img/**", gulp.parallel('images'));
  gulp.watch("img/**", gulp.parallel('webp'));
});

gulp.task('default', gulp.series('mobile','tablet', 'desktope', 'less', ['images'], 'webp', 'watch'));

