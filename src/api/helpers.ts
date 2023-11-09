import { FastifyReply } from 'fastify';
import { Prisma } from '@prisma/client';

import { messages } from "./messages";

type ErrorType = 'create' | 'retrive' | 'update' | 'delete'

export const checkPropertiesExist = (body, required, optional) => {
  if (body === undefined) {
    return false;
  }
  const keys = Object.keys(body);
  if (!keys.length) {
    return false;
  }
  for (const prop of required) {
    if (!(prop in body)) {
      return false;
    }
  }
  for (const prop in body) {
    if (body[prop] === '') {
      return false;
    }
    if (!required.includes(prop) && !optional.includes(prop)) {
      return false;
    }
  }
  return true;
}

const errorMessage = (error, message) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2003') {
      message.statusCode = 422;
      message.message = `Foreign key contrainst error on field called ${error.meta.field_name} `;
    }
    if (error.code === 'P2002') {
      message.statusCode = 422;
      message.message = `Constrainst error on field called ${error.meta.target}`;
    }
    if (error.code === 'P2025') {
      message.statusCode = 404;
      message.message = error.meta.cause;
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    message.statusCode = 400;
    message.message = error.message;
  }
  return message;
}

export const handleErrors = async (reply: FastifyReply, error: any, type: ErrorType) => {
  console.log(error);

  if (error instanceof Prisma.PrismaClientInitializationError) {
    reply.status(500).send(messages.initializationError);
  }
  if (type === 'delete') {
    const message = errorMessage(error, messages.deleteError);
    reply.status(500).send(message)
  } else if (type === 'create') {
    const message = errorMessage(error, messages.createError);
    reply.status(message.statusCode).send(message)
  } else if (type === 'update') {
    const message = errorMessage(error, messages.updateError);
    reply.status(message.statusCode).send(message)
  } else {
    reply.status(500).send(messages.retrieveError)
  }
}

export const validateSkipTake = async (request: any, reply: any) => {
  const { skip, take } = request.params;
  if (skip === undefined || isNaN(Number(skip)) || take === undefined || isNaN(Number(take))) {
    reply.status(400).send(messages.clientDataError)
  }
}

export const validateId = async (request: any, reply: any) => {
  const { id } = request.params;
  if (id === undefined || isNaN(Number(id))) {
    reply.status(400).send(messages.clientDataError)
  }
}
