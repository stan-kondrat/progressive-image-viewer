import { useRef } from 'react'
import { Image } from './Image';

export function ImagePreview({ image }: { image?: Image }) {

  if (!image) {
    return (
      <div className="image-preview" >

      </div>
    )
  }

  const imageRef = useRef<HTMLImageElement>();

  var reader = new FileReader();
  reader.onload = (e) => {
    if (imageRef.current && e.target) {
      imageRef.current.src = e.target.result as string
    }
  }
  reader.readAsDataURL(new Blob([image.buffer]));

  return (

    <div
      title={image.name}
      className="image-preview"
      style={{ width: image.width, height: image.height }}
    >
      <img ref={imageRef as any} />
    </div>
  );
}
