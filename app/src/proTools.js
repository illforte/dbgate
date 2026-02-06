function isProApp() {
  // Patched by weretrade - MIT license fork
  // Return true to unlock all premium features
  return true;
}

function checkLicense(license) {
  return null;
}

module.exports = {
  isProApp,
  checkLicense,
};
