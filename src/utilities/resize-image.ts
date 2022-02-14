import sharp from 'sharp';

const resize = async ( filename: string, img_width: number,img_height: number) => {
try {
  await sharp(`./assets/images/${filename}.jpg`).resize ({
    width: img_width,
    height: img_height
  }).toFormat('jpg').toFile(`./assets/thumb/${filename}.jpg`);
  } catch (e) {
  await Promise.reject(new Error('missing input file'));
  }
};
export default resize;