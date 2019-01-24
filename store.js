const crypto = require('crypto')
const knex = require('knex')(require('./knexfile'))

module.exports = {
  createCity ({ name, postal_code, province_id }) {
    console.log(`Add city ${name}, ${postal_code}, ${province_id}}`)

    return knex('city').insert({
      name,
      postal_code,
      province_id
    })
  },

  getProvinces () {
    console.log(`Getting provinces...`)

      return knex
        .from('province')
        .select('id', 'name')
        .then(([provinces]) => {
            console.log(provinces)
            return provinces
        } )
  },



  authenticate ({ username, password }) {
    console.log(`Authenticating user ${username}`)
    return knex('user').where({ username })
      .then(([user]) => {
        if (!user) return { success: false }
        const { hash } = saltHashPassword({
          password,
          salt: user.salt
        })
        return  { success: hash === user.encrypted_password }
      })
  }
}

function saltHashPassword ({ password, salt = randomString() }) {
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)
  return {
    salt,
    hash: hash.digest('hex')
  }
}

function randomString () {
  return crypto.randomBytes(4).toString('hex')
}
