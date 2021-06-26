import type { RouteProps } from 'react-router-dom';
import { lazy } from 'react';

import NotFound from '~/pages/NotFound';
import { paths } from '~/router/paths';

export const routes: RouteProps[] = [
  {
    component: lazy(() => import('~/pages/Home')),
    exact: true,
    path: paths.home,
  },
  {
    component: NotFound,
    path: '*',
  },
];
