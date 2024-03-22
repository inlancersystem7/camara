import database from "@/WaterMelon/database";
import Photos from "@/WaterMelon/Model/Photos";
import { PhotosDto } from "@/Dtos/PhotosDto";

class DBPhotos {
  async savePhotos(favourite): Promise<void> {
    /**
     * To always keep only one record in profile
     * deleting the existing one
     */
    // console.log("favourite",favourite);
    await database.write(async () =>
      database.get<Photos>('Photos').create((favouriteObj) => {
        console.log("favourite.category",favourite.category );
        console.log("favourite.client",favourite.client );
        favouriteObj.key = favourite.key ?? '';
        favouriteObj.value = favourite.value ?? '';
        favouriteObj.category = favourite.category ?? '';
        favouriteObj.client = favourite.client ?? '';
      }));
    // console.log("favourite",favourite);
  }

  async getPhotosData(): Promise<PhotosDto[]> {
    try {
      const notesRecords = await database
        .get<Photos>('Photos')
        .query()
        .fetch();

      const transformedData = notesRecords.map((record) => {
        const { id, key, value, category, client } = record._raw;
        // console.log("dataRecord",record);

        if (value){
          return {
            id,
            key,
            category,
            value,
            client,
            // img: parsedValue.img,
            // date: parsedValue.date,
          };
        }

      });

      return transformedData;
    } catch (error) {
      console.error('Error fetching photo list:', error);
      throw error;
    }
  }

  async getFirstPhotosData(): Promise<PhotosDto[]> {
    try {
      const allRecords = await database
        .get<Photos>('Photos')
        .query()
        .fetch()
        // .then(records => records.slice(0, 10)); // Fetch only the first 10 records
      const lastRecords = allRecords.slice(-7);

      const transformedData = lastRecords.map((record) => {
        const { id, key, value, category, client } = record._raw;
        // console.log("dataRecord",record);

        if (value){
          return {
            id,
            key,
            category,
            value,
            client,
            // img: parsedValue.img,
            // date: parsedValue.date,
          };
        }
      });

      return transformedData.reverse();
    } catch (error) {
      console.error('Error fetching photo list:', error);
      throw error;
    }
  }

}

export const dbPhotos = new DBPhotos();
