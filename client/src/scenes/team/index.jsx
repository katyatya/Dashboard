import React, { useState, useEffect, useMemo } from 'react'
import axios from '../../axios.js'
import { AgGridReact } from 'ag-grid-react'
import toast from 'react-hot-toast'
import { useDepartmentStore, useEmployeeStore } from '../../store/data.js'
import FormModal from '../../components/FormModal/FormModal.jsx'
import { styles } from './Team.module.css'
import {
	columnDepartments,
	columnEmpoyees,
	defaultColDef,
	myTheme,
} from '../../constants/index.js'
import Buttons from '../../components/Buttons.jsx'

const Team = () => {
	const [selectedRow, setSelectedRow] = useState()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [gridApi, setGridApi] = useState(null)

	const { fetchDepartmentItems, departments } = useDepartmentStore()

	const availableDepartments = departments.map(department => ({
		id: department.id,
		name: department.name,
	}))

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	const onDelete = async params => {
		try {
			const id = selectedRow.id
			await axios.delete(`/employees/${id}`)
			toast.success('Успешно')
			gridApi.refreshCells()
			gridApi.deselectAll()
			gridApi.refreshInfiniteCache()
			setSelectedRow()
		} catch (error) {
			toast.error('Произошла ошибка при удалении')
			console.log(error)
		}
	}

	const onAdd = () => {
		setIsModalOpen(!isModalOpen)
	}

	const onRowSelected = params => {
		if (params.event !== null) {
			setSelectedRow(params.data)
			if (params.data.id === selectedRow?.id) {
				setSelectedRow()
			}
		}
	}

	const rowSelection = useMemo(() => {
		return {
			mode: 'singleRow',
			enableClickSelection: true,
			enableDeselection: true,
		}
	}, [])

	const datasource = {
		getRows(params) {
			console.log(JSON.stringify(params, null, 1))
			const { startRow, endRow } = params
			let url = `http://localhost:5005/api/employees?`

			url += `_start=${startRow}&_end=${endRow}`
			fetch(url)
				.then(httpResponse => httpResponse.json())
				.then(response => {
					params.successCallback(response, 499)
				})
				.catch(error => {
					console.error(error)
					params.failCallback()
				})
		},
	}

	const onGridReady = params => {
		setGridApi(params.api)
		params.api.setGridOption('datasource', datasource)
	}

	useEffect(() => {
		fetchDepartmentItems()
	}, [])

	return (
		<>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
					marginTop: '10px',
				}}
			>
				<Buttons selectedRow={selectedRow} onAdd={onAdd} onDelete={onDelete} />
			</div>
			<div
				style={{
					display: 'flex',
					width: '100%',
					height: '80%',
					marginTop: '10px',
				}}
			>
				<div
					style={{
						width: '50%',
						height: '100%',
						marginRight: '20px',
						marginLeft: '20px',
					}}
				>
					<AgGridReact
						theme={myTheme}
						rowData={departments}
						columnDefs={columnDepartments}
						defaultColDef={defaultColDef}
						rowSelection='single'
					/>
				</div>

				<div style={{ width: '50%', height: '100%' }}>
					<FormModal
						open={isModalOpen}
						gridApi={gridApi}
						onClose={handleCloseModal}
						initialData={selectedRow}
						availableDepartments={availableDepartments}
					/>

					<AgGridReact
						theme={myTheme}
						onRowSelected={onRowSelected}
						rowSelection={rowSelection}
						columnDefs={columnEmpoyees}
						defaultColDef={defaultColDef}
						rowModelType='infinite'
						onGridReady={onGridReady}
						cacheBlockSize={100}
						maxConcurrentDatasourceRequests={1}
						infiniteInitialRowCount={100}
						maxBlocksInCache={100}
					/>
				</div>
			</div>
		</>
	)
}

export default Team
