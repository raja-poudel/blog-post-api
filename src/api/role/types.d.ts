import { Prisma } from '@prisma/client';

interface CreateBody {
  userRole: string
  roleName: string
  description?: string
}

interface UpdateBody {
  userRole?: string
  roleName?: string
  description?: string
}

interface ParamId {
  id: number
}

interface ParamSkipTake {
  skip: number
  take: number
}
