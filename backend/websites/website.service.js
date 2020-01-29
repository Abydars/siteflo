const config = require('config.json');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Website = db.website;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Website.find({});
}

async function getById(id) {
    return await Website.findById(id);
}

async function create(userParam) {
    // validate
    if (await Website.findOne({ name: userParam.name })) {
        throw 'Website "' + userParam.name + '" is already taken';
    }

    const website = new Website(userParam);

    // save user
    await website.save();
}

async function update(id, userParam) {
    const Website = await Website.findById(id);

    // validate
    if (!Website) throw 'User not found';
    if (Website.username !== userParam.username && await Website.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(Website, userParam);

    await Website.save();
}

async function _delete(id) {
    await Website.findByIdAndRemove(id);
}
