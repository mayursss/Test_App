const Shell = require('node-powershell')
const path = require('path')

function runPS(scriptname) {
  let ps = new Shell({
    executionPolicy: 'Bypass',
    verbose: true,
    noProfile: true
  })

  ps.addCommand(path.join(__dirname, 'PSSCripts', scriptname))
  ps.invoke(output => {
    console.log(output);
  });
}
// output.then(output => {
//   console.log(output)
// })