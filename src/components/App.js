import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchHitsByQuery } from '../api';
import s from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    setQuery(e.target.search.value);
    setIsLoading(true);
    setImages([]);
    setPage(1);
  };

  const onNextPage = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  const onClickImage = url => {
    setShowModal(true);
    setLargeImageURL(url);
  };

  const onModalClose = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  useEffect(() => {
    if (query) {
      fetchGallery(query, page);
    }
  }, [query, page]);

  const fetchGallery = async (query, page) => {
    try {
      const response = await fetchHitsByQuery(query, page);
      setImages(prevImages => [...prevImages, ...response]);
      if (response.length < 12) {
        setShowBtn(false);
      } else {
        setShowBtn(true);
      }
      if (response.length === 0) {
        Notify.failure('No matches found!');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={onSubmit} />
      {query && <ImageGallery images={images} onClickImage={onClickImage} />}
      {isLoading && <Loader />}
      {showBtn && <Button onNextPage={onNextPage} />}
      {showModal && <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />}
    </div>
  );
};