import database from "@/WaterMelon/database";
import Photos from "@/WaterMelon/Model/Photos";
import { CategoriesDto } from "@/Dtos/CategoriesDto";
import { ClientDto } from "@/Dtos/ClientDto";
import Client from "@/WaterMelon/Model/Client";

class DBClient {
  async saveClient (favourite): Promise<void> {
    /**
     * To always keep only one record in profile
     * deleting the existing one
     */
    console.log("favourite",favourite);
    await database.write(async () =>
      database.get<Photos>('Client').create((favouriteObj) => {
        console.log("favourite.key",favourite.data.key );
        console.log("favourite.value",favourite.data.value );
        favouriteObj.key = favourite.data.key ?? '';
        favouriteObj.value = favourite.data.value ?? '';
      }));
    console.log("favourite",favourite);
  }

  async getClientData(): Promise<ClientDto[]> {
    try {
      const notesRecords = await database
        .get<Client>('Client')
        .query()
        .fetch();
      console.log("notesRecords==>",notesRecords);

      const transformedData = notesRecords.map((record) => {
        const { id, key, value } = record._raw;
        console.log("record._raw==>",record._raw)

        if (value){
          const parsedValue = JSON.parse(value);
          console.log("parsedValue project ==>",parsedValue)

          return {
            id,
            key,
            clientName:  parsedValue.clientName,
            clientNumber: parsedValue.clientNumber,
            clientBio: parsedValue.clientBio,
            clientProfile: parsedValue.clientProfile,
          };
        }

      });
      console.log("transformedDa==>",transformedData)
      return transformedData;
    } catch (error) {
      console.error('Error fetching Client list:', error);
      throw error;
    }
  }
}

export const dbClient = new DBClient();
