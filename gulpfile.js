const {src, task, dest} = require('gulp')
const uglify = require('gulp-uglify')
const del = require('del')
const babel = require('gulp-babel')

task('default', () => {
    const glupTask = src('src/**/*.js')
    return del(['bin']).then(()=> {
        glupTask.pipe(babel({
                    presets: ['@babel/preset-env'],
                 }))
                .pipe(uglify())
                .pipe(dest('bin'))
    })
})