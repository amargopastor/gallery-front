import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import useImages from '../../lib/images';

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

const Edit = () => {
  const router = useRouter();
  const [{ data }, { edit, remove }] = useImages();
  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm({
    defaultValues: { file: '', title: '', author: '' },
  });
  // FIX: Reload throws the following message: Cannot read properties of undefined (reading 'file')
  useEffect(() => {
    if (router.asPath !== router.route) {
      const def = data.filter((e) => e._id === router.query.id);

      setValue('file', def[0].file);
      setValue('title', def[0].title);
      setValue('author', def[0].author);
    }
  }, [router]);

  const submit = handleSubmit((img_info) => {
    edit(router.query.id as string, img_info);
    router.push('/');
  });

  const delete_img = () => {
    remove(router.query.id as string);
    router.push('/');
  };
  return (
    <section>
      <FormFlex>
        <Stack direction="row" alignItems="center" spacing={2}>
          <FormInput>
            <TextField disabled color="warning" id="standard-basic" label="File" variant="standard" {...register('file', { required: 'the image needs a title' })} />
            <Error field="title" errors={errors} />
          </FormInput>
          <FormInput>
            <TextField color="warning" id="standard-basic" label="Title" variant="standard" {...register('title', { required: 'the image needs a title' })} />
            <Error field="title" errors={errors} />
          </FormInput>
          <FormInput>
            <TextField color="warning" id="standard-basic" label="Author" variant="standard" {...register('author', { required: 'the image needs an author' })} />
            <Error field="author" errors={errors} />
          </FormInput>
        </Stack>
      </FormFlex>
      <FormFlex>
        <Stack margin="auto" direction="row" alignItems="center" spacing={2}>
          <FormInput>
            <Button color="warning" variant="contained" onClick={submit} type="button">
              Edit image
            </Button>
          </FormInput>
          <FormInput>
            <Button color="error" variant="contained" onClick={() => delete_img()} type="button">
              Delete image
            </Button>
          </FormInput>
        </Stack>
      </FormFlex>
    </section>
  );
};

export default Edit;
