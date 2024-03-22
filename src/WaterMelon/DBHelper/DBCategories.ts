import database from "@/WaterMelon/database";
import Categories from "@/WaterMelon/Model/Categories";
import { CategoriesDto } from "@/Dtos/CategoriesDto";

class DBCategories {
  async saveCategories(favourite): Promise<void> {
    /**
     * To always keep only one record in profile
     * deleting the existing one
     */
    console.log("favourite",favourite);
    await database.write(async () =>
      database.get<Categories>('Categories').create((favouriteObj) => {
        console.log("favourite.key",favourite.data.key);
        console.log("favourite.value",favourite.data.value);
        favouriteObj.key = favourite.data.key ?? '';
        favouriteObj.value = favourite.data.value ?? '';
      }));
    console.log("favourite",favourite);
  }

  async getCategoriesData(): Promise<CategoriesDto[]> {
    try {
      const notesRecords = await database
        .get<Categories>('Categories')
        .query()
        .fetch();

      const transformedData = notesRecords.map((record) => {
        const { id, key, value } = record._raw;

        if (value){
          console.log("parsedValue project ==>",value)
          const parsedValue = JSON.parse(value);

          return {
            id,
            key,
            name: parsedValue.name,
            date: parsedValue.date,
          };
        }

      });

      console.log("transformedData",transformedData);
      return transformedData;
    } catch (error) {
      console.error('Error fetching categories list:', error);
      throw error;
    }
  }

  async deleteCategoryRecord(id) {
    try {
      await database.write(async () => {
        const record = await database.get('Categories').find(id);
        await record.destroyPermanently();
        console.log('Record deleted successfully');
        await database.get('Client').query().fetch();
      });
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error;
    }
  }
  async updateCategoryRecord(index, favourite) {
    try {
      await database.write(async () => {
        const record = await database.get<Categories>('Categories').find(index);
        // console.log("record ==>",record)
        if (record) {
          // const recordToUpdate = record[0];
          await record.update(() => {
            record.value = favourite.value ?? '';
          });
          console.log('Record updated successfully');
        }
      });
    } catch (error) {
      console.error('Error updating record:', error);
      throw error;
    }
  }

}

export const dbCategories = new DBCategories();
