const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'gallery_user',
  password: 'strongpassword123', // use the same password you set above
  database: 'gallery_app',
  connectionLimit: 5
});

module.exports = pool;
