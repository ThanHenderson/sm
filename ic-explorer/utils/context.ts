/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

interface CreateContextOptions {
  // session: Session | null
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
const createContextInner = async (_opts: CreateContextOptions) => ({});

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
const createContext = (
  opts: trpcNext.CreateNextContextOptions,
): Promise<Context> => createContextInner({});
// for API-response caching see https://trpc.io/docs/caching

export { createContextInner, createContext };
