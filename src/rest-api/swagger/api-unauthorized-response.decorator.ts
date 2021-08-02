import {
  ApiResponseOptions,
  ApiUnauthorizedResponse as BaseApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiUnauthorizedResponse = (options?: ApiResponseOptions) =>
  BaseApiUnauthorizedResponse({
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: 401,
        },

        message: {
          type: 'string',
          example: 'Unauthorized',
        },
      },
    },
    ...options,
  });
