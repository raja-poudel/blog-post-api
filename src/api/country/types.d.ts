import { Prisma } from '@prisma/client';

interface ParamSkipTake {
  skip: number
  take: number
}

interface QueryParam {
  keyword: string
}