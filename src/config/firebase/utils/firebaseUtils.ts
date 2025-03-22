import admin from 'firebase-admin';
import { getDownloadURL } from 'firebase-admin/storage';
import serviceAccount from '../../../utils/serviceAccount.json';

export const initFirebase = (STORAGE_BUCKET: string) => {
  admin.initializeApp({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    credential: admin.credential.cert(serviceAccount as any),
    storageBucket: STORAGE_BUCKET,
  });

  return 'success';
};

export const uploadImage = async (base64: string, folder: string, fileName: string) =>
  new Promise((res, rej) => {
    try {
      const bucket = admin.storage().bucket();
      const filePath = folder + '/' + fileName;
      const base64EncodedImageString = base64.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');

      const file = bucket.file(filePath);

      file.save(imageBuffer, { contentType: 'image/jpeg' }, async function (error) {
        if (error) {
          rej({ error });
        } else {
          const downloadURL = await getDownloadURL(file);

          res({
            url: downloadURL,
          });
        }
      });
    } catch (err) {
      console.log(err);
      rej({ error: err.message });
    }
  });

export const deleteFile = async (url: string) => {
  try {
    const bucket = admin.storage().bucket();
    const urlParts = url.split('/');
    const fileParts = urlParts[urlParts.length - 1].split('?')[0];
    const filePath = decodeURIComponent(fileParts);
    console.log(filePath);
    await bucket.file(filePath).delete();
    console.log(`Archivo ${filePath} eliminado con éxito.`);
  } catch (error) {
    console.error(`Error al eliminar el archivo ${url}:`, error);
  }
};
