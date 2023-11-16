import { FastifyInstance } from 'fastify'
import { AuthHeaders, AuthParams, TokenBody, SignUpBody, ParamSkipTake, IdParam, CreateBody, UpdateBody } from './types'
import { handleSignIn, handleVerifyToken, handleVerifyTokenRefreshToken, handleToken, handleSignUp, handleProfile, handleChangePassword, handleResetPassword, handleGetByPaginate, handleUser, handleCreateUser, handleUpdateUser, handleDeleteUser } from './handlers'
import { validateSignIn, validateToken, validateSignUp, validatePasswordChange, validatePasswordReset, validateCreate, validateUpdate, authenticateToken } from './helpers';
import { validateSkipTake, validateId } from '../helpers';

export default async (app: FastifyInstance, options: any, done: () => void) => {
  app.post<{
    Body: AuthParams
  }>('/sign-in', { preValidation: [validateSignIn] }, handleSignIn)

  app.post<{
    Body: TokenBody
  }>("/verify", { preValidation: [validateToken] }, handleVerifyToken);

  app.post<{
    Body: TokenBody
  }>("/verify-refresh-token", { preValidation: [validateToken] }, handleVerifyTokenRefreshToken)

  app.post<{
    Body: TokenBody
  }>('/token', { preValidation: [validateToken] }, handleToken)

  app.post<{
    Params: SignUpBody
  }>('/sign-up', { preValidation: [validateSignUp] }, handleSignUp)

  app.get<{
    Headers: AuthHeaders
  }>("/profile", { preValidation: [authenticateToken] }, handleProfile)

  app.put("/change/password", { preValidation: [authenticateToken, validatePasswordChange] }, handleChangePassword)

  app.put("/reset/password", { preValidation: [authenticateToken, validatePasswordReset] }, handleResetPassword)

  app.get<{
    Params: ParamSkipTake
  }>("/user/:skip/:take", { preValidation: [validateSkipTake, authenticateToken] }, handleGetByPaginate)

  app.get<{
    Params: IdParam,
    Headers: AuthHeaders
  }>("/user/:id", { preValidation: [validateId, authenticateToken] }, handleUser)

  app.post<{
    Params: CreateBody,
    Headers: AuthHeaders
  }>('/user', { preValidation: [authenticateToken, validateCreate] }, handleCreateUser)

  app.put<{
    Params: UpdateBody,
    Headers: AuthHeaders
  }>('/user/:id', { preValidation: [authenticateToken, validateId, validateUpdate] }, handleUpdateUser)

  app.delete<{
    Params: IdParam,
    Headers: AuthHeaders
  }>('/user/:id', { preValidation: [authenticateToken, validateId] }, handleDeleteUser)


  done()
} 
