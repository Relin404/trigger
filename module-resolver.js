const Module = require('module');
const path = require('path');

// Store the original require function
const originalRequire = Module.prototype.require;

// Override the require function
Module.prototype.require = function (id) {
  // Handle @trigger packages
  if (id.startsWith('@trigger/')) {
    const packageName = id.substring('@trigger/'.length);
    // Use process.cwd() to get the workspace root instead of __dirname
    const libPath = path.join(
      process.cwd(),
      'dist',
      'libs',
      packageName,
      'main.js'
    );
    return originalRequire.call(this, libPath);
  }

  // For all other requires, use the original function
  return originalRequire.call(this, id);
};
