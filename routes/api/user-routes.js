const router = require("express").Router()
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/user-controller")

// GET and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// ADD friend at /api/users/:userId/friends
router
    .route('/:userId/friends')
    .post(addFriend)

// REMOVE friend at /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .delete(deleteFriend)

module.exports = router