const Page = ({ params }) => {
  const { slug } = params;
  return (
    <div>
      <pre>{JSON.stringify(slug, null, 2)}</pre>
    </div>
  );
};

export default Page;
