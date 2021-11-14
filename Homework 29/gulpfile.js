const {src, dest, series, parallel} = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const browserSync = require('browser-sync').create();
const babel = require("gulp-babel");

const path = {
    src: '',
    dest: './dist'
}

function cleanDist() {
    return src(path.dest, {read: false, allowEmpty: true}).pipe(clean())
}

function copyJs() {
    return src('./src/scripts/**/*.js')
        .pipe(concat('app.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest(path.dest))
}

function copyVendorJs() {
    return src('./node_modules/jquery/dist/jquery.min.js').pipe(concat('vendor.js')).pipe(uglify()).pipe(dest(path.dest))
}

function copyHtml() {
    return src('./src/index.html')
        .pipe(dest(path.dest));
}

function copyCss() {
    return src('./src/styles/main.css')
        .pipe(uglifycss())
        .pipe(dest(path.dest));
}

function watchFiles(cb) {
    browserSync.init({
        server: {
            baseDir: 'path.dest'
        }
    });

    watch('./src/**/*.js', series(copyJs, reloadBrowser));
    watch('./src/**/*.css', series(copyCss, reloadBrowser));
    watch('./src/**/*.html', series(copyHtml, reloadBrowser));
    cb()
}

function reloadBrowser(done) {
    browserSync.reload();
    done()
}

function taskBuild() {
    return series(
        cleanDist,
        parallel(
            copyHtml,
            copyJs,
            copyVendorJs,
            copyCss
        )
    )
}

function taskServe() {
    return series(taskBuild(), watchFiles);
}

module.exports.build = taskBuild();
module.exports.serve = taskServe();
