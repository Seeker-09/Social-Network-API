const { Schema, model } = require("mongoose")

// Schemas
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal, 'm/d/yy, HH:MM')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

// Virtuals
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

// Create Model
const Thought = model('Thought', ThoughtSchema)

// export
module.exports = Thought