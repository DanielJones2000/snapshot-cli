const {src, task, dest} = require('gulp')
const uglify = require('gulp-uglify')
const del = require('del')
const babel = require('gulp-babel')

task('default', () => {
    const glupTask = src(['src/**/*.js','!src/template/*.js'])
    const copy = src(['src/template/*.js'])
    return del(['bin']).then(()=> {
        glupTask.pipe(babel({
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                 }))
                 .on('error',err => {
                    console.log(err)
                })
                .pipe(uglify())
                .pipe(dest('bin'))
        copy.pipe(dest('bin/template'))
    })
})