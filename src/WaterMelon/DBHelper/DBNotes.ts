import database from '@/WaterMelon/database';
import Notes from "@/WaterMelon/Model/Notes";
import { NotesDto } from "@/DTOs/NotesDto";


class DBNotes {
	async saveNotes(favourite): Promise<void> {
		/**
         * To always keep only one record in profile
         * deleting the existing one
         */
		console.log("favourite",favourite);
		await database.write(async () =>
			database.get<Notes>('Notes').create((favouriteObj) => {
				console.log("favourite.key",favouriteObj.key);
				console.log("favourite.value",favouriteObj.value);
				favouriteObj.key = favourite.data.key ?? '';
				favouriteObj.value = favourite.data.value ?? '';
			}));
		console.log("sss");
	}

	// eslint-disable-next-line class-methods-use-this
	async getNotesData(): Promise<NotesDto[]> {
		try {
			const notesRecords = await database
				.get<Notes>('Notes')
				.query()
				.fetch();

			const transformedData = notesRecords.map((record) => {
				const { id, key, value } = record._raw;

				if (value){
				const parsedValue = JSON.parse(value);
				// console.log("parsedValue project ==>",parsedValue)

				return {
					id,
					key,
					note: parsedValue.note,
					date: parsedValue.date
				};
				}

			});

			return transformedData;
		} catch (error) {
			console.error('Error fetching Project list:', error);
			throw error;
		}
	}

	async getProjectRecord(projectId:string):Promise<NotesDto> {
		try {
			const projectData = await database
				.get<Notes>('Notes').find(projectId);
			const parsedValue = JSON.parse(projectData.value);
			const { key } = projectData;
			const { id } = projectData;
			return {
				id,
				key,
				note: parsedValue.name,
				date: parsedValue.date,
			};
		} catch (error) {
			console.error('Error fetching projectRecord:', error);
			throw error;
		}
	}

	async updateNoteRecord(index, favourite) {
		try {
			await database.write(async () => {
				const record = await database.get<Notes>('Notes').find(index);
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

	async deleteNoteRecord(id) {
		try {
			await database.write(async () => {
				const record = await database.get('Notes').find(id);
				await record.destroyPermanently();
				console.log('Record deleted successfully');
				await database.get('Notes').query().fetch();
			});
		} catch (error) {
			console.error('Error deleting record:', error);
			throw error;
		}
	}
}
export const dbNotes = new DBNotes();
