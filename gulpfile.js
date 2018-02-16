const gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var autoprefixer=require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();


const dirs = {
    assets : './assets',
    node : './node_modules',
    dist : './dist'
};
const browserSyncOptions = {

    // For more options
    // @link http://www.browsersync.io/docs/options/

    notify : false,

    // Project URL.
    // proxy : "sites.dev",

    server : {
        baseDir : "./"
    },

    // `true` Automatically open the browser with BrowserSync live server.
    // `false` Stop the browser from automatically opening.
    open : true,

    // Inject CSS changes.
    // Commnet it to relo ad browser for every CSS change.
    injectChanges : true,

    // Use a specific port (instead of the one auto-detected by Browsersync).
    // port: 7000,

};
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
gulp.task('browserSync-reload', () => {
    browserSync.reload();
})
 
gulp.task('less', function () {
  return gulp.src('./assets/style/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./assets/style'));
});
gulp.task('browser-sync', () => browserSync.init(browserSyncOptions));


// npm run dev | yarn dev
gulp.task('dev', ['less', 'browser-sync'], () => {
    gulp.watch(`${dirs.assets}/js/**/*.js`, [browserSync.reload]); // Reload on JS file changes.
    gulp.watch('./assets/style/**/*.less', ['less', 'browserSync-reload']); // Reload on LeSS file changes.
    gulp.watch('*.html', [browserSync.reload]);
});