import cuid from 'cuid';
import moment from 'moment'
import { User } from './store/auth/types'
import { Shiva, Mourner } from './store/shiva/types'

export const test_user: User = {
    firstName: 'Ron',
    lastName: 'Burgundy'
}


export const shivas: Shiva[] = [
    {
        id: cuid(),
        nameOfDeceased: 'Brick Tamland',
        startDate: moment(),
        endDate: moment(),
        message: 'He will be missed',
        mourners: [
            {
                name: 'Ron Burgundy',
                relationship: 'Best Friend'
            }
        ]
    },{
        id: cuid(),
        nameOfDeceased: 'Champ Kind',
        startDate: moment(),
        endDate: moment(),
        message: 'He will be missed too',
        mourners: [
            {
                name: 'Ron Burgundy',
                relationship: 'Best Friend'
            }
        ]
    },{
        id: cuid(),
        nameOfDeceased: 'Brian Fantana',
        startDate: moment(),
        endDate: moment(),
        message: 'He will be missed a lot',
        mourners: [
            {
                name: 'Ron Burgundy',
                relationship: 'Best Friend'
            }
        ]
    }
]