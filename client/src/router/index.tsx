import React, { FC, Suspense } from 'react';
import Error from '~/pages/Error';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from './routes';
import { Layout } from '~/components/Layout';

export const Router: FC = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<div></div>}>
            <Switch>
              {routes.map(routeProps => (
                <Route {...routeProps} key={`${routeProps.path}`} />
              ))}
            </Switch>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
