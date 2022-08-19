const { Schema, model, Types } = require("mongoose")
const dateFormat = require('date-format')

// Schemas
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat('MM/dd, hh:mm', createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

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
            get: createdAtVal => dateFormat('MM/dd, hh:mm', createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
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