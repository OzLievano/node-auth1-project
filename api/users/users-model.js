const db = require('../../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById
}

async function find(){
    return await db('users');
}

async function findBy(filter){
    return await db('users').where(filter).orderBy("id");
}

async function findById(id){
    return await db('users').where({ id })
}

async function add(data){
    return await db('users').insert(data)
}