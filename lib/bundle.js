#!/usr/bin/env node

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('npm'), require('fs')) :
  typeof define === 'function' && define.amd ? define(['npm', 'fs'], factory) :
  (global = global || self, factory(global.npm, global.fs));
}(this, (function (npm, fs) { 'use strict';

  npm = npm && Object.prototype.hasOwnProperty.call(npm, 'default') ? npm['default'] : npm;
  fs = fs && Object.prototype.hasOwnProperty.call(fs, 'default') ? fs['default'] : fs;

  const { AutoComplete } = require("enquirer");


  try {
    let packageJSON = JSON.parse(
      fs.readFileSync(process.cwd() + "/package.json").toString()
    );
    const scripts = Object.keys(packageJSON.scripts);

    const prompt = new AutoComplete({
      name: "script",
      message: "Pick a script",
      limit: 10,
      initial: 0,
      choices: scripts,
    });

    prompt
      .run()
      .then((answer) => {
        console.log("Running script:", answer);
        npm.load(() => npm.run(answer));
      })
      .catch(console.error);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("No package.json found");
    } else {
      throw err;
    }
  }

})));
