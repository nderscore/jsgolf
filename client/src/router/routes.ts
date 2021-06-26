import type { RouteProps } from 'react-router-dom';
import { lazy } from 'react';

import NotFound from '~/pages/NotFound';

export const routes: RouteProps[] = [
  {
    component: lazy(() => import('~/pages/Home')),
    exact: true,
    path: '/',
  },
  {
    component: NotFound,
    path: '*',
  },
];
