import { Gender, Orientation } from '../enums';

export interface User {
  uid: string
  email: string
  emailVerified: boolean
  displayName?: string
  photoURL?: string
  gender: Gender
  orientation: Orientation
}