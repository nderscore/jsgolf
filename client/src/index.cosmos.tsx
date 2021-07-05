import { mountDomRenderer } from 'react-cosmos/dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { decorators, fixtures, rendererConfig } from './cosmos.userdeps.js';

mountDomRenderer({ rendererConfig, decorators, fixtures });

if (import.meta.hot) {
  import.meta.hot.accept();
}
