import { messages } from "../messages";

export const validateSkipTake = async (request: any, reply: any) => {
  const { skip, take } = request.params;
  if (skip === undefined || isNaN(Number(skip)) || take === undefined || isNaN(Number(take))) {
    reply.status(400).send(messages.clientDataError)
  }
}

