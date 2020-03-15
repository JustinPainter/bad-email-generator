const chance = require('chance').Chance()
const { pickOne, oneInFive, oneInTwenty } = require('./util')
const pseudoUsername = require('./username')
const badWords = require('./json/bad-words.json')

const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'hotmail.com',
  'aol.com'
]

function pseudoEmailAddress(params = {}) {
  const {
    firstName,
    middleName,
    lastName,
    schema,
    username,
    domain = pickOne(FREE_EMAIL_DOMAINS)
  } = params

  let suffix = ''
  let badEmail = false
  let _username

  if (!username && (!domain || FREE_EMAIL_DOMAINS.includes(domain))) {
    badEmail = oneInTwenty()
    suffix = pickOne([
      pickOne(badWords.suffix),
      chance.natural({ min: 1968, max: 2008 })
    ])
  }

  if (username) {
    _username = username
  } else if (badEmail) {
    _username = pseudoUsername({
      firstName: pickOne(badWords.adjectives),
      middleName: oneInFive() ? pickOne(badWords.adjectives) : undefined,
      lastName: pickOne(badWords.nouns) + suffix
    })
    console.log(_username)
  } else {
    _username = pseudoUsername({ lastName, middleName, firstName, schema })
  }

  return `${_username}${suffix}@${domain}`
}

module.exports = pseudoEmailAddress
