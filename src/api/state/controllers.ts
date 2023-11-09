import { PrismaClient } from '@prisma/client'
import { ParamSkipTake, QueryParam } from "./types";
import { ReferenceId } from './types';

const prisma = new PrismaClient({});


export const getAll = async (param: ReferenceId) => {
  const condition = {
    countryId: param.referenceId
  }
  const [data, count] = await prisma.$transaction([
    prisma.states.findMany({
      where: condition
    }),
    prisma.states.count({
      where: condition
    })
  ])
  return { data, count }
}

export const getByPaginate = async (params: ParamSkipTake) => {
  const condition = {
    countryId: params.referenceId
  }
  const [data, count] = await prisma.$transaction([
    prisma.states.findMany({
      where: condition,
      skip: params.skip,
      take: params.take
    }),
    prisma.states.count({
      where: condition
    })
  ])
  return { data, count }
}

export const getBySuggestion = async (params: ParamSkipTake, query: QueryParam) => {

  const condition = {
    countryId: params.referenceId,
    areaName: {
      contains: query.keyword
    }
  };
  const [data, count] = await prisma.$transaction([
    prisma.states.findMany({
      where: condition,
      skip: params.skip,
      take: params.take
    }),
    prisma.states.count({ where: condition })
  ])
  return { data, count }
}