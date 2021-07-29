#!/usr/bin/env node
'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const console_1 = require('@squareboat/nest-console');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

function checkFileExistsSync(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.constants.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}

if (!checkFileExistsSync('./dist/app.module.js')) {
  // CHANGE THE FILE TO CHECK IF NEEDED
  console_1.Logger.error(' PLEASE BUILD THE CLI PROJECT FIRST ');
  console_1.Logger.info(' Run command: `npm run build` '); // CHANGE THE BUILD COMMAND IF NEEDED
  return process.exit();
}

require('./dist/main');
