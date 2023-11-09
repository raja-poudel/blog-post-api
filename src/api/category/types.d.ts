import { Prisma } from '@prisma/client';

interface CreateBody {
  name: string
}

interface UpdateBody {
  name: string
}

interface ParamId {
  id: number
}

interface ParamSkipTake {
  skip: number
  take: number
}