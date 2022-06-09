/* eslint-disable react/prop-types */
const Image = ({ file, title, description }) => {
  console.log('img');
  return (
    <div>
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
    </div>
  );
};

export default Image;
