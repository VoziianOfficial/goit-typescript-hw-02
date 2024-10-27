import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import fetchArticles from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "../../types"; // Импорт типа Image

// Тип состояния ошибки
type Error = string | null;

Modal.setAppElement("#root");

const App: React.FC = () => {
  // Инициализация состояний с типизацией
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (query === "") return;

    setIsLoading(true);
    setError(null);

    fetchArticles(query, currentPage)
      .then((newImages) => {
        if (newImages.length === 0) {
          setError("No images found. Try another search term.");
        } else {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, currentPage]);

  // Функция для обработки поиска
  const handleSearch = (newQuery: string, errorMessage?: string) => {
    if (errorMessage) {
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setQuery(newQuery);
    setImages([]);
    setCurrentPage(1);
  };

  // Функция для загрузки дополнительных изображений
  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Функция открытия модального окна
  const openModal = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Функция закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {!error && <ImageGallery images={images} onImageClick={openModal} />}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={loadMore} />}
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
