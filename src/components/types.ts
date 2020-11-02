// mode of operations on Shiva calendar
export type CalendarMode =
  | 'View' // view only - visitors can add to exisiting visits
  | 'Add' // add visits only - visits cannot be modified
  | 'Edit' // edit visits
