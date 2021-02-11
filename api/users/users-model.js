const db = require('../../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById
}

 function find(){
    return db('users').select("id","username").orderBy("id");
}

 function findBy(filter){
    return db('users').where(filter).orderBy("id");
}

 function findById(id){
    return db('users').where({ id })
}

 function add(data){
    return db('users').insert(data)
}