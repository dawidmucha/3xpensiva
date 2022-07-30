import dateformat from 'dateformat'

const Item = (props) => {
	const onRemoveItemSubmit = (e) => {
		e.preventDefault();

		props.removeItem(props.id)
	}

	return (
		<div>
			{dateformat(props.data.createdAt, 'dddd, dS mmmm yyyy, H:MM:ss')}
			<form onSubmit={onRemoveItemSubmit} style={{display: 'inline'}}>
				<input type='submit' value='x' name='removeItem' id='removeItem' />
			</form>
		</div>
	)
}

export default Item