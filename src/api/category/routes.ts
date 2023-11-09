import { FastifyInstance } from 'fastify'

import { authenticateToken } from '../auth/helpers'
import { validateCreate, validateId, validateSkipTake, validateUpdate } from './helpers';
import { CreateBody, ParamId, ParamSkipTake, UpdateBody } from './types';
import { handleCreate, handleGetAll, handleGetByPaginate, handleGetById, handleUpdate, handleDelete } from './handlers';

export default async (app: FastifyInstance, options: any, done: () => void) => {

  app.post<{
    Body: CreateBody
  }>("/", { preValidation: [validateCreate, authenticateToken] }, handleCreate);

  app.get("/all", handleGetAll);

  app.get<{
    Params: ParamSkipTake
  }>("/paginate/:skip/:take", { preValidation: [validateSkipTake] }, handleGetByPaginate)

  app.get<{
    Params: ParamId
  }>("/:id", { preValidation: [validateId] }, handleGetById);


  app.put<{
    Params: ParamId,
    Body: UpdateBody
  }>("/:id", { preValidation: [validateId, validateUpdate, authenticateToken] }, handleUpdate)

  app.delete<{
    Params: ParamId
  }>("/:id", { preValidation: [validateId] }, handleDelete);

  done()
}