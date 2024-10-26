type Image = {
  urls: {
    small: string;
  };
  alt_description: string;
};

type ImageCardProps = {
  image: Image;
  onImageClick: (image: Image) => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  return (
    <div onClick={() => onImageClick(image)}>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;