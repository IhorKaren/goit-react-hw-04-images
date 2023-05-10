import { useState } from 'react';
import PageModal from 'components/Modal';
import { GalleryItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

function ImageGalleryItem({ webformatURL, tags, largeImageURL }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <GalleryItem onClick={openModal}>
        <ImageGalleryItemImage src={webformatURL} alt={tags} />
      </GalleryItem>
      {isModalOpen && (
        <PageModal closeModal={closeModal}>
          <img src={largeImageURL} alt={tags} />
        </PageModal>
      )}
    </>
  );
}

export default ImageGalleryItem;
