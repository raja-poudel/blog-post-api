import { Prisma } from '@prisma/client';

interface CreateBody {
  postId: number
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