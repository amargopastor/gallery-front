/* eslint-disable react/prop-types */
const Image = ({ title, description }) => {
  console.log('img');
  return (
    <div>
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
