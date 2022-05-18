import { v4 as uuid } from 'uuid';
import jimp from 'jimp';

export const addImage = async (buffer: any) => {
    let newName = `${uuid()}.jpg`;
    let tmpImg = await jimp.read(buffer);
    tmpImg.cover(500, 500).quality(80).write(`./public/media/${newName}`);
    return newName;
}