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

let constants = {
  default: {},
  development: {
    cssPath: "file:///Users/willsheu/workspace/duelyst-previous-challenges/build/duelyst-previous-challenges.css",
  },
  production: {
    cssPath: "https://penguintoast.github.io/duelyst-previous-challenges/dist/duelyst-previous-challenges.css",
  },
}

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

module.exports = {
  paths: _.merge({}, paths.default, paths[env]),
  constants: _.merge({}, constants.default, constants[env]),
  plugin: _.merge({}, plugin.default, plugin[env]),
}
