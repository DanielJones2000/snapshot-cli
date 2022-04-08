const {src, task, dest} = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const del = require('del')

task('default', () => {
    const glupTask = src('src/index.js')
    return del(['bin']).then(()=> {
        glupTask.pipe(concat('main.js'))
                .pipe(uglify())
                .pipe(dest('bin'))
    })
})