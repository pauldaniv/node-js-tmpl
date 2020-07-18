'use strict';

const fs = require('fs');

module.exports = {
  up: (queryInterface) => {
    const migrations = fs.readFileSync(`${__dirname}/../init.json`).toString();
    return queryInterface.bulkInsert('SequelizeMeta', JSON.parse(migrations).map((it) => ({name: it})), {});
  },

  down: ({bulkDelete}) => {
    return bulkDelete('SequelizeMeta', {}, {});
  }
};
