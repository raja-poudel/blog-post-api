import jwt from 'jsonwebtoken'
import { messages } from '../messages'
import { checkPropertiesExist } from '../helpers'

export const generateAccessToken = async (user: object) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3s' })
}

export const generateRefreshToken = async (user: object) => {
  return jwt.sign(user, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '1y' })
}

export const verifyToken = async (request: any, reply: any) => {
  const bearerHeader = request.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]

    request.token = bearerToken
  } else {
    reply.status(403).send(messages.forbiddenAccess)
  }
}

export const authenticateToken = async (request: any, reply: any) => {
  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) reply.status(401).send(messages.unthorizedAccess)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
    if (err) {
      reply.status(403).send(messages.forbiddenAccess)
    } else {
      request.account = account
    }
  })
}

export const validateSignIn = async (request: any, reply: any) => {
  const required = ['email', 'password'],
    optional = [];
  if (!checkPropertiesExist(request.body, required, optional)) {
    reply.status(400).send(messages.clientDataError)
  }
}

export const validateToken = async (request: any, reply: any) => {
  const required = ['token'],
    optional = [];
  if (!checkPropertiesExist(request.body, required, optional)) {
    reply.status(400).send(messages.clientDataError)
  }
}

export const validateSignUp = async (request: any, reply: any) => {
  const required = ['fullName', 'email', 'phone', 'password', 'confirmPassword'],
    optional = ['address', 'city', 'stateId', 'countryId', 'avatarId', 'active'];
  if (!checkPropertiesExist(request.body, required, optional)) {
    reply.status(400).send(messages.clientDataError)
  }
}

export const validateCreate = async (request: any, reply: any) => {
  const required = ['fullName', 'userRoleId', 'email', 'phone', 'password', 'confirmPassword'],
    optional = ['address', 'city', 'stateId', 'countryId', 'avatarId', 'active'];
  if (!checkPropertiesExist(request.body, required, optional)) {
    reply.status(400).send(messages.clientDataError)
  }
}

export const validatePasswordChange = async (request: any, reply: any) => {
  const required = ["password", "newPassword"],
    optional = [];
  if (!checkPropertiesExist(request.body, required, optional)) {
    reply.status(400).send(messages.clientDataError)
  }
}

export const validatePasswordReset = async (request: any, reply: any) => {
  const required = ["email", "password"],
    optional = [];
  if (!checkPropertiesExist(request.body, required, optional)) {
    reply.status(400).send(messages.clientDataError)
  }
}

export const validateUpdate = async (request: any, reply: any) => {
  const required = [],
    optional = ['fullName', 'userRoleId', 'email', 'phone', 'address', 'city', 'stateId', 'countryId', 'avatarId', 'active'];
  if (!checkPropertiesExist(request.body, required, optional)) {
    reply.status(400).send(messages.clientDataError)
  }
}