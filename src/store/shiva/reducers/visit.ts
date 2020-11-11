import * as ShivaActions from '../constants'
import { VisitMap, Visit } from '../types'
import { VisitActionTypes } from '../actions'

export const visitReducer = (visits: VisitMap, action: VisitActionTypes): VisitMap => {
  switch (action.type) {
    case ShivaActions.AddVisit:
      return { ...visits, [action.payload.id]: action.payload }
    case ShivaActions.UpdateVisit:
      const { visitId, partialVisit } = action.payload
      if (visitId in visits) {
        const updatedVisit: Visit = { ...visits[visitId], ...partialVisit }
        return { ...visits, ...{ [visitId]: updatedVisit } }
      }
      return visits
    case ShivaActions.DeleteVisit:
      const { [action.payload]: omit, ...newVisits } = visits
      return { ...newVisits }
    // case ShivaActions.AddVisitor:
    //   const { visitId: vid, visitor } = action.payload
    //   if (visitId in visits) {
    //     return { ...visits }
    //   }
    //   return visits
    default:
      return visits
  }
}
