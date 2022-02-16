
import sharp from 'sharp';

const resize = async ( filename : string,width: number ,height: number) : Promise<void | unknown> => {
    const done: boolean|unknown = await sharp(`./assets/images/${filename}.jpg`)
    .resize ({width ,height})
    .toFormat('jpg')
    .toFile(`./assets/thumb/${filename}.jpg`).catch((err) => {
        return ['false',err.message];
    }) 
    return done;
};
export default resize;