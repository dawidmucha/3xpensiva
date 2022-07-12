import { useState, useEffect } from 'react'
import Item from './Item'

const Dashboard = () => {
	const [addItem, setAddItem] = useState('')
	const [items, setItems] = useState([])

	useEffect(() => {
		populateItems()
	}, [items.value])
	
	const onAddItemChange = (e) => {
		setAddItem(e.target.value)
	}

	const onAddItemSubmit = (e) => {
		e.preventDefault()

		let items
		if(localStorage.getItem('items') === null) {
			items = [e.target.addItem.value]
		} else {
			items = [...localStorage.getItem('items').split(','), e.target.addItem.value]
		}

		localStorage.setItem('items', items.join(','))
		setAddItem('')
		populateItems()
	}

	const populateItems = () => {
		setItems(localStorage.getItem('items').split(','))
	}

	return (
		<div>
			{items.map(item => {
				return <Item name={item} populateItems={populateItems} />
			})}
			<form onSubmit={(e) => onAddItemSubmit(e)}>
				<input type='text' value={addItem} id='addItem' name='addItem' onChange={(e) => onAddItemChange(e)} />
				<input type='submit' value='+' />
			</form>
		</div>
	)
}

export default Dashboard