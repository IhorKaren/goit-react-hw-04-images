import { useState, useEffect } from 'react';
import { Container } from './Container/Container.styled';
import fetchImages from '../services/pixabayAPI';
import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

export function App() {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const galleryList = document.querySelector('ul');
    const lastImage = galleryList.lastElementChild;

    if (images.length > 12) {
      const { height: cardHeight } = lastImage.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 4,
        behavior: 'smooth',
      });
    }
  }, [images]);

  async function getImages(searchValue) {
    try {
      setLoading(true);

      if (searchValue !== value) {
        const responseImages = await fetchImages(searchValue, 1);
        setImages([...responseImages]);
        setValue(searchValue);
        setPage(1);
      }

      if (searchValue === value) {
        const responseImages = await fetchImages(searchValue, page + 1);
        setPage(prevPage => prevPage + 1);
        setImages([...images, ...responseImages]);

        return;
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  function handleLoadMoreClick() {
    getImages(value);
  }

  const showLoadMoreButton = images.length < 12 || images.length === 0;

  return (
    <Container>
      {loading && <Loader />}
      <SearchBar onSubmit={getImages} />
      <ImageGallery images={images} />
      {showLoadMoreButton ? null : <Button buttonClick={handleLoadMoreClick} />}
    </Container>
  );
}
