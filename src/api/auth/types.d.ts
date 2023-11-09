import { Prisma } from '@prisma/client'

interface AuthHeaders {
  'authorization': string
}

interface AuthParams {
  email: string
  password?: string
}

interface TokenBody {
  token: string
}

interface SignUpBody {
  fullName?: string
  email?: string
  password?: string
  confirmPassword?: string
  phone?: string
  address?: string
  city?: string
  stateId?: number
  countryId?: number
  active?: boolean
}

interface PasswordBody {
  email: string
  currentPassword?: string
  newPassword?: string
}

interface PasswordResetBody {
  email: string
  password: string
}

interface ParamSkipTake {
  skip: number
  take: number
}

interface IdParam {
  id: number
}

interface CreateBody {
  userRoleId?: number
  fullName?: string
  email?: string
  password?: string
  confirmPassword?: string
  phone?: string
  address?: string
  city?: string
  stateId?: number
  countryId?: number
  active?: boolean
}

interface UpdateBody extends CreateBody { }