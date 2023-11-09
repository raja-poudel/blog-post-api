import { PrismaClient } from '@prisma/client'
import { CreateBody, ParamId, ParamSkipTake, KeywordSortQuery, UpdateBody } from "./types";

const prisma = new PrismaClient({});

export const create = async (body: CreateBody) => {
  return await prisma.posts.create({
    data: body
  })
}

export const getAll = async () => {
  const [data, count] = await prisma.$transaction([
    prisma.posts.findMany({
      include: {
        postThumbnail: true
      }
    }),
    prisma.posts.count({})
  ])
  return { data, count }
}

export const getByPaginate = async (params: ParamSkipTake, query: KeywordSortQuery) => {
  const condition = query.keyword !== undefined ? {
    OR: [
      {
        name: { contains: query.keyword },
      }
    ]
  } : {};

  const [data, count] = await prisma.$transaction([
    prisma.posts.findMany({
      skip: params.skip,
      take: params.take,
      include: {
        postThumbnail: true,
      },
      where: {
        ...condition
      },
      orderBy: {
        createdAt: query.sort
      }
    }),
    prisma.posts.count({
      where: {
        ...condition
      }
    })
  ])
  return { data, count }
}

export const getById = async (params: ParamId) => {
  return await prisma.posts.findUnique({
    where: {
      id: params.id
    },
    include: {
      postImages: true,
      postThumbnail: true,
    }
  })
}

export const getByReferenceId = async (params: ParamId) => {
  return await prisma.posts.findMany({
    where: {
      categoryId: params.id
    },
    include: {
      postThumbnail: true,
    }
  })
}

export const update = async (params: ParamId, body: UpdateBody) => {
  return await prisma.posts.update({
    data: body,
    where: {
      id: params.id
    }
  })
}

export const deletePostImages = async (params: ParamId) => {
  const postImages = await prisma.post_images.findMany({
    where: {
      postId: params.id
    }
  })
  if (postImages.length) {
    await prisma.post_images.deleteMany({
      where: {
        postId: params.id
      }
    })
  }
}


export const deletePostThumbnail = async (params: ParamId) => {
  const postThumbnail = await prisma.post_thumbnails.findFirst({
    where: {
      postId: params.id
    }
  })
  if (postThumbnail !== null) {
    await prisma.post_thumbnails.delete({
      where: {
        postId: params.id
      }
    })
  }
}

export const deleteById = async (params: ParamId) => {
  return await prisma.posts.delete({
    where: {
      id: params.id
    }
  })
}