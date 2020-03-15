const {
  pickOne,
  head,
  deLocalizeString,
  getInitial,
  upperCaseFirst
} = require('./util')

function pseudoUsername(
  {
    firstName,
    middleName,
    lastName,
    schema = pickOne(
      [
        '[firstInitial][lastName]',
        '[FirstInitial][LastName]',
        '[firstName][_][lastName]',
        '[FirstName][_][LastName]',
        '[firstName][-][lastName]',
        '[FirstName][-][LastName]',
        '[firstName][.][lastName]',
        '[FirstName][.][LastName]',
        '[FirstName][LastInitial]',
        '[FirstName][LastName]'
      ].concat(
        middleName
          ? [
              '[firstName][_][mi][_][lastName]',
              '[FirstName][_][MI][_][LastName]',
              '[firstName][_][middleName][_][lastName]',
              '[FirstName][_][MiddleName][_][LastName]',
              '[firstName][-][mi][-][lastName]',
              '[FirstName][-][MI][-][LastName]',
              '[firstName][-][middleName][-][lastName]',
              '[FirstName][-][MiddleName][-][LastName]',
              '[firstName][.][mi][.][lastName]',
              '[FirstName][.][MI][.][LastName]',
              '[firstName][.][middleName][.][lastName]',
              '[FirstName][.][MiddleName][.][LastName]'
            ]
          : []
      )
    )
  } = {}
) {
  const normalize = name =>
    deLocalizeString(name)
      .split(/\s/)
      .map(_name => _name.replace(/['`\s]/g, ''))
      .filter(_name => (_name ? true : false))

  const normalized = {
    firstName: normalize(firstName),
    middleName: middleName ? normalize(middleName) : '',
    lastName: normalize(lastName)
  }

  switch (schema) {
    case '[firstInitial][lastName]': {
      return [getInitial(normalized.firstName), normalized.lastName.join('')]
        .join('')
        .toLowerCase()
    }

    case '[FirstInitial][LastName]': {
      return [
        getInitial(normalized.firstName, { uc: true }),
        normalized.lastName.map(upperCaseFirst).join('')
      ].join('')
    }

    case '[firstName][middleName][lastName]': {
      return [
        normalized.firstName.join('-'),
        normalized.middleName.join('-'),
        normalized.lastName.join('-')
      ]
        .join('')
        .toLowerCase()
    }

    case '[FirstName][MiddleName][LastName]': {
      return [
        normalized.firstName.map(upperCaseFirst).join(''),
        normalized.middleName.map(upperCaseFirst).join(''),
        normalized.lastName.map(upperCaseFirst).join('')
      ].join('')
    }

    case '[firstInitial][middleInitial][lastName]': {
      return [
        getInitial(normalized.firstName),
        getInitial(normalized.middleName),
        normalized.lastName.join('-')
      ]
        .join('')
        .toLowerCase()
    }

    case '[FirstInitial][MiddleInitial][LastName]': {
      return [
        getInitial(normalized.firstName, { uc: true }),
        getInitial(normalized.middleName, { uc: true }),
        normalized.lastName.map(upperCaseFirst).join('')
      ].join('')
    }

    case '[firstName][_][lastName]': {
      return [normalized.firstName.join('-'), normalized.lastName.join('-')]
        .join('_')
        .toLowerCase()
    }

    case '[FirstName][_][LastName]': {
      return [
        normalized.firstName.map(upperCaseFirst).join(''),
        normalized.lastName.map(upperCaseFirst).join('')
      ].join('_')
    }

    case '[firstName][-][lastName]': {
      return [normalized.firstName.join('-'), normalized.lastName.join('-')]
        .join('-')
        .toLowerCase()
    }

    case '[FirstName][-][LastName]': {
      return [
        normalized.firstName.map(upperCaseFirst).join(''),
        normalized.lastName.map(upperCaseFirst).join('')
      ].join('-')
    }

    case '[firstName][.][lastName]': {
      return [normalized.firstName.join('-'), normalized.lastName.join('-')]
        .join('.')
        .toLowerCase()
    }

    case '[FirstName][.][LastName]': {
      return [
        normalized.firstName.map(upperCaseFirst).join(''),
        normalized.lastName.map(upperCaseFirst).join('')
      ].join('.')
    }

    case '[FirstName][LastInitial]': {
      return (
        normalized.firstName.map(upperCaseFirst).join('') +
        getInitial(normalized.lastName, { uc: true })
      )
    }

    case '[FirstName][LastName]': {
      return (
        normalized.firstName.map(upperCaseFirst).join('') +
        normalized.lastName.map(upperCaseFirst).join('')
      )
    }

    case '[firstName][lastName]': {
      return [normalized.firstName.join(''), normalized.lastName.join('')]
        .join('')
        .toLowerCase()
    }

    case '[firstName][_][mi][_][lastName]': {
      return [
        normalized.firstName.join('-'),
        head(normalized.middleName).charAt(0),
        normalized.lastName.join('-')
      ]
        .join('_')
        .toLowerCase()
    }

    case '[FirstName][_][MI][_][LastName]': {
      return [
        normalized.firstName.map(upperCaseFirst).join('-'),
        head(normalized.middleName)
          .charAt(0)
          .toUpperCase(),
        normalized.lastName.map(upperCaseFirst).join('-')
      ].join('_')
    }

    case '[firstName][_][middleName][_][lastName]': {
      return [
        normalized.firstName.join('-'),
        normalized.middleName.join('-'),
        normalized.lastName.join('-')
      ]
        .join('_')
        .toLowerCase()
    }

    case '[FirstName][_][MiddleName][_][LastName]': {
      return [
        normalized.firstName.map(upperCaseFirst).join(''),
        normalized.middleName.map(upperCaseFirst).join(''),
        normalized.lastName.map(upperCaseFirst).join('')
      ].join('_')
    }

    case '[firstName][-][mi][-][lastName]': {
      return [
        normalized.firstName.join('-'),
        head(normalized.middleName).charAt(0),
        normalized.lastName.join('-')
      ]
        .join('-')
        .toLowerCase()
    }

    case '[FirstName][-][MI][-][LastName]': {
      return [
        normalized.firstName.map(upperCaseFirst).join('-'),
        head(normalized.middleName)
          .charAt(0)
          .toUpperCase(),
        normalized.lastName.map(upperCaseFirst).join('-')
      ].join('-')
    }

    case '[firstName][-][middleName][-][lastName]': {
      return [
        normalized.firstName.join('-'),
        normalized.middleName.join('-'),
        normalized.lastName.join('-')
      ]
        .join('-')
        .toLowerCase()
    }

    case '[FirstName][-][MiddleName][-][LastName]': {
      return [
        normalized.firstName.map(upperCaseFirst).join(''),
        normalized.middleName.map(upperCaseFirst).join(''),
        normalized.lastName.map(upperCaseFirst).join('')
      ].join('-')
    }

    case '[firstName][.][mi][.][lastName]': {
      return [
        normalized.firstName.join('-'),
        getInitial(normalized.middleName),
        normalized.lastName.join('-')
      ]
        .join('.')
        .toLowerCase()
    }

    case '[FirstName][.][MI][.][LastName]': {
      return [
        normalized.firstName.map(upperCaseFirst).join('-'),
        head(normalized.middleName)
          .charAt(0)
          .toUpperCase(),
        normalized.lastName.map(upperCaseFirst).join('-')
      ].join('.')
    }

    case '[FirstName][.][MiddleName][.][LastName]': {
      return [
        normalized.firstName.map(upperCaseFirst).join(''),
        normalized.middleName.map(upperCaseFirst).join(''),
        normalized.lastName.map(upperCaseFirst).join('')
      ].join('.')
    }

    case '[firstName][.][middleName][.][lastName]': {
      return [
        normalized.firstName.join('-'),
        normalized.middleName.join('-'),
        normalized.lastName.join('-')
      ]
        .join('.')
        .toLowerCase()
    }
  }
}

module.exports = pseudoUsername
