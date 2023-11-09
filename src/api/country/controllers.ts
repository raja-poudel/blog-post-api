import { PrismaClient } from '@prisma/client'
import { ParamSkipTake, QueryParam } from "./types";

const prisma = new PrismaClient({});


export const getAll = async () => {
  const [data, count] = await prisma.$transaction([
    prisma.countries.findMany(),
    prisma.countries.count({})
  ])
  return { data, count }
}

export const getByPaginate = async (params: ParamSkipTake) => {
  const [data, count] = await prisma.$transaction([
    prisma.countries.findMany({
      skip: params.skip,
      take: params.take
    }),
    prisma.countries.count({})
  ])
  return { data, count }
}

export const getBySuggestion = async (params: ParamSkipTake, query: QueryParam) => {
  const condition = {
    countryName: {
      contains: query.keyword
    }
  };
  const [data, count] = await prisma.$transaction([
    prisma.countries.findMany({
      where: condition,
      skip: params.skip,
      take: params.take
    }),
    prisma.countries.count({ where: condition })
  ])
  return { data, count }
}