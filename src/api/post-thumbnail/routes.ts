import { FastifyInstance } from 'fastify'

import { authenticateToken } from '../auth/helpers'
import { validateReferenceId, validateCreate, validateId, } from './helpers';
import { CreateBody, ParamId, ReferenceId } from './types';
import { handleGetByReferenceId, handleCreate, handleDelete } from './handlers';

export default async (app: FastifyInstance, options: any, done: () => void) => {

  app.get<{
    Params: ReferenceId
  }>("/:referenceId", { preValidation: [validateReferenceId] }, handleGetByReferenceId);

  app.post<{
    Body: CreateBody
  }>("/", { preValidation: [validateCreate, authenticateToken] }, handleCreate);

  app.delete<{
    Params: ParamId
  }>("/:id", { preValidation: [validateId] }, handleDelete);

  done()
}