// Type definitions as JSDoc comments for better IDE support

/**
 * @typedef {Object} PersonData
 * @property {string} id
 * @property {string} fullName
 * @property {string} populationId - 16 digit unique number
 * @property {string} familyId - 16 digit unique family number
 * @property {'Male' | 'Female'} gender
 * @property {string} dateOfBirth
 * @property {string} placeOfBirth
 * @property {string} religion
 * @property {'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'} bloodType
 */

/**
 * @typedef {Object} User
 * @property {string} username
 * @property {string} password
 * @property {string} fullName
 * @property {'admin' | 'user'} role
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User | null} currentUser
 * @property {(username: string, password: string) => boolean} login
 * @property {() => void} logout
 * @property {boolean} isAuthenticated
 */

/**
 * @typedef {Object} GoogleSheetsConfig
 * @property {string} spreadsheetId
 * @property {string} range
 * @property {string} apiKey
 */

export {};