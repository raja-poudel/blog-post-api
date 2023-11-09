import { PrismaClient } from '@prisma/client'
import { CreateBody, ParamId, ParamSkipTake, UpdateBody } from "./types";

const prisma = new PrismaClient({});

export const create = async (body: CreateBody) => {
  return await prisma.user_role.create({
    data: body
  })
}

export const getAll = async () => {
  const [data, count] = await prisma.$transaction([
    prisma.user_role.findMany(),
    prisma.user_role.count({})
  ])
  return { data, count }
}

export const getByPaginate = async (params: ParamSkipTake) => {
  const [data, count] = await prisma.$transaction([
    prisma.user_role.findMany({
      skip: params.skip,
      take: params.take
    }),
    prisma.user_role.count({})
  ])
  return { data, count }
}

export const getById = async (params: ParamId) => {
  return await prisma.user_role.findUnique({
    where: {
      id: params.id
    }
  })
}

export const update = async (params: ParamId, body: UpdateBody) => {
  return await prisma.user_role.update({
    data: body,
    where: {
      id: params.id
    }
  })
}

export const deleteById = async (params: ParamId) => {
  return await prisma.user_role.delete({
    where: {
      id: params.id
    }
  })
}