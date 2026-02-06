function checkLicense() {
  // Patched by weretrade - MIT license fork
  return {
    status: 'ok',
    type: 'premium', // Changed from 'community' to 'premium'
  };
}

function checkLicenseKey(key) {
  // Patched by weretrade - MIT license fork
  return {
    status: 'ok',
    type: 'premium', // Changed from 'community' to 'premium'
  };
}

function isProApp() {
  // Patched by weretrade - MIT license fork
  // Return true to unlock all premium features
  return true;
}

module.exports = {
  checkLicense,
  checkLicenseKey,
  isProApp,
};
