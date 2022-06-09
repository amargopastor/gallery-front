import useSWR from 'swr';
import Form from '../components/Form';
import ImagesList from '../components/ImagesList';

const IndexPage = () => {
  const { data } = useSWR('/images');
  if (!data) {
    return <div>no images</div>;
  }
  return (
    <main>
      <div>
        <ImagesList images={data} />
      </div>
      <div>
        <Form />
      </div>
    </main>
  );
};

export default IndexPage;
