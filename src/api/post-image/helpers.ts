import { checkPropertiesExist } from "../helpers";
import { messages } from "../messages";

export const validateReferenceId = async (request: any, reply: any) => {
  const { referenceId } = request.params;
  if (referenceId === undefined || isNaN(Number(referenceId))) {
    reply.status(400).send(messages.clientDataError)
  }
}

export const validateCreate = async (request: any, reply: any) => {
  const required = ['postId', 'fileName', 'url', 'size', 'uploadedAt'],
    optional = [];
  if (!checkPropertiesExist(request.body, required, optional)) {
    reply.status(400).send(messages.clientDataError)
  }
}

export const validateId = async (request: any, reply: any) => {
  const { id } = request.params;
  if (id === undefined || isNaN(Number(id))) {
    reply.status(400).send(messages.clientDataError)
  }
}