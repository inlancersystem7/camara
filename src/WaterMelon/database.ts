import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
import migrations from "@/WaterMelon/migrations";
import Categories from "@/WaterMelon/Model/Categories";
import Photos from "@/WaterMelon/Model/Photos";
import Client from "@/WaterMelon/Model/Client";

const adapter = new SQLiteAdapter({
	dbName: 'Camara',
	schema,
	// (You might want to comment it out for development purposes -- see Migrations documentation)
	migrations,
	// (optional database name or file system path)
	// dbName: 'myapp',
	// (recommended option, should work flawlessly out of the box on iOS. On Android,
	// additional installation steps have to be taken - disable if you run into issues...)
	jsi: true /* Platform.OS === 'ios' */,
	// (optional, but you should implement this method)
	onSetUpError: () => {
		// Database failed to load -- offer the user to reload the app or log out
	},
});

const database = new Database({
	adapter,
	modelClasses: [
		Categories,
		Photos,
		Client,
	],
	// actionsEnabled: true,
});

export default database;
// export { database };
