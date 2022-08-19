const { Thought, User } = require("../models")

// /api/thoughts/
const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                res.status(500).json(err)
                console.log(err)
            })
    },

    // get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(500).json(err))
    },

    // create a thought
    /*
        expects: 
        {
            "thoughtText": "Thought text",
            "username": "username"
            "userId": "alsdiuofhasljdhfalsk;df"
        }
    */
    createThought({ params, body }, res) {
        Thought.create(body) 
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true}
                )
            })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: "no user with that id found"})
                    return
                }

                res.json(userData)
            })
            .catch(err => res.json(err))
    },

    // update a thought
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true}
        )
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: "no thought with this id found" })
                    return
                }

                res.json(thoughtData)
            })
            .catch(err => res.json(err))
    },

    // delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: "no thought with this id found" })
                    return
                }

                res.json(thoughtData)
            })
            .catch(err => res.json(err))
    },

    // /api/thoughts/:thoughtId/reactions
    // create reaction
    /*
        expects: 
        {
            "reactionBody": "text here",
            "username": "username"
        }
    */
    createReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: "no thought with this id found" })
                    return
                }

                res.json(thoughtData)
            }) 
            .catch(err => res.json(err))
    },

    // /api/thoughts/:thoughtId/reactions/:reactionId
    // delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.json(err))
    }
}

module.exports = thoughtController