var gulp = require('gulp');
var connect = require('gulp-connect');
var react = require('gulp-react');
var sass = require('gulp-sass');

gulp.task("connect", function () {
    connect.server({
        root: ['app', '.tmp'],
        livereload: true
    });
});

function handleError(error){
    console.log(error);
    this.emit('end');
}

gulp.task('html', function() {
    return gulp.src("app/*.html")
        .pipe(connect.reload());
});

gulp.task("jsx", function() {
    return gulp.src('scripts/*.jsx')
        .pipe(react())
        .on('error', handleError)
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(connect.reload());
});

gulp.task('sass', function() {
    return gulp.src("sass/*.scss")
        .pipe(sass())
        .on('error', handleError)
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(connect.reload());
});

gulp.task("watch", function(){
    gulp.watch(['app/*.html'], ['html']);
    gulp.watch(['scripts/*.jsx'], ['jsx']);
    gulp.watch(['sass/*.scss'], ['sass']);
});


gulp.task('default', ['connect', 'watch']);