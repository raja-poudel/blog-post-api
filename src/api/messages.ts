export const messages = {
  welcome: {
    statusCode: 200,
    message: `Welcome to Real Estate API.`
  },
  initializationError: {
    statusCode: 500,
    error: `Initialization error`,
    messages: `Unable to establish the connection with the database.`
  },
  forbiddenAccess: {
    statusCode: 403,
    error: `Forbidden access`,
    message: `You are forbidden to access to make this request.`
  },
  clientDataError: {
    statusCode: 400,
    error: "Input Validation Error",
    message: "Data provided does not meet the expected criteria."
  },
  notFound: {
    statusCode: 404,
    error: "Not Found",
    message: "The record does not exist."
  },
  schemaError: {
    statusCode: 400,
    error: `Bad request`,
    message: `Provide all required data.`
  },
  createOk: {
    statusCode: 201,
    message: `The record creates successfully.`
  },
  createError: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `The record isn't able to enter.`
  },
  retrieveError: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `The record isn't able to retrieve.`
  },
  updateOk: {
    statusCode: 200,
    message: `The record updates successfully.`
  },
  updatePasswordError: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `The password isn't able to update.`
  },
  updateError: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `The record isn't able to update.`
  },
  deleteOk: {
    statusCode: 200,
    message: `The record deletes successfully.`
  },
  deleteError: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `The record isn't able to delete.`
  },
  deleteDependencyError: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `Items cannot be deleted due to dependencies from sales records or with other items.`
  },
  deleteDependencyErrorService: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `Services cannot be deleted due to dependencies from sales records.`
  },
  incorrectAction: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `Invalid action checks the requested values, parameters, or path.`
  },
  invalidSignin: {
    statusCode: 400,
    error: `Credentials error`,
    message: `Wrong credentials invalid email or password.`
  },
  unthorizedAccess: {
    statusCode: 401,
    error: `Authorization required`,
    message: `User authorization is required.`
  },
  duplicateEmail: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `This email address already exists in the sytem.`
  },
  duplicatePhone: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `This phone number already exists in the sytem.`
  },
  duplicateData: {
    statusCode: 409,
    error: `Internal Server Error`,
    message: `This data already exists remove the existing one first.`
  },
  receiptHeader: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `Can't create more than two receipt headers for one organization.`
  },
  duplicateImage: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `This record already relate with an image, remove the existing one first.`
  },
  duplicateId: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `This member ID already exists remove the existing one first.`
  },
  duplicateSKU: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `This SKU already related with another product.`
  },
  fileError: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `An invalid directory or large file size provides.`
  },
  fileDeleteError: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `Sorry, the file you have requested can't delete.`
  },
  notAllowedOnExists: {
    statusCode: 500,
    error: `Internal Server Error`,
    message: `Please remove an existing one to insert new data.`
  },
  duplicatePhoneEmail: {
    statusCode: 500,
    error: `Unique constraint violation`,
    message: `This phone number or email already exists in system.`
  },
  doesNotExists: {
    statusCode: 404,
    error: `Non-existent data`,
    message: `Record to get does not exist.`
  },
  deleteConflictComboError: {
    statusCode: 409,
    error: `Conflict`,
    message: `Can't delete this record because it's related with combo.`
  },
}