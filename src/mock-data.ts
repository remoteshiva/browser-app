import cuid from 'cuid';
import moment from 'moment'
import { Session } from './store/auth/types'
import { Shiva, Mourner } from './store/shiva/types'

export const test_session: Session = {
    token: 'aU3BuL62emYeFyGpkYpZ',
    user: {
        firstName: 'Ron',
        lastName: 'Burgundy'
    }
}


export const shivas: Shiva[] = [
    {
        _id: 'etXi0EzISAbRF8SH',
        nameOfDeceased: 'Brick Tamland',
        startDate: moment(),
        endDate: moment(),
        message: 'He will be missed',
        mourners: [
            {
                name: 'Ron Burgundy',
                relationship: 'Best Friend'
            }
        ],
        mournerKey: 'HgyQFcacW7',
        visitorKey: 'YpNVU8ZkOz',
        titleImage: new URL('https://images.app.goo.gl/zQK4nwSP3PAiAgzt9')
    },{
        _id: 'nYHti5evgaCynqKc',
        nameOfDeceased: 'Champ Kind',
        startDate: moment(),
        endDate: moment(),
        message: 'He will be missed too',
        mourners: [
            {
                name: 'Ron Burgundy',
                relationship: 'Best Friend'
            }
        ],
        mournerKey: 'Kw9sFWi6JX',
        visitorKey: 'Y8cxY0KKGl',
        titleImage: new URL('https://images.app.goo.gl/MtQd4cBumMw8v1ndA')
    },{
        _id: 'fUzzVqRoRde0ihGM',
        nameOfDeceased: 'Brian Fantana',
        startDate: moment(),
        endDate: moment(),
        message: 'He will be missed a lot',
        mourners: [
            {
                name: 'Ron Burgundy',
                relationship: 'Best Friend'
            }
        ],
        mournerKey: '0PaCMhDDrD',
        visitorKey: 'jPIFUxMDIx',
        titleImage: new URL('https://images.app.goo.gl/BNKXcsuw5krraMiy7')
    }
]