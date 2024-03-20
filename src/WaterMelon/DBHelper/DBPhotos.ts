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
        console.log("favourite.category",favourite.data.category );
        console.log("favourite.client",favourite.data.client );
        favouriteObj.key = favourite.data.key ?? '';
        favouriteObj.value = favourite.data.value ?? '';
        favouriteObj.category = favourite.data.category ?? '';
        favouriteObj.client = favourite.data.client ?? '';
      }));
    console.log("favourite",favourite);
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
}

export const dbPhotos = new DBPhotos();
