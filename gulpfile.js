let cssmin = require('gulp-cssmin')
let gulp = require('gulp')
let htmlmin = require('gulp-htmlmin')
let babel = require('gulp-babel')
let uglify = require('gulp-uglify')
let gulpclean = require('gulp-clean')
    // let webserver = require('gulp-webserver')

// css
function css() {
    return gulp
        .src('./css/**.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
}

// html
function html() {
    return gulp
        .src('./html/**')
        .pipe(htmlmin({
            collapseWhitespace: true, // 表示去除空格
            removeEmptyAttributes: true, // 移出空的属性
            minifyCSS: true, // 压缩 style 标签
            minifyJS: true, // 压缩 script 标签
        }))
        .pipe(gulp.dest('./dist/html'))
}

//js
function js() {
    return gulp
        .src('./js/**')
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}


function font() {
    return gulp
        .src('./font/**')
        .pipe(gulp.dest('./dist/font'))
}

function api() {
    return gulp
        .src('./api/**')
        .pipe(gulp.dest('./dist/api'))
}

function img() {
    return gulp
        .src('./img/**')
        .pipe(gulp.dest('./dist/img'))
}


// 清除缓存
function clean() {
    return gulp
        .src(['./dist/**'])
        .pipe(gulpclean())
}

// 打开服务器

// function serve() {
//     return gulp
//         .src('./dist')
//         .pipe(webserver({
//             host: 'localhost', // 域名
//             port: 3000, // 监听的端口号，统一写 3000
//             open: './html/index.html', // 打开的页面，相对于 dist 文件夹来的目录
//             livereload: true, // 浏览器自动刷新
//         }))
// }



exports.css = css
exports.html = html
exports.js = js
exports.font = font
exports.api = api
exports.img = img
exports.clean = clean
    // exports.serve = serve

exports.build = gulp.series(clean, gulp.parallel(css, js, html, font, api, img));