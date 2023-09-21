// Original code from this thread: https://stackoverflow.com/questions/49618069/remove-index-from-console-table

const { Console } = require('console');
const { Transform } = require('stream');

/**
 * Customizes the display of tables in the console.
 * It removes index numbers from console.table output.
 * @param {Array} input - The data to be displayed as a table.
 */
function display(input) {
  // Create a transform stream to intercept console output
  const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } });
  // Create a custom logger using the transform stream
  const logger = new Console({ stdout: ts });
  
  // Display the input data as a table using console.table
  logger.table(input);

  // Read the transformed output and customize the table formatting
  const table = (ts.read() || '').toString();
  for (let row of table.split(/[\r\n]+/)) {
    // Customize the appearance of table borders and remove index numbers
    let r = row.replace(/[^┬]*┬/, '┌');
    r = r.replace(/^├─*┼/, '├');
    r = r.replace(/│[^│]*/, '');
    r = r.replace(/^└─*┴/, '└');
    r = r.replace(/'/g, ' ');
    r = r.trim();
    if (r != '') {
      console.log(`${r}`);
    }
  }
}

module.exports = { display };