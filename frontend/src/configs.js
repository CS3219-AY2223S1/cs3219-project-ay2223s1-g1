const URI_USER_SVC = process.env.URI_USER_SVC || 'http://localhost:8000'
const URI_MATCHING_SVC = process.env.URI_MATCHING_SVC || 'http://localhost:8001'
const URI_QUESTION_SVC = process.env.URI_QUESTION_SVC || 'http://localhost:8050'
const PREFIX_USER_SVC = '/api/user'
const PREFIX_QUESTION_SVC = '/api/question'

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC
export const URL_MATCHING_SVC = URI_MATCHING_SVC
export const URL_QUESTION_SVC = URI_QUESTION_SVC + PREFIX_QUESTION_SVC
export const SIGNIN = '/signin'
export const SIGNUP = '/signup'
export const DASHBOARD = '/dashboard'
export const DIFFICULTY = '/difficulty'
export const LOGOUT = '/logout'
export const PROFILE = '/profile'
export const ROOM = '/room'
export const QUESTIONS = '/questions'

