const chance = require('chance').Chance()
const is = require('../../util/is')
const oneLiners = require('1-liners')
const changeCase = require('change-case')
const { lowerCase } = require('lower-case')
const { upperCase } = require('upper-case')
const { upperCaseFirst } = require('upper-case-first')

function pickOne(collection, separator = ',') {
  if (is.array(collection)) {
    return chance.pickone(collection)
  }

  if (is.plainObject(collection)) {
    return collection[chance.pickone(Object.keys(collection))]
  }

  if (is.string(collection)) {
    return chance.pickone(collection.split(separator))
  }

  return undefined
}

function pickSet(set, quantity) {
  if (is.array(collection)) {
    return chance.pickset(collection, quantity)
  }

  if (is.plainObject(collection)) {
    return chance
      .pickset(Object.keys(collection), quantity)
      .reduce((obj, key) => (obj[key] = collection[key]), {})
  }

  if (is.string(collection)) {
    return chance.pickset(collection.split(separator), quantity)
  }

  return chance.pickset(set, quantity)
}

function rng(min, max) {
  return chance.integer({ min, max })
}

function weightedPick({ set = [], likelihood }) {
  const _set = oneLiners.compact(set)
  if (_set.length === 2) {
    return headsOrTails(likelihood) ? _set[0] : _set[1]
  } else if (_set.length === 1) {
    return _set[0]
  } else {
    return headsOrTails(likelihood)
  }
}

function headsOrTails(likelihood = 50) {
  return chance.bool({ likelihood })
}

// 5%
function oneInTwenty(x, y) {
  return weightedPick({ set: [x, y], likelihood: 5 })
}

// 10%
function oneInTen(x, y) {
  return weightedPick({ set: [x, y], likelihood: 10 })
}

// 20%
function oneInFive(x, y) {
  return weightedPick({ set: [x, y], likelihood: 20 })
}

// 25%
function oneInFour(x, y) {
  return weightedPick({ set: [x, y], likelihood: 25 })
}

// 30%
function oneInThree(x, y) {
  return weightedPick({ set: [x, y], likelihood: 30 })
}

// 40%
function twoInFive(x, y) {
  return weightedPick({ set: [x, y], likelihood: 40 })
}

// 50%
function oneInTwo(x, y) {
  return weightedPick({ set: [x, y] })
}

// 60%
function threeInFive(x, y) {
  return weightedPick({ set: [x, y], likelihood: 60 })
}

// 75%
function threeInFour(x, y) {
  return weightedPick({ set: [x, y], likelihood: 75 })
}

// 80%
function fourInFive(x, y) {
  return weightedPick({ set: [x, y], likelihood: 80 })
}

// 90%
function nineInTen(x, y) {
  return weightedPick({ set: [x, y], likelihood: 90 })
}

function getInitial(str, { uc, lc } = {}) {
  const name = is.array(str) ? oneLiners.head(str) : str
  const initial = name.charAt(0)
  return uc ? initial.toUpperCase() : lc ? initial.toLowerCase() : initial
}

// From https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
function deLocalizeString(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function upperCaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

module.exports = Object.assign({}, changeCase, oneLiners, {
  deLocalizeString,
  getInitial,
  headsOrTails,
  oneInTwenty,
  oneInTen,
  oneInFive,
  oneInFour,
  oneInThree,
  twoInFive,
  oneInTwo,
  threeInFive,
  threeInFour,
  fourInFive,
  nineInTen,
  pickOne,
  pickSet,
  rng,
  upperCaseFirst
})
