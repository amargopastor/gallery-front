import Image from './Image';

const ImagesList = ({ images }) => (
  <div>
    {images.map((img) => (
      <Image key={img._id} file={img.file} title={img.title} description={img.description} />
    ))}
  </div>
);

export default ImagesList;
