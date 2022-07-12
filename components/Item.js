const Item = (props) => {
	const onRemoveItemSubmit = (e) => {
		e.preventDefault();

		const items = localStorage.getItem('items').split(',')
		const itemsUpdated = items.filter(val => val != props.name)
		localStorage.setItem('items', itemsUpdated)
		props.populateItems()
	}

	return (
		<div>
			{props.name}
			<form onSubmit={onRemoveItemSubmit} style={{display: 'inline'}}>
				<input type='submit' value='x' name='removeItem' id='removeItem' />
			</form>
		</div>
	)
}

export default Item