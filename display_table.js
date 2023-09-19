// Original code from this thread: https://stackoverflow.com/questions/49618069/remove-index-from-console-table

const { Console } = require('console');
const { Transform } = require('stream');

function table(input) {
  const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
  const logger = new Console({ stdout: ts })
  logger.table(input)
  const table = (ts.read() || '').toString()
  for (let row of table.split(/[\r\n]+/)) {
    let r = row.replace(/[^┬]*┬/, '┌');
    r = r.replace(/^├─*┼/, '├');
    r = r.replace(/│[^│]*/, '');
    r = r.replace(/^└─*┴/, '└');
    r = r.replace(/'/g, ' ');
    r = r.trim();
    if (r != ''){
      console.log(`${r}`)
    }
  }
}

module.exports = { table };