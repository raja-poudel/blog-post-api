import { checkPropertiesExist } from "../helpers";
import { messages } from "../messages";

export const validateCreate = async (request: any, reply: any) => {
  const required = ['name', 'categoryId'],
    optional = ['slug', 'overview', 'published'];
  if (!checkPropertiesExist(request.body, required, optional)) {
    reply.status(400).send(messages.clientDataError)
  }
}

export const validateSkipTake = async (request: any, reply: any) => {
  const { skip, take } = request.params;
  if (skip === undefined || isNaN(Number(skip)) || take === undefined || isNaN(Number(take))) {
    reply.status(400).send(messages.clientDataError)
  }
}

export const validateQuery = async (request: any, reply: any) => {
  const sortTypes = ['desc', 'asc']
  const { sort } = request.query;
  if (sort === undefined || !sortTypes.includes(sort)) {
    reply.status(400).send(messages.clientDataError)
  }
};

export const validateId = async (request: any, reply: any) => {
  const { id } = request.params;
  if (id === undefined || isNaN(Number(id))) {
    reply.status(400).send(messages.clientDataError)
  }
}


export const validateUpdate = async (request: any, reply: any) => {
  const required = [],
    optional = ['name', 'slug', 'overview', 'published', 'categoryId'];
  if (!checkPropertiesExist(request.body, required, optional)) {
    reply.status(400).send(messages.clientDataError)
  }
}