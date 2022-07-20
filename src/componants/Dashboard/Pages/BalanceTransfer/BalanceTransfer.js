import React from 'react';
import './BalanceTransfer.css';

const BalanceTransfer = () => {
    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>BALANCE TRANSFER</h4>
                <div>
                    <from>
                        <div>
                            <label>Select User</label>
                            <select>
                                <option value="Mehadi Hasan - 018434453">Mehadi Hasan - 018434453</option>
                                <option value="Sazid Hasan - 064434453">Sazid Hasan - 064434453</option>
                                <option value="kazi Emam - 013843445">kazi Emam - 013843445</option>
                                <option value="Mehadi Hasan - 03158434453">Mehadi Hasan - 03158434453</option>
                            </select>
                        </div>
                        <div>
                            <label>Amount</label>
                            <input type="number" name="amount" placeholder='amount of TK' />
                        </div>
                        <div>
                            <input type="submit" value="Submit" />
                        </div>
                    </from>
                </div>
            </div>

            <div className='balance-transfer-history-section mt-4 m-auto'>
                <h4>BALANCE TRANSFER HISTORY</h4>
                <div>
                    <table>
                        <tr>
                            <th>User Name</th>
                            <th>Transfer Number</th>
                            <th>Transfer Ammount</th>
                            <th>Transfer Date</th>
                        </tr>
                        <tr>
                            <td>Mehadi Hasan</td>
                            <td>02445523</td>
                            <td>50tk</td>
                            <td>12-4-20222</td>
                        </tr>
                        <tr>
                            <td>Mehadi Hasan</td>
                            <td>02445523</td>
                            <td>50tk</td>
                            <td>12-4-20222</td>
                        </tr>
                        <tr>
                            <td>Mehadi Hasan</td>
                            <td>02445523</td>
                            <td>50tk</td>
                            <td>12-4-20222</td>
                        </tr>
                        <tr>
                            <td>Mehadi Hasan</td>
                            <td>02445523</td>
                            <td>50tk</td>
                            <td>12-4-20222</td>
                        </tr>
                        <tr>
                            <td>Mehadi Hasan</td>
                            <td>02445523</td>
                            <td>50tk</td>
                            <td>12-4-20222</td>
                        </tr>
                        
                    </table>
                </div>
            </div>

        </div>
    );
};

export default BalanceTransfer;