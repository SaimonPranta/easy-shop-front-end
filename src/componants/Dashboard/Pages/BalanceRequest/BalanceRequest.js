import React, { useState } from 'react';
import './BalanceRequest.css';
import bkashLogo from '../../../../assets/images/payment_porvider_logo/bkash.jpg';
import nagadLogo from '../../../../assets/images/payment_porvider_logo/nogod.jpg';
import rocketLogo from '../../../../assets/images/payment_porvider_logo/dutch-bangla-rocket-logo.png';
import { FiCopy } from "react-icons/fi";


const BalanceRequest = () => {
    const copyText = (e) => {
        const copyBtn = e.target.parentNode.parentNode.childNodes[1];
        const copedNotice = e.target.parentNode.parentNode.childNodes[2];
        copyBtn.select()
        document.execCommand("copy");

        copedNotice.classList.add('active-notice');
        setTimeout(() => {
            copedNotice.classList.remove('active-notice');
        }, 2000);

    }
    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>CREATE BALANCE REQUEST</h4>
                <div>
                    <form>
                        <div className='payment-provider-section'>
                            <div>
                                <img src={bkashLogo} alt="logo"></img>
                                <input type='text' value='01882589901'/>
                                <span className='copy-btn'><FiCopy onClick={copyText}/></span>
                            </div>
                            <div>
                                <img src={nagadLogo} alt="logo"></img>
                                <input type='text' value='01882589901'/>
                                <span className='copy-btn'><FiCopy onClick={copyText}/></span>
                            </div>
                            <div>
                                <img src={rocketLogo} alt="logo"></img>
                                <input type='text' value='01882589901'/>
                                <span className='copy-btn'><FiCopy onClick={copyText}/></span>
                            </div>
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
                            <label>Phone Number</label>
                            <input type="text" name="amount" placeholder='Your Phone Number' />
                        </div>
                        <div>
                            <label>Amount of TK</label>
                            <input type="text" name="amount" placeholder='amount of TK' />
                        </div>
                        <div>
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>

            <div className='balance-transfer-history-section mt-4 m-auto'>
                <h4>BALANCE REQUEST HISTORY</h4>
                <div>
                    <table>
                        <tr>
                            <th>Paymented Method</th>
                            <th>Requested Number</th>
                            <th>Requested Amount</th>
                            <th>SIM Provider</th>
                            <th>Request Date</th>
                        </tr>
                        <tr>
                            <td>bKash</td>
                            <td>02445523</td>
                            <td>50tk</td>
                            <td>Robi</td>
                            <td>12-4-20222</td>
                        </tr>
                        <tr>
                            <td>Nagad</td>
                            <td>02445523</td>
                            <td>100tk</td>
                            <td>Grameenphone</td>
                            <td>12-4-20222</td>
                        </tr>
                        <tr>
                            <td>bKash</td>
                            <td>02445523</td>
                            <td>150tk</td>
                            <td>Robi</td>
                            <td>12-4-20222</td>
                        </tr>
                        <tr>
                            <td>Rocket</td>
                            <td>02445523</td>
                            <td>50tk</td>
                            <td>Grameenphone</td>
                            <td>12-4-20222</td>
                        </tr>
                        <tr>
                            <td>bKash</td>
                            <td>02445523</td>
                            <td>70tk</td>
                            <td>banglalink</td>
                            <td>12-4-20222</td>
                        </tr>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default BalanceRequest;