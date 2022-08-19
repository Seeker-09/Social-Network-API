const { User } = require('../models')

// /api/users
const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    // get user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: "thoughts",
            })
            .populate({
                path: "friends"
            })
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    // create a new user
    /*
        Expects:
        {
            "username": "username"
            "email": "email"
        }
    */
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    // update a user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true, runValidators: true }
        )
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: "no user with this id found" })
                    return;
                }

                res.json(userData)
            })
            .catch(err => res.status(400).json(err))
    },

    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: "no user with this id found"})
                    return
                }

                res.json(userData)
            })
            .catch(err => res.status(400).json(err))
    },

    // api/users/:userId/friends
    // add friend
    /*
        expects: 
        {
            "_id": "id"
        }
    */
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: body } },
            { new: true }
        )
        .then(userData => res.json(userData))
        .catch(err => res.json(err))
    },

    // /api/users/:userId/friends/:friendId
    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(userData => res.json(userData))
        .catch(err => res.json(err))
    }
}

module.exports = userController