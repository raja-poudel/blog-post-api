import { FastifyInstance } from 'fastify'

import { ReferenceId, ParamSkipTake, QueryParam } from './types';
import { validateReferenceId, validateSkipTake } from './helpers';
import { handleGetAll, handleGetByPaginate, handleSuggestion } from './handlers';

export default async (app: FastifyInstance, options: any, done: () => void) => {

  app.get<{
    Params: ReferenceId
  }>("/all/:referenceId", { preValidation: [validateReferenceId] }, handleGetAll);

  app.get<{
    Params: ParamSkipTake
  }>("/paginate/:skip/:take/:referenceId", { preValidation: [validateSkipTake, validateReferenceId] }, handleGetByPaginate)

  app.get<{
    Params: ParamSkipTake
    Query: QueryParam
  }>("/suggestion/:skip/:take/:referenceId", { preValidation: [validateSkipTake, validateReferenceId] }, handleSuggestion)

  done()
}