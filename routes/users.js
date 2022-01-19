const router = require('express').Router();
const { getUsers, getUsersProfile } = require('../controllers/users');


router.get('/', getUsers);
router.get('/:id', getUsersProfile);

module.exports = router;


// const users_path = path.join(__dirname, '../data/users.json');

// let file_data;
// let user_id;

// user_router.get('/', readFile, (req, res) => {
//   console.log(file_data);
//   res.send(200, file_data);
// });

// user_router.get('/:id', readFile, doesUserExist, (req, res) => {
//   if (!user_id) {
//     res.send(404, { "message": "User ID not found" });
//   }
//   res.send(200, user_id);
// });

// const getFileData = (req, res, next) => {
//   const data = fs.readFile(users_path, {"encoding": "utf8"}, (err, data) => {
//     if (err) {
//       res.send(404, `Error fetching ssers data: ${err}`);
//       return;
//     }
//     file_data = JSON.parse(data);
//     next();
//   });
// };


// const doesUserExist = (req, res, next) => {
//   if (file_data){
//     console.log(file_data);
//     console.log(req.params.id);
//     // map_user_id = file_data.map(user => user._id === req.params.id);
//     user_id = file_data.find(user => user._id === req.params.id);
//     console.log(`UserID ${user_id} exists!`);
//     next();
//   }
//     console.log(`Data doesn't exist!`);
//     return;
// };


// user_router.get('/', readFile, (req, res) => {
//   console.log(file_data);
//   res.send(200, file_data);
// });

// user_router.get('/:id', readFile, doesUserExist, (req, res) => {
//   if (!user_id) {
//     res.send(404, { "message": "User ID not found" });
//   }
//   res.send(200, user_id);
// });
