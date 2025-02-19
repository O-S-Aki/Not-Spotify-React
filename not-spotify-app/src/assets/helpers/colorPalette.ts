import ColorThief from 'color-thief-browser';

export const getDominantColor = (imageSrc: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const colorThief = new ColorThief();

      try {
        const palette = colorThief.getPalette(img, 10, 1);
        const chosenColor = getBestColorFit(palette);
        const rgbColor = `rgb(${chosenColor[0]}, ${chosenColor[1]}, ${chosenColor[2]})`;
        resolve(rgbColor);
      }
      catch (error) {
        reject(error)
      }
    };

    img.onerror = (err) => reject(err);
  });
}

export const getBrightness = (rgbArray: number[]) => {
  const redMultiplier = 0.299;
  const greenMultiplier = 0.587;
  const blueMultiplier = 0.114;

  return rgbArray[0] * redMultiplier + rgbArray[1] * greenMultiplier + rgbArray[2] * blueMultiplier;
}

export const getBestColorFit = (palette: any): number[] => {
  const chosenColor = palette.find((color: number[]) => getBrightness(color) > 80 || palette[0]);
  return chosenColor;
}