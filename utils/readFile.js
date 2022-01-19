const fsPromises = require('fs').promises;

const readFile = (filePath, res) =>
  fsPromises.readFile(filePath, {"encoding": "utf8"})
  .then(JSON.parse)
  .catch((err) => {
    console.log({ message: `Internal server error: ${err}`})
    res.status(500).send({ message: `Internal server error`})
  });

module.exports = readFile;