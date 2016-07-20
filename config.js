let _ = require("lodash")
let gutil = require("gulp-util")


let env = gutil.env.env || "development"

let paths = {
  default: {
    src: {
      javascripts: "src/javascripts/main.js",
      stylesheets: "src/stylesheets/main.styl",
    },
    dest: {
      javascripts: "duelyst-previous-challenges.js",
      stylesheets: "duelyst-previous-challenges.css",
      constants: "pt-constants.js",
      constantsDir: "build",
    },
  },
  development: {
    dest: {
      dir: "build",
    },
  },
  production: {
    dest: {
      dir: "dist",
    },
  },
}
paths = _.merge({}, paths.default, paths[env])

let constants = {
  default: {},
  development: {
    cssPath: `file://${__dirname}/${paths.dest.dir}/${paths.dest.stylesheets}`,
  },
  production: {
    cssPath: "https://penguintoast.github.io/duelyst-previous-challenges/dist/${paths.dest.stylesheets}",
  },
}
constants = _.merge({}, constants.default, constants[env])

let plugin = {
  default: {
    browserify: {
      paths: ["build"],
    },
  },
  development: {
    browserify: {
      debug: true,
    },
  },
  production: {
    stylus: {
      compress: true,
    },
  },
}
plugin = _.merge({}, plugin.default, plugin[env])

module.exports = {
  paths,
  constants,
  plugin,
  production: env === "production",
}
