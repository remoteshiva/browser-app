import moment from 'moment'
import { Session } from './store/auth/types'
import { Shiva, initializeShiva } from './store/shiva/types'

export const test_session: Session = {
  token: 'aU3BuL62emYeFyGpkYpZ',
  user: {
    firstName: 'Ron',
    lastName: 'Burgundy',
  },
}

export const shivas: Shiva[] = [
  initializeShiva({
    _id: 'etXi0EzISAbRF8SH',
    nameOfDeceased: 'Brick Tamland',
    startDate: moment('2020-07-20'),
    endDate: moment('2020-07-27'),
    videoLink: new URL('https://zoom.us/k/57634312'),
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh tellus molestie nunc non blandit. Morbi tristique senectus et netus et. Ipsum faucibus vitae aliquet nec ullamcorper. Faucibus purus in massa tempor nec feugiat nisl. Amet massa vitae tortor condimentum lacinia. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Sit amet tellus cras adipiscing enim eu turpis egestas. Sollicitudin aliquam ultrices sagittis orci. Volutpat diam ut venenatis tellus in metus. Consectetur purus ut faucibus pulvinar elementum. Amet aliquam id diam maecenas ultricies. Ultrices dui sapien eget mi proin sed libero enim.',
    mourners: [
      {
        name: 'Ron Burgundy',
        relationship: 'Best Friend',
      },
      {
        name: 'Ed Harken',
        relationship: 'Boss',
      },
    ],
    mournerKey: 'HgyQFcacW7',
    visitorKey: 'YpNVU8ZkOz',
    titleImage: new URL('https://www.villagevoice.com/wp-content/uploads/2013/12/9415887.0.jpg'),
    visits: [],
  }),
  initializeShiva({
    _id: 'nYHti5evgaCynqKc',
    nameOfDeceased: 'Champ Kind',
    startDate: moment('2018-03-05'),
    endDate: moment('2018-03-12'),
    videoLink: new URL('https://zoom.us/k/57634312'),
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    mourners: [
      {
        name: 'Ron Burgundy',
        relationship: 'Best Friend',
      },
      {
        name: 'Ed Harken',
        relationship: 'Boss',
      },
    ],
    mournerKey: 'Kw9sFWi6JX',
    visitorKey: 'Y8cxY0KKGl',
    titleImage: new URL('https://bloximages.chicago2.vip.townnews.com/pottsmerc.com/content/tncms/assets/v3/editorial/1/61/161a5c45-0437-503c-a943-ab7fa7f8dfcc/5b7c785d5c9f4.image.jpg'),
    visits: [],
  }),
  initializeShiva({
    _id: 'fUzzVqRoRde0ihGM',
    nameOfDeceased: 'Brian Fantana',
    startDate: moment('2020-04-13'),
    endDate: moment('2020-04-20'),
    videoLink: new URL('https://zoom.us/k/57634312'),
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in velit vitae sapien consectetur sollicitudin. Nam non finibus elit, non sodales libero. Morbi tempus eget leo vitae lacinia. Morbi vitae eleifend nisi, quis dictum lacus. Ut ut blandit massa. Nullam vitae dapibus arcu. Fusce ullamcorper odio a tellus facilisis viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi ut sem tempor, vulputate arcu a, mattis urna.',
    mourners: [
      {
        name: 'Ron Burgundy',
        relationship: 'Best Friend',
      },
      {
        name: 'Ed Harken',
        relationship: 'Boss',
      },
    ],
    mournerKey: '0PaCMhDDrD',
    visitorKey: 'jPIFUxMDIx',
    titleImage: new URL('https://vignette.wikia.nocookie.net/anchorman/images/e/ec/Brian-fantana.jpg/revision/latest'),
    visits: [
      {
        date: moment('2020-04-13 13:00'),
        length: 4,
        visitors: [],
        mourners: [],
      },
    ],
    images: [
      new URL('https://assets.capitalfm.com/2013/50/-brian-fantana-anchorman-1387281923-view-0.jpg'),
      new URL('https://assets.mycast.io/characters/brian-fantana-9394-normal.jpg?1565808314'),
      new URL('https://movie-fanatic-res.cloudinary.com/iu/s--hQpaWV_2--/t_full/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1393629323/paul-rudd-anchorman-2.jpg'),
    ],
  }),
]
