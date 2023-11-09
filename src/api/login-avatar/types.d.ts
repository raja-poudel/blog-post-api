import { Prisma } from '@prisma/client';

interface CreateBody {
  userId: number
  fileName: string
  url: string
  size: number
  uploadedAt: string
}

interface ReferenceId {
  referenceId: number
}

interface ParamId {
  id: number
}