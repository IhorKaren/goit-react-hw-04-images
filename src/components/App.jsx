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
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        setLoadMore(true);

        if (value !== query) {
          const responseImages = await fetchImages(query, 1);

          if (responseImages.length === 0) {
            setImages([]);
            return toast(`Oops, no results were found for your search.`);
          }

          setValue(query);
          setImages([...responseImages]);
          setPage(1);
          return;
        }

        if (page > 1) {
          const responseImages = await fetchImages(query, page);

          if (responseImages.length < 12) {
            setLoadMore(false);
          }

          return setImages(s => [...s, ...responseImages]);
        }
      } catch {
        setLoadMore(false);
        toast(`All images found for your request!`);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [page, query, value]);

  function searchQuery(searchValue) {
    setQuery(searchValue);
  }

  function handleLoadMoreClick() {
    setPage(prevPage => prevPage + 1);
  }

  const showLoadMoreButton = images.length < 12 || !loadmore;

  return (
    <Container>
      {loading && <Loader />}
      <SearchBar onSubmit={searchQuery} />
      <ImageGallery images={images} />
      {showLoadMoreButton ? null : <Button buttonClick={handleLoadMoreClick} />}
      <ToastContainer autoClose={1500} />
    </Container>
  );
}
