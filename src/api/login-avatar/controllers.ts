import { PrismaClient } from '@prisma/client'
import { ReferenceId, CreateBody, ParamId, } from "./types";

const prisma = new PrismaClient({});

export const getByReferenceId = async (params: ReferenceId) => {
  return await prisma.login_avatars.findFirst({
    where: {
      userId: params.referenceId
    }
  })
}

export const create = async (body: CreateBody) => {
  return await prisma.login_avatars.create({
    data: body
  })
}

export const getById = async (params: ParamId) => {
  return await prisma.login_avatars.findUnique({
    where: {
      id: params.id
    }
  })
}

export const deleteById = async (params: ParamId) => {
  return await prisma.login_avatars.delete({
    where: {
      id: params.id
    }
  })
}