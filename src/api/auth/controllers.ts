import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
import { AuthParams, CreateBody, IdParam, ParamSkipTake, SignUpBody, PasswordBody, PasswordResetBody, UpdateBody } from './types'
const prisma = new PrismaClient()

export const getAuth = async (params: AuthParams) => {
  const user = await prisma.user_login.findUnique({
    where: {
      email: params.email
    }
  })

  return user
}

export const getProfile = async (params: AuthParams) => {
  const { email } = params
  const user = await prisma.user_login.findUnique({
    select: {
      id: true,
      fullName: true,
      userRoleId: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      stateId: true,
      userStates: {
        select: {
          areaName: true
        }
      },
      countryId: true,
      userCountries: {
        select: {
          countryName: true
        }
      },
      active: true,
      createdAt: true,
      avatar: true,
      userRole: {
        select: {
          userRole: true,
          roleName: true
        }
      }
    },
    where: {
      email: email
    }
  })
  return user;
}

export const signUp = async (body: SignUpBody) => {
  const { fullName, email, password, confirmPassword, phone, address, city, stateId, countryId, active } = body
  if (password === confirmPassword) {
    const salt = bcrypt.genSaltSync(9)
    const enycPassword = bcrypt.hashSync(password, salt)
    return await prisma.$transaction(async (prisma) => {
      const userRole = await prisma.user_role.findFirst({
        where: {
          roleName: 'User'
        }
      });

      const usersData = await prisma.user_login.create({
        data: {
          userRoleId: userRole.id,
          fullName,
          email,
          password: enycPassword,
          phone,
          address,
          city,
          stateId,
          countryId,
          active
        }
      });

      return usersData
    })
  }
}

export const changePassword = async (param: PasswordBody) => {
  const { email, currentPassword, newPassword } = param;
  const auth = await getAuth({ email, password: currentPassword })
  if (auth !== null) {
    const passwordMatch = bcrypt.compareSync(currentPassword, auth.password)
    if ((currentPassword !== newPassword) && passwordMatch) {
      const salt = bcrypt.genSaltSync(9)
      const enycPassword = bcrypt.hashSync(newPassword, salt)
      const usersData = await prisma.user_login.update({
        data: {
          password: enycPassword
        },
        where: {
          email: email
        }
      });
      return usersData
    }
  }
  return false
}

export const resetPassword = async (param: PasswordResetBody) => {
  const { email, password } = param;
  const auth = await getAuth({ email })
  if (auth !== null) {
    const salt = bcrypt.genSaltSync(9)
    const enycPassword = bcrypt.hashSync(password, salt)
    await prisma.user_login.update({
      data: {
        password: enycPassword
      },
      where: {
        email: email
      }
    });
    return true
  }
  return false
}

export const getByPaginate = async (params: ParamSkipTake) => {
  const [data, count] = await prisma.$transaction([
    prisma.user_login.findMany({
      select: {
        id: true,
        fullName: true,
        userRoleId: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        stateId: true,
        userStates: {
          select: {
            areaName: true
          }
        },
        countryId: true,
        userCountries: {
          select: {
            countryName: true
          }
        },
        active: true,
        avatar: true,
        createdAt: true,
        userRole: {
          select: {
            userRole: true,
            roleName: true
          }
        }
      },
      skip: params.skip,
      take: params.take
    }),
    prisma.user_login.count({})
  ])
  let modifiedData = [];
  if (data.length) {
    modifiedData = data.map(user => {
      const { createdAt, userRoleId, userRole, stateId, userStates, countryId, userCountries, ...other } = { ...user }
      const result = {
        ...other,
        stateId,
        stateName: userStates?.areaName,
        countryId,
        ...userCountries,
        userRoleId,
        ...userRole,
        createdAt
      }

      return result;
    })
  }

  return { data: modifiedData, count }
}

export const getUser = async (params: IdParam) => {
  const user = await prisma.user_login.findUnique({
    select: {
      id: true,
      fullName: true,
      userRoleId: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      stateId: true,
      userStates: {
        select: {
          areaName: true
        }
      },
      countryId: true,
      userCountries: {
        select: {
          countryName: true
        }
      },
      active: true,
      avatar: true,
      createdAt: true,
      userRole: {
        select: {
          userRole: true,
          roleName: true
        }
      },
    },
    where: {
      id: params.id
    }
  });

  if (user !== null) {
    const { createdAt, userRoleId, userRole, stateId, userStates, countryId, userCountries, ...other } = { ...user }
    const result = {
      ...other,
      stateId,
      stateName: userStates?.areaName,
      countryId,
      ...userCountries,
      userRoleId,
      userRole,
      createdAt,
    }

    return result
  }
  return user
}

export const createUser = async (body: CreateBody) => {
  const { userRoleId, fullName, email, password, confirmPassword, phone, address, city, stateId, countryId, active } = body
  if (password === confirmPassword) {
    const salt = bcrypt.genSaltSync(9)
    const enycPassword = bcrypt.hashSync(password, salt)
    const usersData = await prisma.user_login.create({
      data: {
        userRoleId,
        fullName,
        email,
        password: enycPassword,
        phone,
        address,
        city,
        stateId,
        countryId,
        active
      }
    })

    return usersData
  }
}

export const updateUser = async (params: IdParam, body: UpdateBody) => {
  const { userRoleId, fullName, email, phone, address, city, stateId, countryId, active } = body
  const usersData = await prisma.user_login.update({
    data: {
      userRoleId,
      fullName,
      email,
      phone,
      address,
      city,
      stateId,
      countryId,
      active
    },
    where: {
      id: params.id
    }
  })

  return usersData
}

export const deleteUser = async (params: IdParam) => {
  await prisma.user_login.delete({
    where: {
      id: params.id
    }
  })
}
