import ImagesList from '../components/ImagesList';
import useImages from '../lib/images';

const IndexPage = () => {
  const [{ data }] = useImages();
  // load_images();
  if (!data) {
    return <div>no images</div>;
  }
  return (
    <section>
      <ImagesList images={data} />
    </section>
  );
};

export default IndexPage;
