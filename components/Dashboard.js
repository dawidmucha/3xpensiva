import { useState, useEffect } from 'react'
import Item from './Item'
import { get, getDatabase, ref, set, child, remove } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid'

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
		const id = uuidv4()

		const value = e.target.addItem.value

		const db = getDatabase()

		set(ref(db, `TEST_UID/items/${id}`), {
			name: value
		}).then(() => {
			populateItems()
		}).catch(err => {
			console.error('Error', err)
		})
		
		setAddItem('')
	}

	const removeItem = (id) => {
		const db = getDatabase()

		remove(ref(db, `TEST_UID/items/${id}`)).then(() => {
			populateItems()
		}).catch(err => {
			console.error('Error', err)
		})	
	}

	const populateItems = () => {
		console.log('popule')
		const db = getDatabase();
		const dbRef = ref(getDatabase())

		get(child(dbRef, `TEST_UID/items`)).then(snapshot => {
			if(snapshot.exists()) {
				if(snapshot.val() != "") {
					setItems(snapshot.val())
				} else {
					setItems([])
				}
			} else {
				setItems([])
				set(ref(db, 'TEST_UID'), {items: ''})
				console.error('No data available 2')
			}
		}).then(() => {
		}).catch(err => {
			console.error('Error', err)
		})
	}

	return (
		<div>
			{Object.entries(items).map(([key, val]) => {
				return <Item key={key} id={key} name={val.name} removeItem={(key) => removeItem(key)}/>
			})}

			<form onSubmit={(e) => onAddItemSubmit(e)}>
				<input type='text' value={addItem} id='addItem' name='addItem' onChange={(e) => onAddItemChange(e)} />
				<input type='submit' value='+' />
			</form>
		</div>
	)
}

export default Dashboard