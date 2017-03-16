#! /usr/bin/env node

const prettier = require('prettier');
const fs = require('fs');
const path = require('path');

/**
 * prettier.js options
 */
const options = {
  printWidth: 72,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',

  // Here for reference.
  bracketSpacing: true,
  jsxBracketSameLine: false,
  parser: 'babylon'
};

/* Begin execution here */

const files = fs.readdirSync('./');

const targets = files.filter(function(filename) {
  return filename.endsWith('.js') && !filename.startsWith('.');
});

targets.forEach(function(file) {
  format(file, options, 'utf8');
});

/* Formatter */

function format(filename, options, encoding) {
  const source = fs.readFileSync(filename, encoding);
  const formatted = prettier.format(source, options);
  if (source !== formatted) {
    fs.writeFileSync(filename, formatted, encoding);
    console.log(filename);
  }
}

function formatJs(filepath) {
  const current = fs.readdirSync(filepath);
  const directories = current.filter(function(filename) {
    const info = fs.stat(path.join(filepath, filename));
    if (info) {
      return info.isDirectory();
    }
    return false;
  });
  console.log(directories);
  if (directories.length === 0) {
    return;
  } else {
    directories.forEach(function(dir) {
      formatJs(path.join(filepath, dir));
    });
  }
}

formatJs('./');
