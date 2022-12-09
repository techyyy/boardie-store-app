import styles from "styles/Checkout.module.scss";
import homeStyles from "styles/Home.module.scss";
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {useContext} from "react";
import {BasketContext} from "../../context/BasketContext";
import {sendRequest} from "../../utils/RequestUtils";

export const Checkout = () => {
    let {first_name, last_name, phone, email, address, city, region, zip, credit_card_number, expiry, cvv} = useState("");
    const {basketTotal: _basketTotal } = useContext(BasketContext);
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const checkoutRequest = {
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            address: address,
            city: city,
            region: region,
            zip: zip,
            credit_card_number: credit_card_number,
            expiry: expiry,
            cvv: cvv,
            total: _basketTotal
        }
        const response = await sendRequest(`http://localhost:8080/checkout`, "POST", JSON.stringify(checkoutRequest));
        console.log(response.ok);
        history.replace("/checkout/response?=" + (response.ok ? "success" : "error"));
    }

    return (
        <section className={homeStyles.home}>
            <div className={styles.container}>
                <div className={styles.checkoutForm}>
                    <form onSubmit={handleSubmit}>
                        <h1>
                            Shipping Details
                        </h1>
                        <div className="name">
                            <div>
                                <label htmlFor="first_name">First name </label>
                                <input type="text" name="first_name" required={true}
                                       onChange={(e) => first_name=e.target.value}/>
                            </div>
                            <div>
                                <label htmlFor="last_name">Last name </label>
                                <input type="text" name="last_name" required={true}
                                       onChange={(e) => last_name=e.target.value}/>
                            </div>
                            <div>
                                <label htmlFor="phone">Phone </label>
                                <input type="text" name="phone" required={true}
                                       onChange={(e) => phone=e.target.value}/>
                            </div>
                            <div>
                                <label htmlFor="email">E-mail </label>
                                <input type="email" name="email" required={true}
                                       onChange={(e) => email=e.target.value}/>
                            </div>
                        </div>
                        <div className={styles.addressInfo}>
                            <div className={styles.street}>
                                <label htmlFor="name">Address </label>
                                <input type="text" name="address" required={true}
                                       onChange={(e) => address=e.target.value}/>
                            </div>
                            <div>
                                <label htmlFor="city">City </label>
                                <input type="text" name="city" required={true}
                                       onChange={(e) => city=e.target.value}/>
                            </div>
                            <div>
                                <label htmlFor="state">Region </label>
                                <input type="text" name="state" required={true}
                                       onChange={(e) => region=e.target.value}/>
                            </div>
                            <div>
                                <label htmlFor="zip">Zip </label>
                                <input type="text" name="zip" required={true}
                                       onChange={(e) => zip=e.target.value}/>
                            </div>
                        </div>
                        <h1>
                            <i className="far fa-credit-card"></i> Payment Information
                        </h1>
                        <div className={styles.ccInfo}>
                            <label htmlFor="card-num">Credit Card No. </label>
                            <input type="text" name="card-num" required={true}
                                   onChange={(e) => credit_card_number=e.target.value}/>
                        </div>
                        <div className={styles.ccInfo}>
                            <div>
                                <div>
                                    <label htmlFor="card-num">Exp </label>
                                    <input type="date" name="expire" required={true}
                                           onChange={(e) => expiry=e.target.value}/>
                                </div>
                                <div>
                                    <label htmlFor="card-num">CVV </label>
                                    <input type="number" name="security" required={true}
                                           onChange={(e) => cvv=e.target.value}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            Cart total: UAH{_basketTotal}
                        </div>
                        <div className={styles.btns}>
                            <button>Purchase</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Checkout;