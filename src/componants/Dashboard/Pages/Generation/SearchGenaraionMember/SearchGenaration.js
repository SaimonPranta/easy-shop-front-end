import React from 'react';
import { Link } from 'react-router-dom';
import './SearchGenarationMember.css';

const SearchGenaration = ({ userr }) => {
    return (<div className='text-white search-user-section'>
        {
            userr.length === 0 && <p>sorry, no user are exist by this phone number.</p>
        }
       {
        userr.length > 0 && <div className='balance-transfer-history-section mt-4 m-auto'>
         <div>
             <table>
                 <thead>
                     <tr>
                         <th>#</th>
                         <th>Name</th>
                         <th>PhoneNumber</th>
                         <th>Reffer By</th>
                         <th>Joining Date</th>
                         <th colSpan="2">Option</th>
                     </tr>
                 </thead>
                 <tbody>
                     {
                         userr && userr.length > 0 && userr.map((user, index) => {

                             return <tr key={user._id}>
                                 <td>{index + 1}</td>
                                 <td>{user.name}</td>
                                 <td>{user.phoneNumber}</td>
                                 <td>{user.referNumber}</td>
                                 <td>{user.joinDate}</td>
                                 <td><Link to={`/user/${user._id}`}><button type="button" className="btn btn-primary btn-sm">View Details</button></Link></td>
                             </tr>
                         })
                     }
                 </tbody>
             </table>
         </div>
     </div>
       }

    </div>
    );
};

export default SearchGenaration;