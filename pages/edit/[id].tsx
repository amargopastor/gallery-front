import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useImages from '../../lib/images';

const ErrorMessageText = styled.p`
  margin: 0;
  color: red;
`;
const FormFlex = styled.div`
  display: flex;
`;
const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const Error = ({ field, errors }) => {
  if (errors[field]) {
    return <ErrorMessageText>{errors[field].message}</ErrorMessageText>;
  }
  return <></>;
};

const Edit = () => {
  const router = useRouter();
  const [{ data }, { edit }] = useImages();
  const {
    register, handleSubmit, reset, setValue, formState: { errors },
  } = useForm({
    defaultValues: { file: '', title: '', description: '' },
  });
  // FIX: Reload throws the following message: Cannot read properties of undefined (reading 'file')
  useEffect(() => {
    if (router.asPath !== router.route) {
      console.log(router.query.id);
      console.log('data', data);
      const def = data.filter((e) => e._id === router.query.id);
      console.log('def', def);

      setValue('file', def[0].file);
      setValue('title', def[0].title);
      setValue('description', def[0].description);
    }
  }, [router]);

  const submit = handleSubmit((img_info) => {
    edit(router.query.id as string, img_info);
    reset();
    router.push('/');
  });
  return (
    <div>
      <FormFlex>
        <FormInput>
          <input {...register('file', { required: 'the image needs a file name' })} placeholder="File name..." />
          <Error field="file" errors={errors} />
        </FormInput>
        <FormInput>
          <input {...register('title', { required: 'the image needs a title' })} placeholder="Title..." />
          <Error field="title" errors={errors} />
        </FormInput>
        <FormInput>
          <input {...register('description', { required: 'the image needs a description' })} placeholder="Description..." />
          <Error field="description" errors={errors} />
        </FormInput>
        <FormInput>
          <button onClick={submit} type="button">
            Edit image
          </button>
        </FormInput>
      </FormFlex>
    </div>
  );
};

export default Edit;
