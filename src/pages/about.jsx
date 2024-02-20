import { A } from '@solidjs/router';
import { Title } from '@solidjs/meta';

const Page = () => {
  return (
    <div>
      <Title>About us</Title>
      <h1>About us</h1>
      <A href="/">Home</A>
      <p>
        Edit <code>src/pages/about.jsx</code> to get started
      </p>
    </div>
  );
};

export default Page;
