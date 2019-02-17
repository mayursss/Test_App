const path = require('path');
const Shell = require('node-powershell');

// function validateServer(req, res, next) {
//   if (!req.body.server_name) {
//     let err = 'Please enter server name';
//     res.render('index', { title: 'Admin Center', error: err });
//     return;
//   } else {
//     let serverName = req.body.server_name.split(/\r?\n/);
//     const params = [
//       {
//         name: 'strComputers',
//         value: serverName
//       }
//     ];
//     return params;
//   }
// }
exports.getScripts = (req, res, next) => {
  req.check('server_name', 'Please enter server name').notEmpty();
  req.check('script', 'Select Radio Button').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
    res.redirect('/runscript');
  } else {
    req.session.success = true;

    const psscript = req.body.script;
    let scriptPath = path.join(__dirname, '..', 'PSScripts', psscript + '.ps1');
    let serverName = req.body.server_name.split(/\r?\n/);

    let ps = new Shell({
      executionPolicy: 'Bypass',
      noProfile: true
    });

    const params = [
      {
        name: 'strComputers',
        value: serverName
      }
    ];

    ps.addCommand(scriptPath, params);
    ps.invoke()
      .then(output => {
        let dataSet = output;
        if (dataSet.Error) {
          console.log(dataSet.Error);
          res.render('index', {
            title: 'Admin Center',
            error: dataSet.Error
          });
        } else {
          res.render('index', {
            title: 'Admin Center',
            dataSet: dataSet
          });
        }
        ps.dispose();
      })
      .catch(err => {
        console.log('error from routes.js', err);
        ps.dispose();
        return err;
      });
  }
};
// };
