import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import useImages from '../lib/images';

const ErrorMessageText = styled.p`
  margin: 0;
  color: red;
`;
const FormFlex = styled.div`
  display: flex;
`;
const FormInput = styled.div`
  margin: 5px;
`;

const Input = styled('input')({
  display: 'none',
});

const Error = ({ field, errors }) => {
  if (errors[field]) {
    return <ErrorMessageText>{errors[field].message}</ErrorMessageText>;
  }
  return <></>;
};

export const AddForm = () => {
  const [, { add_image }] = useImages();
  const router = useRouter();
  const {
    register, handleSubmit, reset, formState: { errors }, watch,
  } = useForm({
    defaultValues: {
      title: '', author: '', file: '',
    },
  });

  const submit = handleSubmit((data) => {
    if (data.file.length > 0) {
      const img_info = {
        title: data.title,
        author: data.author,
        // eslint-disable-next-line dot-notation
        file: data.file[0]['name'] as string,
      };
      add_image(img_info);
      reset();
      router.push('/');
    }
  });

  const internalState = watch();

  return (
    <>
      <FormFlex>
        <Stack direction="row" alignItems="center" spacing={2}>
          <FormInput>
            <TextField color="warning" id="standard-basic" label="Title" variant="standard" {...register('title', { required: 'the image needs a title' })} />
            <Error field="title" errors={errors} />
          </FormInput>
          <FormInput>
            <TextField color="warning" id="standard-basic" label="Author" variant="standard" {...register('author', { required: 'the image needs an author' })} />
            <Error field="author" errors={errors} />
          </FormInput>
          {internalState.title === 'Discworld' && (<FormInput>🐢 The harder I work, the luckier I become.</FormInput>)}
          <FormInput>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" {...register('file', { required: 'select an image' })} />
              <Button color="warning" variant="contained" component="span">
                Upload File
              </Button>
            </label>
            <Error field="file" errors={errors} />
          </FormInput>
        </Stack>
      </FormFlex>
      <FormFlex>
        <Stack margin="auto">
          <FormInput>
            <Button color="warning" variant="contained" onClick={submit} type="button">
              Add image
            </Button>
          </FormInput>
        </Stack>
      </FormFlex>
    </>
  );
};

export default AddForm;
