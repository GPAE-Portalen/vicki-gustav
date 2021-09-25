const gulp = require('gulp');
const clean = require('gulp-clean');
const markdownToJSON = require('gulp-markdown-to-json');
const marked = require('marked');
const jsoncombine = require('gulp-jsoncombine');
const beautify = require('gulp-jsbeautifier');
const fs = require('fs');
const del = require('del');

// Clean JSON data
gulp.task('cleanJson', async () => {
    function createJsonData(dataJsonFileName) {
        fs.writeFileSync(`./src/data/${dataJsonFileName}.json`, JSON.stringify({}))
    }

    gulp.src("./content/json/**/*.json", { read: false })
        .pipe(clean())

    gulp.src("./src/data/**/*.json", { read: false })
        .pipe(clean())

    createJsonData('blog');
    createJsonData('recipes');
});

// Generate JSON data from markdown
marked.setOptions({
    pedantic: true,
    smartypants: true
});
gulp.task('generateJson', async () => {
    gulp.src('./content/markdown/**/*.md')
        .pipe(markdownToJSON(marked))
        .pipe(beautify())
        .pipe(gulp.dest('./content/json'))
});

// Combine JSON data
gulp.task('combineJson', async () => {
    function combine(contentJsonDirName, dataJsonFileName) {
        const jsonContentSrc = `./content/json/${contentJsonDirName}/*.json`;
        const dataJsonFile = `${dataJsonFileName}.json`;
        const dataPath = './src/data';

        gulp.src(jsonContentSrc)
            .pipe(jsoncombine(dataJsonFile, function (data, meta) {
                return new Buffer.from(JSON.stringify(data));
            }))
            .pipe(beautify())
            .pipe(gulp.dest(dataPath));
    }

    function handleSingularFile(dataJsonFileName) {
        const jsonFile = `${dataJsonFileName}.json`;
        const jsonContentSrc = `./content/json/${jsonFile}`;
        const dataPath = './src/data';

        gulp.src(jsonContentSrc)
            .pipe(beautify())
            .pipe(gulp.dest(dataPath));
    }

    combine('blog', 'blog');
    combine('recipes', 'recipes');
});

// Clean JSON data
gulp.task('cleanImages', async () => {
    return del('./public/assets/img', {force:true});
});

// Copy images from assets folder to public folder
gulp.task('copyImages', async () => {
    gulp.src('./assets/**/*')
        .pipe(gulp.dest('./public/assets'))
});