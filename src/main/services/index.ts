import { register as authRegister } from './auth'
import { register as uploadRegister } from './upload'
export const registerAllServices = () => {
  authRegister()
  // uploadRegister()
}
