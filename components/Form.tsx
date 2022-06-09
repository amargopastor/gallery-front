import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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
  const {
    register, handleSubmit, reset, formState: { errors }, watch,
  } = useForm({
    defaultValues: { file_name: '', title: '', description: '' },
  });

  const submit = handleSubmit((data) => {
    // onAddImage(data);
    console.log(data);
    reset();
  });

  const internalState = watch();

  return (
    <div>
      <FormFlex>
        <FormInput>
          <input {...register('file_name', { required: 'the image needs a file name' })} placeholder="File name..." />
          <Error field="file_name" errors={errors} />
        </FormInput>
        <FormInput>
          <input {...register('title', { required: 'the image needs a title' })} placeholder="Title..." />
          <Error field="title" errors={errors} />
        </FormInput>
        <FormInput>
          <input {...register('description', { required: 'the image needs a description' })} placeholder="Description..." />
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
