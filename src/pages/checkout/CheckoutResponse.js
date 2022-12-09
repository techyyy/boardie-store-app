import styles from "styles/CheckoutResponse.module.scss";
import React from 'react';

export const CheckoutResponse = () => {

    return (
        <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
            <div className={styles.card}>
                <div style={{
                    borderRadius: "200px",
                    height: "200px",
                    width: "200px",
                    background: "white",
                    margin: "0 auto"
                }}>
                    <i className="checkmark">✓</i>
                </div>
                <h1>Success</h1>
                <p>We received your purchase request;<br/> we'll be in touch shortly!</p>
            </div>
        </div>
    );
};

export default CheckoutResponse;