import database from "@/WaterMelon/database";
import Photos from "@/WaterMelon/Model/Photos";
import { CategoriesDto } from "@/Dtos/CategoriesDto";

class DBPhotos {
  async savePhotos(favourite): Promise<void> {
    /**
     * To always keep only one record in profile
     * deleting the existing one
     */
    // console.log("favourite",favourite);
    await database.write(async () =>
      database.get<Photos>('Photos').create((favouriteObj) => {
        // console.log("favourite.key",favourite.data.key );
        // console.log("favourite.value",favourite.data.value );
        // console.log("favourite.category",favourite.data.category );
        favouriteObj.key = favourite.data.key ?? '';
        favouriteObj.value = favourite.data.value ?? '';
        favouriteObj.category = favourite.data.category ?? '';
      }));
    // console.log("favourite",favourite);
  }

  async getPhotosData(): Promise<CategoriesDto[]> {
    try {
      const notesRecords = await database
        .get<Photos>('Photos')
        .query()
        .fetch();

      const transformedData = notesRecords.map((record) => {
        const { id, key, value, category } = record._raw;
        // console.log("dataRecord",record);

        if (value){
          return {
            id,
            key,
            category,
            value,
            // img: parsedValue.img,
            // date: parsedValue.date,
          };
        }

      });

      // console.log("transformedData",transformedData);
      return transformedData;
    } catch (error) {
      console.error('Error fetching photo list:', error);
      throw error;
    }
  }
}

export const dbPhotos = new DBPhotos();
