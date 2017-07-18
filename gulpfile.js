var gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    slim = require("gulp-slim");

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        slim: 'src/**/*.slim', //Синтаксис src/*.slim говорит gulp что мы хотим взять все файлы с расширением .slim
        js: 'src/js/app.js',//В стилях и скриптах нам понадобятся только main файлы
        css: 'src/css/app.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        slim: 'src/**/*.slim',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.*',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "gazprom"
};

gulp.task('webserver', function () {
    browserSync(config);
});

// просто будет удаляться папка build
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});



gulp.task('compile-css', function () {
    gulp.src(path.src.css) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(autoprefixer({browsers: ['last 2 versions']})) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});

gulp.task('compile-js', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('compile-html', function () {
    gulp.src(path.src.slim)
        .pipe(slim({
            pretty: true,
            options: "encoding='utf-8'"
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});



// Со шрифтами мне обычно не нужно проводить никаких манипуляций, но что бы не рушить парадигму
// «Работаем в src/ и собираем в build/» — я просто копирую файлы из src/fonts и вставляю в build/fonts.
gulp.task('compile-fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// в целом пока аналогично с картинками
gulp.task('compile-img', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('compile-all', [
    'compile-css',
    'compile-js',
    'compile-html',
    'compile-img',
    'compile-fonts'
]);



gulp.task('watch-all', function(){
    watch([path.watch.slim], function(event, cb) {
        gulp.start('compile-html');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('compile-css');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('compile-js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('compile-img');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('compile-fonts');
    });
});

gulp.task('default', ['compile-all', 'webserver', 'watch-all']);
