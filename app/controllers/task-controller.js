const Task = require('../models/Task');

module.exports = {
    async create(data) {
        return await Task.create(data);
    },
    async getOne(hash) {
        return await Task.findOne({hash});
    },
    async getAll() {
        return await Task.find({});
    },
    async update(hash, data) {
        return await Task.findOneAndUpdate({hash}, data);
    },
    async delete(hash) {
        return await Task.findOneAndRemove({hash});
    }
};
