import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from './helpers';
import { messages } from '../messages';
import { getAuth, getProfile, signUp, changePassword, resetPassword, getByPaginate, getUser, createUser, updateUser, deleteUser } from './controllers';
import { getByReferenceId, deleteById } from '../login-avatar/controllers';
import { handleErrors } from '../helpers';

export const handleSignIn = async (request: any, reply: any) => {
  try {
    const { email, password } = request.body
    const auth = await getAuth({ email, password })
    const passwordMatch = bcrypt.compareSync(password, auth?.password || '')

    if (!passwordMatch) {
      reply.status(400).send(messages.invalidSignin)
    } else {
      const user = await getProfile({ email })

      const result: any = user
      const userProfile = { account: user?.email, userId: user?.id }

      result.accessToken = await generateAccessToken(userProfile)
      result.refreshToken = await generateRefreshToken(userProfile)

      reply.send({ statusCode: 200, data: result })
    }
  } catch (error) {
    handleErrors(reply, error, 'retrive')
  }

}

export const handleVerifyToken = async (request: any, reply: any) => {
  try {
    const accessToken = request.body.token
    if (accessToken === null) {
      reply.status(401).send(messages.unthorizedAccess)
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, account) => {
      if (err) {
        reply.status(403).send(messages.forbiddenAccess)
      } else {
        reply.send({ statusCode: 200, accessToken })
      }
    })
  } catch (error) {
    reply.status(403).send(messages.forbiddenAccess)
  }
}

export const handleVerifyTokenRefreshToken = async (request: any, reply: any) => {
  try {
    const refreshToken = request.body.token

    if (refreshToken === null) {
      reply.status(401).send(messages.unthorizedAccess)
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, account) => {
      if (err) {
        reply.status(403).send(messages.forbiddenAccess)
      } else {
        reply.send({ statusCode: 200 })
      }
    })
  } catch (error) {
    reply.status(403).send(messages.forbiddenAccess)
  }

}

export const handleToken = async (request: any, reply: any) => {
  try {
    const refreshToken = request.body.token

    if (refreshToken === null) {
      reply.status(401).send(messages.unthorizedAccess)
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, account) => {
      if (err) {
        reply.status(403).send(messages.forbiddenAccess)
      } else {
        const userProfile = { account: account?.account, userId: account?.userId }
        const accessToken = await generateAccessToken(userProfile)

        reply.send({ statusCode: 200, accessToken })
      }
    })
  } catch (error) {
    reply.status(403).send(messages.forbiddenAccess)
  }

}

export const handleSignUp = async (request: any, reply: any) => {
  try {
    const response = await signUp(request.body);
    reply.send({
      ...messages.createOk,
      data: response
    })
  } catch (error) {
    handleErrors(reply, error, 'create')
  }
}

export const handleProfile = async (request: any, reply: any) => {
  try {
    const { account } = request?.account;
    const response = await getProfile({ email: account });
    reply.send({ statusCode: 200, data: response })
  } catch (error) {
    handleErrors(reply, error, 'retrive')
  }
}

export const handleChangePassword = async (request: any, reply: any) => {
  try {
    const { password, newPassword } = request.body;
    const { account } = request?.account;
    const response = await changePassword({ email: account, currentPassword: password, newPassword })

    response
      ? reply.send({
        statusCode: 200,
        message: "Password updated."
      })
      : reply.status(401).send({
        statusCode: 401,
        error: "Client side error",
        message: "The password isn't able to update."
      })
  } catch (error) {
    handleErrors(reply, error, 'update')
  }
}

export const handleResetPassword = async (request: any, reply: any) => {
  try {
    const { email, password } = request.body;
    const response = await resetPassword({ email, password })

    response
      ? reply.send({
        statusCode: 200,
        message: "Password updated."
      })
      : reply.status(401).send({
        statusCode: 401,
        error: "Client side error",
        message: "The password isn't able to update."
      })
  } catch (error) {
    handleErrors(reply, error, 'update')
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

export const handleUser = async (request: any, reply: any) => {
  try {
    const response = await getUser({ id: Number(request.params.id) });
    if (response === null) {
      reply.send(
        messages.doesNotExists
      )
    } else {
      reply.send({
        statusCode: 200,
        data: response
      })
    }

  } catch (error) {
    handleErrors(reply, error, 'retrive')
  }
}

export const handleCreateUser = async (request: any, reply: any) => {
  try {
    const response = await createUser(request.body);
    reply.send({
      ...messages.createOk,
      data: response
    })
  } catch (error) {
    handleErrors(reply, error, 'create')
  }
}

export const handleUpdateUser = async (request: any, reply: any) => {
  try {
    const id = Number(request.params.id)
    const response = await getUser({ id });
    if (response === null) {
      reply.send(
        messages.doesNotExists
      )
    } else {
      const response = await updateUser({ id }, request.body);
      reply.send({
        ...messages.updateOk,
        data: response
      })
    }
  } catch (error) {
    handleErrors(reply, error, 'update')
  }
}

export const handleDeleteUser = async (request: any, reply: any) => {
  try {
    const id = Number(request.params.id)
    const response = await getUser({ id });
    if (response === null) {
      reply.send(
        messages.doesNotExists
      )
    } else {
      const avatarResponse = await getByReferenceId({ referenceId: id });
      if (avatarResponse !== null) {
        await deleteById({ id: avatarResponse.id });
        await deleteUser({ id })
        reply.send(messages.deleteOk)
      } else {
        await deleteUser({ id });
        reply.send(messages.deleteOk)
      }
    }
  } catch (error) {
    handleErrors(reply, error, 'delete')
  }
}
