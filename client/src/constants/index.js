import { themeQuartz } from '@ag-grid-community/theming'
export const columnDepartments = [
	{ field: 'id' },
	{ field: 'name' },
	{ field: 'email' },
	{ field: 'budget' },
]

export const columnEmpoyees = [
	{ field: 'id' },
	{ field: 'post' },
	{ field: 'name' },
	{ field: 'full_name' },
	{ field: 'surname' },
	{ field: 'sex' },
	{ field: 'hired' },
]
export const defaultColDef = {
	flex: 1,
}
export const myTheme = themeQuartz.withParams({
	accentColor: '#70d8bd',
	backgroundColor: '#1F2A40',
	browserColorScheme: 'dark',
	chromeBackgroundColor: {
		ref: 'foregroundColor',
		mix: 0.07,
		onto: 'backgroundColor',
	},
	foregroundColor: '#FFF',
	headerBackgroundColor: '#232A37',
	headerFontSize: 14,
	headerTextColor: null,
})
