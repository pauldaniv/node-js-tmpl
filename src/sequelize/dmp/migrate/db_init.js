'use strict';

const fs = require("fs");
const dmp = fs.readFileSync(`${__dirname}/../../dmp/init.sql`);

module.exports = {
  up: ({sequelize}) => {
    return sequelize.query(dmp.toString());
  },

  down: ({sequelize}) => {
    return sequelize.query('drop schema public');
  }
};
