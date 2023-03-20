const Task = require('../model/Task');


const index = (req,res)=>{
    const is_completed = req.query.is_completed;

    let kueri = {};
    if(is_completed){
        kueri.is_completed = is_completed;
    }

    Task.find(kueri,(err, data) => {
        if (err) res.send('tidak dapat mengambil data')
        res.status(200).json({
            nama:req.user.username,
            jumlah:data.length,
            data 
        })
    })
};

const show = (req,res) =>{
    const task = req.params.task;
    Task.find({task:task},(err,data)=>{
        if(err) res.send(err);
        res.status(200).json({data})
    });
};


const store = (req,res)=>{
    const task = req.body.task;
    const status = false;
    let newTask = new Task({
        task: task,
        is_completed: status
    })
    newTask.save((err, data) => {
        if (err) res.status(400).json({msg:'tidak dapat memasukkan data'})
        res.status(200).json({
            msg: 'berhasil ditambahkan'
        })
    })
};

const update = (req,res)=>{
    const id = req.params.id;
    Task.findByIdAndUpdate(id, { is_completed: true }, (err, data) => {
        if (err) res.status(404).json({msg:'data tidak ditemukan atau diambil'})
        res.status(200).json({
            status:'task sudah selesai'
        })
    })
};

const destroy = (req,res)=>{
    const id = req.params.id;
    Task.findByIdAndDelete(id,(err,data)=>{
        if(err) res.status(404).json({msg:'tidak dapat menghapus data'})
        res.status(200).json({
            status:'behasil dihapus'
        })
    })
};


module.exports = { index, show ,store, update, destroy};