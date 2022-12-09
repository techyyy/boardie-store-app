import styles from "styles/CheckoutBtn.module.scss";
import GetIcon from "components/GetIcon";
import { useHistory } from 'react-router-dom';
import {useContext} from "react";
import {BasketContext} from "../context/BasketContext";

const CheckoutBtn = () => {
    const history = useHistory();
    const { setBasketIsOpen } = useContext(BasketContext);

    const handleClick = () => {
        history.push("/checkout");
    }

    return (
        <button
            className={styles.confirmBtn}
            onClick={(e) => {
                e.preventDefault();
                handleClick();
                setBasketIsOpen(false);
            }}>
            <GetIcon icon="BsFillCartPlusFill" size={18}/> Checkout
        </button>
    );
};

export default CheckoutBtn;
