import { PrismaClient } from '@prisma/client'
import { ReferenceId, CreateBody, ParamId, } from "./types";

const prisma = new PrismaClient({});

export const getByReferenceId = async (params: ReferenceId) => {
  return await prisma.post_thumbnails.findFirst({
    where: {
      postId: params.referenceId
    }
  })
}

export const create = async (body: CreateBody) => {
  return await prisma.post_thumbnails.create({
    data: body
  })
}

export const getById = async (params: ParamId) => {
  return await prisma.post_thumbnails.findUnique({
    where: {
      id: params.id
    }
  })
}

export const deleteById = async (params: ParamId) => {
  return await prisma.post_thumbnails.delete({
    where: {
      id: params.id
    }
  })
}