//useLoginContext
import {useContext} from 'react'
import { UserContext } from '../contexts/CurrentUser'
export const useCurrentUserContext = () => {
  return useContext(UserContext)
}