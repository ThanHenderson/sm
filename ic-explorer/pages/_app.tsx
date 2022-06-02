/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { AppRouter } from '../routes/_app';
import { SSRContext } from '../utils/trpc';

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return process.env.BASE_URL;
};

export default withTRPC<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: true,
  responseMeta(opts) {
    const ctx = opts.ctx as SSRContext;

    if (ctx.status) {
      // If HTTP status set, propagate that
      return {
        status: ctx.status,
      };
    }

    const error = opts.clientErrors[0];
    if (error) {
      // Propagate http first error from API calls
      return {
        status: error.data?.httpStatus ?? 500,
      };
    }
    // For app caching with SSR see https://trpc.io/docs/caching
    return {};
  },
})(MyApp);
