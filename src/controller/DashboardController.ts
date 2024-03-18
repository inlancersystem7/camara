import { makeAutoObservable } from 'mobx';
import { Storage } from "@/core/Storage";
// import { dbHelper } from '@/WaterMelon/DBHelper';

export class DashboardController {
	private mIsDrawerOpen: boolean | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	init() {

	}

	openDrawer() {
		this.isDrawerOpen = true;
	}

	closeDrawer() {
		this.isDrawerOpen = false;
	}

	async storeLastAttemptStep(
		sectionName: string,
		description: string,
		sectionTag: string,
		isOpenBook: string,
		isExamMode: boolean,
	): Promise<number> {
		await Storage.setItemAsync(Storage.keys.name, sectionName);
		await Storage.setItemAsync(Storage.keys.description, description);
		await Storage.setItemAsync(Storage.keys.lastAttemptedTag, sectionTag);
		await Storage.setItemAsync(Storage.keys.isOpenBook, isOpenBook);

		const ids = new Date().getMilliseconds();
		if (!isExamMode) {
			// await dbHelper.addToProgresh(sectionTag, sectionName, '', '', '', ids);
			// dbHelper.getOverAllProgressList().then((res) => {
			// 	console.log('getOverAllProgressList===', res);
			// });
		}

		return ids;
	}

	get isDrawerOpen() {
		return this.mIsDrawerOpen ?? false;
	}

	set isDrawerOpen(isDrawerOpen: boolean) {
		this.mIsDrawerOpen = isDrawerOpen;
	}
}
