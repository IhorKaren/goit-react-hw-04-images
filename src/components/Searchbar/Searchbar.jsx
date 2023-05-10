import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchFormErrorMessage,
} from './Searchbar.styled';

const validationSchema = Yup.object().shape({
  imageSearch: Yup.string().trim().required('Search field cannot be empty'),
});

const SearchBar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitForm = (data, e) => {
    onSubmit(data.imageSearch);
    reset();
  };

  const handleSearchInputChange = event => {
    setSearchValue(event.target.value);
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit(onSubmitForm)}>
        {errors.imageSearch && (
          <SearchFormErrorMessage>
            {errors.imageSearch?.message}
          </SearchFormErrorMessage>
        )}
        <SearchFormInput
          name="imageSearch"
          type="text"
          {...register('imageSearch')}
          onChange={handleSearchInputChange}
        />
        <SearchFormButton type="submit" disabled={!searchValue}>
          Search
        </SearchFormButton>
      </SearchForm>
    </Searchbar>
  );
};

export default SearchBar;
