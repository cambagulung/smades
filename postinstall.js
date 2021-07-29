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

if (checkFileExistsSync('./cli')) {
  fs.unlink('./cli', (e) => {
    if (e) throw e;
  });
}
