const expect = require('chai').expect;
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

const sources = [
  {
    in: `const fs=require("fs");\nvar a=2,b=3;console.log(a,b);`,
    want: `const fs = require("fs");\nvar a = 2,\nb = 3;\nconsole.log(a, b);`
  },
  {
    in: `const path=require('path');var a=2,b=3,f=5;
console.log(a,b,c);console.log('done');`
  }
];
const encoding = 'utf8';

describe('fmt', function() {
  it('should format files', function(done) {
    var testLocation = path.join(__dirname, 'test.js');
    fs.writeFileSync(testLocation, sources[0].in, encoding);
    exec('node ../index.js', function(err, stdout, stderr) {
      console.log(stdout);
      const formatted = fs.readFileSync(testLocation, encoding);
      expect(sources[0].want).to.eq(formatted);
      done();
    });
  });
});
