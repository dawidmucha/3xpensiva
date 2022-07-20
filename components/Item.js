const Item = (props) => {
	const onRemoveItemSubmit = (e) => {
		e.preventDefault();

		props.removeItem(props.id)
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