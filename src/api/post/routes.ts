import { FastifyInstance } from 'fastify'

import { authenticateToken } from '../auth/helpers'
import { validateCreate, validateId, validateSkipTake, validateQuery, validateUpdate } from './helpers';
import { CreateBody, ParamId, ParamSkipTake, KeywordSortQuery, UpdateBody } from './types';
import { handleCreate, handleGetAll, handleGetByPaginate, handleGetById, handleGetReferenceId, handleUpdate, handleDelete } from './handlers';

export default async (app: FastifyInstance, options: any, done: () => void) => {

  app.post<{
    Body: CreateBody
  }>("/", { preValidation: [validateCreate, authenticateToken] }, handleCreate);

  app.get("/all", handleGetAll);

  app.get<{
    Params: ParamSkipTake
    Query: KeywordSortQuery
  }>("/paginate/:skip/:take", { preValidation: [validateSkipTake, validateQuery] }, handleGetByPaginate)

  app.get<{
    Params: ParamId
  }>("/:id", { preValidation: [validateId] }, handleGetById);

  app.get<{
    Params: ParamId
  }>("/reference/:id", { preValidation: [validateId] }, handleGetReferenceId);

  app.put<{
    Params: ParamId,
    Body: UpdateBody
  }>("/:id", { preValidation: [validateId, validateUpdate, authenticateToken] }, handleUpdate)

  app.delete<{
    Params: ParamId
  }>("/:id", { preValidation: [validateId] }, handleDelete);

  done()
}