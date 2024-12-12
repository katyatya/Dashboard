import { Routes, Route } from 'react-router-dom'
import Sidebar from './scenes/global/Sidebar'
import Dashboard from './scenes/dashboard'
import Team from './scenes/team'
import Calendar from './scenes/calendar.jsx'
import { Toaster } from 'react-hot-toast'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'

function App() {
	const [theme, colorMode] = useMode()

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className='app'>
					<Sidebar />
					<main className='content'>
						<Routes>
							<Route path='/' element={<Dashboard />} />
							<Route path='/team' element={<Team />} />
							<Route path='/calendar' element={<Calendar />} />
						</Routes>
					</main>
				</div>
				<Toaster />
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}

export default App
