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

var files = fs.readdirSync('./');

files = files.filter(function(filename) {
  return filename.endsWith('.js') && !filename.startsWith('.');
});

files.forEach(function(file) {
  format(file, options, 'utf8');
});

/* Formatter */

function format(filename, options, encoding) {
  var source = fs.readFileSync(filename, encoding);
  var formatted = prettier.format(source, options);
  if (source !== formatted) {
    fs.writeFileSync(filename, formatted, encoding);
    console.log(filename);
  }
}
