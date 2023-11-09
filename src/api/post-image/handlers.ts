import { handleErrors } from "../helpers"
import { messages } from "../messages";
import { getAllById, create, getById, deleteById } from './controllers';


export const handleGetAllByReferenceId = async (request: any, reply: any) => {
  try {
    const referenceId = Number(request.params.referenceId)
    const { data, count } = await getAllById({ referenceId })

    reply.status(200).send({
      statusCode: 200,
      count,
      data
    })
  } catch (error) {
    handleErrors(reply, error, 'retrive')
  }
}

export const handleCreate = async (request: any, reply: any) => {
  try {
    const response = await create(request.body);
    reply.status(201).send({ ...messages.createOk, data: response })
  } catch (error) {
    handleErrors(reply, error, 'create')
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