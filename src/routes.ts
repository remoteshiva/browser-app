export const LOGIN_PAGE = '/login'
export const SIGNUP_PAGE = '/signup'

export const MY_SHIVAS = '/'
export const FAQ = 'https://www.remoteshiva.org/faq'
export const NEW_SHIVA = (step?: string) => (step === undefined ? 'newshiva' : `/newshiva/${step}`)
export const SHIVA_PAGE = (id: string) => `/shiva/${id}`
export const MOURNER_PAGE = '/m/:key'
export const VISITOR_PAGE = '/v/:key'

export const NOT_FOUND = '/404'
