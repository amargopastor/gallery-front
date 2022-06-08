/* eslint-disable react/prop-types */
import Image from './Image';

const ImagesList = ({ images }) => (
  <p>
    {images.map((img) => (
      <Image key={img.id} title={img.title} description={img.description} />
    ))}
  </p>
);

export default ImagesList;
