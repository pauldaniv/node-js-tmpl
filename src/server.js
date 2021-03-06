const express = require('express');
const wsService = require('./services/infra/websocket.service');
const { appConf } = require('./config/app-config');
const chalk = require('chalk');

const app = express();
wsService.appWss(app);

app.use(
  require('body-parser').json(),
  require('./config/security-config'),
  require('./controllers'),
  require('./handler/exceptions/handler')
);

app.listen(appConf.port, () => {
  const chalk = require('chalk');
  console.log(chalk.cyan('[env]'), process.env.NODE_ENV === 'development'
    ? chalk.green('development')
    : chalk.redBright('PRODUCTION'));
  console.log('>', chalk.cyan('App is running on port:'), chalk.green(appConf.port));
});

require('./services/infra/linker');

process.stdin.resume();//so the process will not end instantly

function exitHandler(options, exitCode) {
  console.log();
  // Object.values(wsService.connections).forEach(client => client.forEach(connection => connection.close()));
  if (exitCode && typeof exitCode === 'number') console.log(`Exit with: ${exitCode}`);
  if (options.exit === 'SIGINT') {
    console.log(chalk.green("Gracefully shutting down from SIGINT (Ctrl+C)"));
  }
  if (options.exit === 'SIGUSR1') {
    console.log(chalk.green("Gracefully shutting down from SIGUSR1"));
  }
  if (options.exit === 'SIGUSR2') {
    console.log(chalk.green("Gracefully shutting down from nodemon restart"));
  }

  process.exit();
}

process.on('SIGINT', exitHandler.bind(null, {exit: 'SIGINT'}));
process.on('SIGUSR1', exitHandler.bind(null, {exit: 'SIGUSR1'}));
process.on('SIGUSR2', exitHandler.bind(null, {exit: 'SIGUSR2'}));
