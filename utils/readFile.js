const fsPromises = require('fs').promises;

const readFile = (filePath, res) => fsPromises.readFile(filePath, { encoding: 'utf8' })
  .then(JSON.parse)
  .catch(() => {
    res.status(500).send({ message: 'Internal server error' });
  });

module.exports = readFile;
