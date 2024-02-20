import { hydrate } from 'solid-js/web';
import { MetaProvider } from '@solidjs/meta';
import Browser from './Browser';

hydrate(
  () => (
    <MetaProvider>
      <Browser />
    </MetaProvider>
  ),
  document.getElementById('root')
);
