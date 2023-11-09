import { PrismaClient } from '@prisma/client'
import { ReferenceId, CreateBody, ParamId, } from "./types";

const prisma = new PrismaClient({});

export const getAllById = async (params: ReferenceId) => {
  const [data, count] = await prisma.$transaction([
    prisma.post_images.findMany({
      where: {
        postId: params.referenceId
      }
    }),
    prisma.post_images.count({
      where: {
        postId: params.referenceId
      }
    })
  ])
  return { data, count }
}

export const create = async (body: CreateBody) => {
  return await prisma.post_images.create({
    data: body
  })
}

export const getById = async (params: ParamId) => {
  return await prisma.post_images.findUnique({
    where: {
      id: params.id
    }
  })
}

export const deleteById = async (params: ParamId) => {
  return await prisma.post_images.delete({
    where: {
      id: params.id
    }
  })
}