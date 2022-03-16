const router = require('express').Router();
const { getUsers, getUsersProfile, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUsersProfile);
router.post('/', createUser);
// router.patch('/me', updateProfile);
// router.patch('/me/avatar', updateProfile);

module.exports = router;
