import './loader.css';
import loadingLight from './Double Ring-1s-200px.svg'
import loadingDark from './Double Ring-1s-200px (1).svg'
import userContext from '../../Context/UserContext/userContext';
import { useContext } from 'react';
export default function Loader() {
    const {mode} = useContext(userContext);
    return (
        <div className='loader'>
            <img src={mode === 'light' ? loadingLight : loadingDark} alt="" />
        </div>
    )
}
