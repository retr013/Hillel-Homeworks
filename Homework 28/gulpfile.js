const {src, dest, series, parallel} = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');

function cleanDist() {
    return src('./dist', {read: false, allowEmpty: true}).pipe(clean())
}

function copyJs() {
    return src('./src/scripts/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(dest('./dist'))
}

function copyVendorJs() {
    return src('./node_modules/jquery/dist/jquery.min.js').pipe(concat('vendor.js')).pipe(uglify()).pipe(dest('./dist'))
}

function copyHtml() {
    return src('./src/index.html')
        .pipe(dest('./dist'));
}

function copyCss() {
    return src('./src/styles/main.css')
        .pipe(uglifycss())
        .pipe(dest('./dist'));
}

function watchFiles() {
    return watch([
        './src/**/*.js',
        './src/**/*.css',
        './src/**/*.html',
    ], { ignoreInitial: false })
        .pipe(() => copyJs());
}

module.exports = {
    build: series(cleanDist, parallel(copyHtml, copyJs, copyVendorJs, copyCss)),
    serve: series(cleanDist, parallel(copyHtml, copyJs, copyVendorJs, copyCss), watchFiles),
}
