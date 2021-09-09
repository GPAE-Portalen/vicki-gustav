const gulp = require('gulp');

const markdownToJSON = require('gulp-markdown-to-json');
const marked = require('marked');

const jsoncombine = require('gulp-jsoncombine');
const beautify = require('gulp-jsbeautifier');



// Markdown to JSON files
marked.setOptions({
    pedantic: true,
    smartypants: true
});
gulp.task('markdown', async () => {
    gulp.src('./content/markdown/**/*.md')
        .pipe(markdownToJSON(marked))
        .pipe(gulp.dest('./content/json'))
});



// Combine JSON files
gulp.task('blogPosts', async () => {
    gulp.src("./content/json/blog/*.json")
        .pipe(jsoncombine("blog.json", function (data, meta) {
            return new Buffer(JSON.stringify(data));
        }))
        .pipe(beautify())
        .pipe(gulp.dest("./src/data"));
});


// Moves images to public folder
gulp.task('images', async () => {
    gulp.src('./assets/**/*')
        .pipe(gulp.dest('./public/assets'))
});