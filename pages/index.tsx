import useSWR from 'swr';
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
    </main>
  );
};

export default IndexPage;
