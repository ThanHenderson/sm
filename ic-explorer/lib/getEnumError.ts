import { z } from 'zod';

/**
 * return a custom error map for an invalid enum error, because zod is a little dumb
 * @param message the error message
 * @returns the error map
 */
const getEnumError = (message: string) => {
  const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_enum_value) {
      return { message };
    }
    return { message: ctx.defaultError };
  };
  return customErrorMap;
};

export default getEnumError;
