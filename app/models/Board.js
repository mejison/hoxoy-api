const mongoose = require('mongoose');
const uuid = require('uuid/v1');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    hash: String,
    name: String,
}, {
    timestamps: true,
});


BoardSchema.statics.createFields = ['hash', 'name'];

BoardSchema.pre('save', function(next) {
    if ( ! this.hash) {
      this.hash = uuid();
    }
    next();
});

module.exports = mongoose.model('board', BoardSchema);