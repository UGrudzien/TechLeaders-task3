const gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var autoprefixer=require('gulp-autoprefixer');


gulp.task('hello', function(){
    console.log('Hello!');
})
gulp.task('default',['styles'], function(){
    gulp.watch('./assets/style/main.css', ['styles']);

})
gulp.task('styles', function(){
    gulp.src('./assets/style/main.css')
    .pipe(autoprefixer()).
    pipe(gulp.dest('build'));
})
 
gulp.task('less', function () {
  return gulp.src('./assets/style/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./assets/style'));
});

// npm run dev | yarn dev
gulp.task('dev', ['less'], () => {
    // gulp.watch(`${dirs.assets}/js/**/*.js`, [browserSync.reload]); // Reload on JS file changes.
    gulp.watch('./assets/style/**/*.less', ['less']); // Reload on SCSS file changes.
    // gulp.watch('*.html', [browserSync.reload]);
});