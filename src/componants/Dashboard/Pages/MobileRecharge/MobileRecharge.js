import React from 'react';
import './MobileRecharge.css';
import robi from '../../../../assets/images/sim_porvider_logo/robi.jpg';
import gp from '../../../../assets/images/sim_porvider_logo//grameenphone.jpg';
import banglalink from '../../../../assets/images/sim_porvider_logo/banglalink.jpg';
import airtel from '../../../../assets/images/sim_porvider_logo/airtel.jpg';
import teletalk from '../../../../assets/images/sim_porvider_logo/teletalk.jpg';



const MobileRecharge = () => {
    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>MOBILE RECHARGE</h4>
                <div>
                    <from>
                        <div>
                            <label>Phone Number</label>
                            <input type="text" name="amount" placeholder='Your Phone Number' />
                        </div>
                        <div className='sim-contianer'>
                            <label>Select SIM Provider</label>
                            <div className='sim-provider-section'>
                                <div>
                                    <input type='radio' name="sim_provider" />
                                    <img src={robi} alt="logo"></img>
                                </div>
                                <div>
                                    <input type='radio' name="sim_provider" />
                                    <img src={gp} alt="logo"></img>
                                </div>
                                <div>
                                    <input type='radio' name="sim_provider" />
                                    <img src={banglalink} alt="logo"></img>
                                </div>
                                <div>
                                    <input type='radio' name="sim_provider" />
                                    <img src={airtel} alt="logo"></img>
                                </div>
                                <div>
                                    <input type='radio' name="sim_provider" />
                                    <img src={teletalk} alt="logo"></img>
                                </div>
                            </div>
                        </div>
                        <div className='sim-status'>
                            <label className=''>Select SIM Status</label>
                            <div className=''>
                                <div>
                                    <input type="radio" name="sim-status" />
                                    <label>Prepaid SIM</label>
                                </div>
                                <div>
                                    <input type="radio" name="sim-status" />
                                    <label>Postpaid SIM</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Select Amount of TK</label>
                            <select>
                                <option value="20">20tk</option>
                                <option value="30">30tk</option>
                                <option value="50">50tk</option>
                                <option value="100">100tk</option>
                            </select>
                        </div>
                        <div>
                            <input type="submit" value="Submit" />
                        </div>
                    </from>
                </div>
            </div>

            <div className='balance-transfer-history-section mt-4 m-auto'>
                <h4>MOBILE RECHARGE HISTORY</h4>
                <div>
                    <table>
                        <tr>
                            <th>Phone Number</th>
                            <th>SIM Provider</th>
                            <th>Amount of Tk</th>
                        </tr>
                        <tr>
                            <td>02445523</td>
                            <td>Robi</td>
                            <td>50tk</td>
                        </tr>
                        <tr>
                            <td>02445523</td>
                            <td>Grameenphone</td>
                            <td>100tk</td>
                        </tr>
                        <tr>
                            <td>02445523</td>
                            <td>Robi</td>
                            <td>50tk</td>
                        </tr>
                        <tr>
                            <td>02445523</td>
                            <td>Grameenphone</td>
                            <td>50tk</td>
                        </tr>
                        <tr>
                            <td>02445523</td>
                            <td>banglalink</td>
                            <td>70tk</td>
                        </tr>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default MobileRecharge;