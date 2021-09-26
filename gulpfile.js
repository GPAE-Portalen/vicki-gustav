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
    gulp.src("./content/json/**/*.json", { read: false })
        .pipe(clean())

    gulp.src("./src/data/**/*.json", { read: false })
        .pipe(clean())
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

// Create empty JSON data if it doesnt exist in MD
gulp.task('createLeftoverJson', async () => {
    function getJsonDataFilePath(dataJsonFileName) {
        return `./src/data/${dataJsonFileName}.json`;
    }

    function createJsonData(dataJsonFileName) {
        fs.writeFileSync(getJsonDataFilePath(dataJsonFileName), JSON.stringify({}))
    }

    const dataJsonFileNames = [
        'blog',
        'recipes'
    ];

    dataJsonFileNames.forEach(dataJsonFileName => {
        if(!fs.existsSync(getJsonDataFilePath(dataJsonFileName))) {
            createJsonData(dataJsonFileName);
        }
    });
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