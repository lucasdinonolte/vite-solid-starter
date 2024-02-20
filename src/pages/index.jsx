import { A } from '@solidjs/router';
import { Title } from '@solidjs/meta';

const Page = () => {
  return (
    <div>
      <Title>Home</Title>
      <h1>Home page</h1>
      <div class="stack-y-s md:stack-y-xl">
        <p>
          Edit <code>src/pages/index.jsx</code> to get started
        </p>
        <A href="/about">About</A>
        <div>
          <div class="row">
            <p class="md:col-3/4">I go to half width on larger screens.</p>
            <p class="md:col-1/4">Me too</p>
          </div>
        </div>
        <p>Here’s my public Env Variable:</p>
        <pre>{import.meta.env.PUBLIC_ENV_VARIABLE}</pre>
      </div>
    </div>
  );
};

export default Page;
