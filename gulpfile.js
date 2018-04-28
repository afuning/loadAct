var gulp = require('gulp'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename');

gulp.task('taskES6', function(){
    gulp.src('src/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('startWatch', function(){
    gulp.watch('src/*.js', ['taskES6']);
});