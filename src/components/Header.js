import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = props => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>{props.title}</h1>
            { location.pathname === '/' && props.user !== null && <Button 
                onClick={props.onAdd} 
                color={props.showAddTask ? 'red' : 'green'}
                text={props.showAddTask ? 'Close' : 'Add'}
            /> }
        </header> 
    )
}

export default Header