
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        email: 'admin@example.com',
        full_name: 'Admin User',
      },
      {
        id: 2,
        email: 'user@example.com',
        full_name: 'Plain User',
      },
    ]);
  },
  down: ({bulkDelete}) => {
    return bulkDelete('users', {}, {});
  }
};
