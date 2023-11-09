import { handleErrors } from "../helpers"
import { getAll, getByPaginate, getBySuggestion } from './controllers';

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


export const handleSuggestion = async (request: any, reply: any) => {
  try {
    const skip = Number(request.params.skip),
      take = Number(request.params.take);
    const { keyword } = request.query;

    if (keyword === undefined || keyword === '') {
      const { data, count } = await getByPaginate({ skip, take });
      reply.status(200).send({
        statusCode: 200,
        count,
        data
      })
    } else {
      const { data, count } = await getBySuggestion({ skip, take }, { keyword: keyword.trim() });
      reply.status(200).send({
        statusCode: 200,
        count,
        data
      })
    }
  } catch (error) {
    handleErrors(reply, error, 'retrive')
  }
}