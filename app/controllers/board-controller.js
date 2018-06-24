const Board = require('../models/Board');

module.exports = {
    async getOne(hash) {
        return await Board.findOne({ hash });
    },
    async getAll() {
        return await Board.find({});
    },
    async create(name) {
        const board = new Board();
        board.name = name;
        return board.save();
    },
    async update(hash, data) {
        return await Board.findOneAndUpdate({hash}, data);
    },
    async delete(hash) {
        return await Board.findOneAndRemove({hash});
    }
}
