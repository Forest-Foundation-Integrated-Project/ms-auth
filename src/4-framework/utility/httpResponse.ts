export enum httpCodes {
  ok = 200,
  created = 201,
  accepted = 202,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  internalServerError = 500,
}

export const httpResponse = {
  call: (httpCode: httpCodes, body: any) => {
    return {
      statusCode: httpCode,
      body: JSON.stringify(body),
    }
  },

  ok: (body: any) => {
    return {
      statusCode: httpCodes.ok,
      body: JSON.stringify(body),
    }
  },

  created: (body: any) => {
    return {
      statusCode: httpCodes.created,
      body: JSON.stringify(body),
    }
  },

  accepted: (body: any) => {
    return {
      statusCode: httpCodes.accepted,
      body: JSON.stringify(body),
    }
  },


  badRequest: (body: any) => {
    return {
      statusCode: httpCodes.badRequest,
      body: JSON.stringify(body),
    }
  },

  unauthorized: (body: any) => {
    return {
      statusCode: httpCodes.unauthorized,
      body: JSON.stringify(body),
    }
  },

  notFound: (body: any) => {
    return {
      statusCode: httpCodes.notFound,
      body: body ? JSON.stringify(body) : undefined,
    }
  },

  internalServerError: (body?: any) => {
    body = body || { error: 'Internal Server Error' }
    return {
      statusCode: httpCodes.internalServerError,
      body: JSON.stringify(body),
    }
  },
}
