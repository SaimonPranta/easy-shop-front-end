import React from 'react';
import './Withdraw.css';

const Withdraw = () => {
    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>WITHDRAW BALANCE</h4>
                <div className='text-white withdraw-notice'>
                    <p>Withdraw between 100TK to 1000TK and 5% charge applicable for per waithdraw.</p>
                </div>
                <div>
                    <from>
                        <div>
                            <label>Withdraw Number</label>
                            <input type="text" name="amount" placeholder='Number' />
                        </div>
                        <div>
                            <label>Select Payment Method</label>
                            <select>
                                <option value="Bkash">bKash</option>
                                <option value="Rocket">Rocket</option>
                                <option value="Nagad">Nagad</option>
                            </select>
                        </div>
                        <div>
                            <label>Select Amount of TK</label>
                            <select>
                                <option value="100">100TK</option>
                                <option value="200">200TK</option>
                                <option value="300">300TK</option>
                                <option value="400">400TK</option>
                                <option value="500">500TK</option>
                                <option value="1000">1000TK</option>

                            </select>
                        </div>

                        <div>
                            <input type="submit" value="Submit" />
                        </div>
                    </from>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;