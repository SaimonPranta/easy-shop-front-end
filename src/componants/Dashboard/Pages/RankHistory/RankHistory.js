import React, { useContext } from 'react';
import { userContext } from '../../../../App';
import './RankHistory.css';

const RankHistory = () => {
    const [user, setUser] = useContext(userContext);
    return (
        <div className='text-white'>
            <div className='balance-transfer-section rank-history m-auto'>
                <h4>RANK HISTORY</h4>
                <div className='text-white withdraw-notice'>
                    <p>{
                        user ? user.rank : "No Rank"
                        } </p>
                </div>
            </div>
        </div>
    );
};

export default RankHistory;