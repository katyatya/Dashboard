const Buttons = ({ selectedRow, onDelete, onAdd }) => {
	return (
		<>
			{selectedRow ? (
				<>
					<button onClick={onDelete}>Удалить</button>
					<button
						disabled
						onClick={onAdd}
						style={{ backgroundColor: 'grey', cursor: 'not-allowed' }}
					>
						Добавить
					</button>
					<button onClick={onAdd}>Обновить</button>
				</>
			) : (
				<>
					<button
						disabled
						onClick={onDelete}
						style={{ backgroundColor: 'grey', cursor: 'not-allowed' }}
					>
						Удалить
					</button>
					<button onClick={onAdd}>Добавить</button>
					<button
						disabled
						onClick={onAdd}
						style={{ backgroundColor: 'grey', cursor: 'not-allowed' }}
					>
						Обновить
					</button>
				</>
			)}
		</>
	)
}

export default Buttons
