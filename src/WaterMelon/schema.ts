import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
	version: 1,
	tables: [
		tableSchema({
			name: 'Categories',
			columns: [
				{ name: 'key', type: 'string' },
				{ name: 'value', type: 'string' },
			],
		}),
		tableSchema({
			name: 'Photos',
			columns: [
				{ name: 'key', type: 'string' },
				{ name: 'value', type: 'string' },
				{ name: 'category', type: 'string' },
			],
		}),
		tableSchema({
			name: 'Client',
			columns: [
				{ name: 'key', type: 'string' },
				{ name: 'value', type: 'string' },
			],
		}),
	],
});
