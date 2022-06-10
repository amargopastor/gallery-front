import useImages from '../lib/images';

const Image = ({
  id, file, title, description,
}) => {
  const [, { remove }] = useImages();
  return (
    <div>
      <p>
        ID:
        {' '}
        {id}
      </p>
      <p>
        File:
        {' '}
        {file}
      </p>
      <p>
        Title:
        {' '}
        {title}
      </p>
      <p>
        Description:
        {' '}
        {description}
      </p>
      <button type="button" onClick={() => remove(id)}>Delete image</button>
      {/* <button type="button" onClick={() => edit(id)}>Edit image</button> */}
    </div>
  );
};

export default Image;
