let gulp = require("gulp")
let stylus = require("gulp-stylus")
let gutil = require("gulp-util")
let rename = require("gulp-rename")
let file = require("gulp-file")
let uglify = require("gulp-uglify")
let source = require("vinyl-source-stream")
let buffer = require("vinyl-buffer")
let browserify = require("browserify")
let babelify = require("babelify")
let jstify = require("jstify")
let browserifyShim = require("browserify-shim")
let uglifyify = require("uglifyify")

let config = require("./config")


// TODO (PenguinToast): Handle dist better

function handleError(error) {
  gutil.log(error.stack)
  this.emit("end")
}

gulp.task("constants", () => {
  let codeString = JSON.stringify(config.constants)
  codeString = `export default ${codeString}`

  return file(config.paths.dest.constants, codeString, { src: true })
    .pipe(gulp.dest(config.paths.dest.constantsDir))
})

gulp.task("javascripts", ["constants"], () => (
  browserify(config.paths.src.javascripts, config.plugin.browserify)
    .transform(jstify, { noMinify: true })
    .transform(babelify)
    .transform(browserifyShim)
    .transform({ global: true }, uglifyify)
    .bundle()
    .on("error", handleError)
    .pipe(source(config.paths.dest.javascripts))
    .pipe(config.production ? buffer() : gutil.noop())
    .pipe(config.production ? uglify() : gutil.noop())
    .pipe(gulp.dest(config.paths.dest.dir))
))

gulp.task("stylesheets", () => (
  gulp.src(config.paths.src.stylesheets)
    .pipe(stylus(config.plugin.stylus))
    .pipe(rename(config.paths.dest.stylesheets))
    .pipe(gulp.dest(config.paths.dest.dir))
))

gulp.task("watch", ["build"], () => {
  gulp.watch("src/javascripts/**/*", ["javascripts"])
  gulp.watch("src/stylesheets/*", ["stylesheets"])
})

gulp.task("build", ["javascripts", "stylesheets"])
gulp.task("default", ["watch"])
