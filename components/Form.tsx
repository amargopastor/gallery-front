import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useImages from '../lib/images';

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

export const Form = () => {
  const [, { add_image }] = useImages();
  const router = useRouter();
  const {
    register, handleSubmit, reset, formState: { errors }, watch,
  } = useForm({
    defaultValues: {
      file: '', title: '', description: '', picture: '',
    },
  });

  const submit = handleSubmit((img_info) => {
    console.log(img_info);
    add_image(img_info);
    reset();
    router.push('/');
  });

  const internalState = watch();

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
          <input {...register('picture', { required: 'select an image' })} type="file" />
          <Error field="description" errors={errors} />
        </FormInput>
        {internalState.title === 'Discworld' && (<FormInput>🐢 The harder I work, the luckier I become.</FormInput>)}
        <FormInput>
          <button onClick={submit} type="button">
            Add image
          </button>
        </FormInput>
      </FormFlex>
    </div>
  );
};

export default Form;
