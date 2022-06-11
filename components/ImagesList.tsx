import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ListSubheader } from '@mui/material';
import imageExists from '../utils/imageExists';

const ImagesList = ({ images }) => {
  const router = useRouter();
  return (
    <ImageList sx={{
      width: 500,
    }}
    >
      <ImageListItem key="Subheader" cols={3}>
        <ListSubheader component="div">Take a look of your photos...</ListSubheader>
      </ImageListItem>
      {images.map((img) => (
        <ImageListItem key={img._id}>
          <Image
            src={imageExists(img.file) ? `/${img.file}` : '/default.jpg'}
            width="150"
            height="200"
            alt={img.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={img.title}
            subtitle={img.author}
            actionIcon={
            (
              <IconButton
                onClick={() => { router.push(`/edit/${img._id}`); }}
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${img.title}`}
              >
                <EditIcon />
              </IconButton>
            )
          }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesList;
