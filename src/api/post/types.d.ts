import { Prisma } from '@prisma/client';

interface CreateBody {
  name: string
  slug?: string
  overview?: string
  published?: boolean
  categoryId: number
}

interface UpdateBody {
  name?: string
  slug?: string
  overview?: string
  published?: boolean
  categoryId?: number
}

interface ParamId {
  id: number
}

interface ParamSkipTake {
  skip: number
  take: number
}

interface KeywordSortQuery {
  keyword?: string
  sort?: Prisma.SortOrder
}
