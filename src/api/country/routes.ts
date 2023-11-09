import { FastifyInstance } from 'fastify'

import { ParamSkipTake, QueryParam } from './types';
import { validateSkipTake } from './helpers';
import { handleGetAll, handleGetByPaginate, handleSuggestion } from './handlers';

export default async (app: FastifyInstance, options: any, done: () => void) => {

  app.get("/all", handleGetAll);

  app.get<{
    Params: ParamSkipTake
  }>("/paginate/:skip/:take", { preValidation: [validateSkipTake] }, handleGetByPaginate)

  app.get<{
    Params: ParamSkipTake
    Query: QueryParam
  }>("/suggestion/:skip/:take", { preValidation: [validateSkipTake] }, handleSuggestion)

  done()
}