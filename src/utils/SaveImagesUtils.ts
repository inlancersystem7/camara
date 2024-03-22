import RNFS from 'react-native-fs';
import moment from 'moment';

// Function to generate a folder to store images
export const generateImageFolder = async () => {
  try {
    const folderName = 'ThailandImages';
    const folderPath = `${RNFS.DocumentDirectoryPath}/${folderName}`;

    // Check if the folder exists, if not create it
    const isFolderExists = await RNFS.exists(folderPath);
    if (!isFolderExists) {
      await RNFS.mkdir(folderPath);
      console.log('Folder created:', folderPath);
    } else {
      console.log('Folder already exists:', folderPath);
    }

    return folderPath;
  } catch (error) {
    console.error('Error generating image folder:', error);
    throw error;
  }
};

export const localPath = async (image) => {
  console.log('Cache directory path is ', image)
  const fileName = image.split('/').pop();
  console.log('Filename is ', fileName)
  const newPath = `${RNFS.DocumentDirectoryPath}/${fileName}`; // You don't really need the `'file://` prefix
  console.log('newPath',newPath);

  try {
    await RNFS.writeFile(image, newPath, 'utf8');
    console.log('File saved successfully:', image);
  } catch (error) {
    console.error('Error saving file:', error);
  }

  const directoryPath = RNFS.DocumentDirectoryPath;
  console.log('directoryPath',directoryPath);
  // COPY the file
  // RNFS.writeFile(image, newPath, 'utf8')
  //   .then((success) => {
  //       console.log('IMG saved!');
  //       console.log(newPath);
  //   })
  //   .catch((err) => {
  //       console.log(err.message);
  //   });

  return newPath
}
// Function to save an image to the folder
export const saveImageToFolder = async (imageUri: string, folderPath: string) => {
  try {
    const fileName = `${moment().format('YYYYMMDDhhmmss')}.jpg`;

    // Check if the source file exists
    const isFileExists = await RNFS.exists(imageUri);
    if (!isFileExists) {
      throw new Error('Source file does not exist.');
    }

    const destinationPath = `${folderPath}/${fileName}`;
    await RNFS.moveFile(imageUri, destinationPath);

    // Verify if the file is saved to the folder
    const isSaved = await RNFS.exists(destinationPath);
    if (isSaved) {
      console.log('Image saved to folder:', destinationPath);
      return fileName;
    } else {
      throw new Error('Failed to save image to folder.');
    }
  } catch (error) {
    console.error('Error saving image to folder:', error);
    throw error;
  }
};

export const fetchImagesFromDirectory = async () => {
  const directoryPath = RNFS.DocumentDirectoryPath;
  try {
    // Get all files in the directory
    const files = await RNFS.readDir(directoryPath);
    console.log("files->",files);

    // Filter only image files (you can adjust the file extensions as needed)
    const imageFiles = files.filter(file => file.isFile() && isImageFile(file.name));

    // Extract file paths from file objects
    const imagePaths = imageFiles.map(file => file.path);
    console.log("imagePaths",imagePaths);

    return imagePaths;
  } catch (error) {
    console.error('Error fetching images from directory:', error);
    return [];
  }
};

const isImageFile = (fileName) => {
  const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Add more if needed
  const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  return supportedFormats.includes(extension);
};

export const fetchFile = async () => {
  const fileName = 'Camera/239b8888-414a-4268-8771-d523bb65c61b.jpg';
  const dirPath = '/data/user/0/com.camara/cache';
  const filePath = `${dirPath}/${fileName}`;
  // console.log("dirPath",dirPath);
  try {
    const content = await RNFS.readFile(filePath, 'utf8');
    console.log('File content:', content);
    return content;
  } catch (error) {
    console.error('Error fetching file:', error);
    return null;
  }
};

// Function to update image state (soft delete)
export const updateImageState = async (fileName: string, state: number) => {
  try {
    // Here you would update the state of the image in your database or metadata
    console.log(`Image ${fileName} state updated to ${state}`);
  } catch (error) {
    console.error('Error updating image state:', error);
    throw error;
  }
};

// Example usage
// const handleImageReceived = async (imageUri: string) => {
//   try {
//     const folderPath = await generateImageFolder();
//     const fileName = await saveImageToFolder(imageUri, folderPath);
//     // Soft delete the image (update its state)
//     await updateImageState(fileName, 0); // 0 indicates deleted state
//   } catch (error) {
//     console.error('Error handling image:', error);
//   }
// };
