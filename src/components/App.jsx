import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './Container/Container.styled';
import fetchImages from '../services/pixabayAPI';
import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

export default function App() {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadmore, setLoadMore] = useState(true);

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

    if (images.length > 0) {
      toast(`We found ${images.length} images for your request!`);
    }
  }, [images]);

  async function getImages(searchValue) {
    try {
      setLoading(true);

      if (searchValue !== value) {
        const responseImages = await fetchImages(searchValue, 1);

        if (responseImages.length === 0) {
          setImages([]);
          return toast(`Oops, no results were found for your search.`);
        }

        setLoadMore(true);
        setImages([...responseImages]);
        setValue(searchValue);
        setPage(1);
        return;
      }

      if (searchValue === value) {
        const responseImages = await fetchImages(searchValue, page + 1);

        if (responseImages.length < 12) {
          setLoadMore(false);
        }

        return setImages([...images, ...responseImages]);
      }
    } catch (error) {
      setLoadMore(false);
      toast(`All images found for your request!`);
    } finally {
      setLoading(false);
    }
  }

  function handleLoadMoreClick() {
    setPage(prevPage => prevPage + 1);
    getImages(value);
  }

  const showLoadMoreButton = images.length < 12 || !loadmore;

  return (
    <Container>
      {loading && <Loader />}
      <SearchBar onSubmit={getImages} />
      <ImageGallery images={images} />
      {showLoadMoreButton ? null : <Button buttonClick={handleLoadMoreClick} />}
      <ToastContainer autoClose={1500} />
    </Container>
  );
}
