let gulp = require("gulp")
let stylus = require("gulp-stylus")
let uglify = require("gulp-uglify")
let gutil = require("gulp-util")
let rename = require("gulp-rename")
let buffer = require("vinyl-buffer")
let source = require("vinyl-source-stream")
let browserify = require("browserify")
let babelify = require("babelify")
let hbsfy = require("hbsfy")
let browserifyShim = require("browserify-shim")
let _ = require("underscore")


const browserifyOptions = {
  entries: "src/javascripts/main.js",
  transform: [hbsfy, babelify, browserifyShim],
}

function handleError(error) {
  gutil.log(error.stack)
  this.emit("end")
}

gulp.task("browserify", () => (
  browserify(_.extend({ debug: true }, browserifyOptions))
    .bundle()
    .on("error", handleError)
    .pipe(source("duelyst-previous-challenges.js"))
    .pipe(gulp.dest("build"))
))

gulp.task("browserify-dist", () => (
  browserify(browserifyOptions)
    .bundle()
    .on("error", handleError)
    .pipe(source("duelyst-previous-challenges.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("dist"))
))

gulp.task("stylus", () => (
  gulp.src("src/stylesheets/main.styl")
    .pipe(stylus())
    .pipe(rename("duelyst-previous-challenges.css"))
    .pipe(gulp.dest("build"))
))

gulp.task("stylus-dist", () => (
  gulp.src("src/stylesheets/main.styl")
    .pipe(stylus({ compress: true }))
    .pipe(rename("duelyst-previous-challenges.css"))
    .pipe(gulp.dest("dist"))
))

gulp.task("watch", () => {
  gulp.watch("src/javascripts/**/*", ["browserify"])
  gulp.watch("src/stylesheets/*", ["stylus"])
})

gulp.task("build-dist", ["browserify-dist", "stylus-dist"])
gulp.task("build", ["browserify", "stylus"])
gulp.task("default", ["watch"])
