const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: { type: String },
    is_completed: { type: Boolean },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;