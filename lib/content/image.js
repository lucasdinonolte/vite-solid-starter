import { join } from 'node:path';
import sharp from 'sharp';

const DEFAULT_IMAGE_SIZES = [300, 600, 800, 1200];

/**
 * Resizes an image to an array of sizes.
 */
export const processImage =
  ({ sizes = DEFAULT_IMAGE_SIZES, outDir = './', urlPrefix = '' }) =>
    async (image) => {
      const sharpImage = sharp(join(process.cwd(), image));
      const metadata = await sharpImage.metadata();
      const placeholder = await sharpImage.resize(20).png().toBuffer();
      const srcSet = [];

      for (const size of sizes) {
        const name = `${size}.webp`;
        await sharp(image).resize(size).webp().toFile(join(outDir, name));

        srcSet.push(`/${urlPrefix}${name} ${size}w`);
      }

      return {
        width: metadata.width,
        height: metadata.height,
        srcSet,
        fallback: srcSet[0].split(' ')[0],
        placeholder: `data:image/png;base64,${placeholder.toString('base64')}`,
      };
    };
