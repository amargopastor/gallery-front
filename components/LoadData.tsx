import React, { ReactNode, useEffect } from 'react';
import useImages from '../lib/images';

const LoadData = ({ children }: {children: ReactNode}) => {
  const [{ data }, { load_images }] = useImages();
  useEffect(() => {
    load_images();
  }, [data]);
  return (
    <>
      {children}
    </>
  );
};

export default LoadData;
