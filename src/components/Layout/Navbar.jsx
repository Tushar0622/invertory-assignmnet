import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getMachineListByType } from '../../store/actions/machineAction';
import { useDispatch } from 'react-redux';
import { setCurrentMachineType } from '../../store/actions/machineAction';


const MACHINE_TYPES = [
    {
        machineType: "ChainSaws",
        typeId: "ChainSaws_ID",
        id: "chain9875"
    },
    {
        machineType: "Bulldozers",
        typeId: "Bulldozers_ID",
        id: "bull1234"
    },
    {
        machineType: "Tractors",
        typeId: "Tractors_ID",
        id: "trac7487"
    }
]





const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMachineClick = (item) => {
        dispatch(getMachineListByType(item?.typeId));
        dispatch(setCurrentMachineType(item));
        // navigate(`/types/${item?.id}`);
        navigate(`/types/${item?.typeId}`);
    }

  return (

    <div class="tab-pane">
        <h3>Objector</h3>
        <button class="hamburger" onclick="toggleMenu()">
        </button>
        <div class="tab-buttons">
        <button class="tab-button active"><Link to="/">All</Link></button>
        {MACHINE_TYPES && MACHINE_TYPES.length > 0 && MACHINE_TYPES.map((item, index) => (
                         <button  className="tab-button" onClick={() => handleMachineClick(item)} key={item?.typeId}><Link>{item.machineType}</Link></button>
                    ))}
                    <button className="tab-button" ><Link to="/types">Manage Types</Link></button>
            {/* <button class="tab-button active" onclick="showTab('All')">All</button>
            <button class="tab-button" onclick="showTab('chainsaws')">Chainsaws</button>
            <button class="tab-button" onclick="showTab('bulldozers')">Bulldozers</button>
            <button class="tab-button" onclick="showTab('manage-types')">Manage Types</button> */}
        </div>
    </div>

    // <div className='nav_bar'>
    //     <div className='container'>
    //         <div className='d-flex align-items-center '>
    //             <p>Objectors</p>
    //             <ul className='list-style-none'>
    //                 <li><Link to="/">All</Link></li>
    //                 {MACHINE_TYPES && MACHINE_TYPES.length > 0 && MACHINE_TYPES.map((item, index) => (
    //                      <li onClick={() => handleMachineClick(item)} key={item?.typeId}><Link>{item.machineType}</Link></li>
    //                 ))}
    //                 <li><Link to="/types">Manage Types</Link></li>
    //             </ul>
    //         </div>
    //     </div>
    // </div>
  )
}

export default Navbar