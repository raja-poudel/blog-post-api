import { Prisma } from '@prisma/client';

interface ReferenceId {
  referenceId: number
}

interface ParamSkipTake {
  skip: number
  take: number
  referenceId: number
}

interface QueryParam {
  keyword: string
}