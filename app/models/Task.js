const mongoose = require('mongoose');
const uuid = require('uuid/v1');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    hash: String,
    board_id: String,
    name: String,
    description: String,
    attach: Array,
}, {
    timestamps: true,
});


TaskSchema.statics.createFields = ['hash', 'name', 'description', 'attach', 'board_id'];

TaskSchema.pre('save', function(next) {
    if ( ! this.hash) {
      this.hash = uuid();
    }
    next();
});

module.exports = mongoose.model('task', TaskSchema);