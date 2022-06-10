import Form from '../components/Form';
import ImagesList from '../components/ImagesList';
import useImages from '../lib/images';

const IndexPage = () => {
  const [{ data }] = useImages();
  // load_images();
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
