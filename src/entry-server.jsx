import {
  renderToString,
  generateHydrationScript,
  getAssets,
} from 'solid-js/web';
import { MetaProvider } from '@solidjs/meta';
import Server from './Server';

export function render(url) {
  let tags = [];
  const body = renderToString(() => (
    <MetaProvider tags={tags}>
      <Server tags={tags} url={url} />
    </MetaProvider>
  ));

  const hydration = generateHydrationScript();
  const meta = getAssets();

  return {
    meta,
    hydration,
    body,
  };
}
