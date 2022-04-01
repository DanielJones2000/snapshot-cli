import gulp from 'gulp'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import del from 'del'

const {src, task, dest} = gulp

task('default', () => {
    const glupTask = src('src/index.js')
    return del(['bin']).then(()=> {
        glupTask.pipe(concat('main.js'))
                .pipe(uglify())
                .pipe(dest('bin'))
    })
})