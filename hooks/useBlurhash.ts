import { useState, useEffect } from 'react';
import { decode } from 'blurhash';


const DEFAULT_BLUR_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgcBAp8WtHAAAAAASUVORK5CYII=';
const useBlurhash = (blurHash: string, width: number = 300, height: number = 300): string => {
  const [blurDataUrl, setBlurDataUrl] = useState<string>(DEFAULT_BLUR_DATA_URL);

  useEffect(() => {

    // Decode the BlurHash into pixel data
    const pixels = decode(blurHash, width, height);

    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Create an ImageData object
      const imageData = ctx.createImageData(width, height);
      imageData.data.set(pixels);

      // Draw the ImageData onto the canvas
      ctx.putImageData(imageData, 0, 0);

      // Convert the canvas to a data URL
      const blurHashURL = canvas.toDataURL();

      // Update the state with the generated data URL
      setBlurDataUrl(blurHashURL);
    }
  }, [blurHash, width, height]);

  return blurDataUrl;
};

export default useBlurhash;
