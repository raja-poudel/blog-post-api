import { handleErrors } from "../helpers"
import { messages } from "../messages";
import { create, getAll, getByPaginate, getById, update, deleteById } from './controllers';

export const handleCreate = async (request: any, reply: any) => {
  try {
    const response = await create(request.body);
    reply.status(201).send({ ...messages.createOk, data: response })
  } catch (error) {
    handleErrors(reply, error, 'create')
  }
}

export const handleGetAll = async (request: any, reply: any) => {
  try {
    const { data, count } = await getAll();
    reply.status(200).send({
      statusCode: 200,
      count,
      data
    })
  } catch (error) {
    handleErrors(reply, error, 'retrive')
  }
}

export const handleGetByPaginate = async (request: any, reply: any) => {
  try {
    const skip = Number(request.params.skip),
      take = Number(request.params.take);
    const { data, count } = await getByPaginate({ skip, take });
    reply.status(200).send({
      statusCode: 200,
      count,
      data
    })
  } catch (error) {
    handleErrors(reply, error, 'retrive')
  }
}

export const handleGetById = async (request: any, reply: any) => {
  try {
    const id = Number(request.params.id)
    const response = await getById({ id })
    if (response === null) {
      reply.status(404).send(messages.notFound)
    }
    reply.status(200).send({
      statusCode: 200,
      data: response
    })
  } catch (error) {
    handleErrors(reply, error, 'retrive')
  }
}

export const handleUpdate = async (request: any, reply: any) => {
  try {
    const id = Number(request.params.id)
    const response = await getById({ id })
    if (response === null) {
      reply.status(404).send(messages.notFound)
    }
    const updateResponse = await update({ id }, request.body)
    reply.status(200).send({ ...messages.updateOk, data: updateResponse })
  } catch (error) {
    handleErrors(reply, error, 'update')
  }
}

export const handleDelete = async (request: any, reply: any) => {
  try {
    const id = Number(request.params.id)
    const response = await getById({ id })
    if (response === null) {
      reply.status(404).send(messages.notFound)
    }
    await deleteById({ id })
    reply.status(200).send(messages.deleteOk)
  } catch (error) {
    handleErrors(reply, error, 'delete')
  }
}