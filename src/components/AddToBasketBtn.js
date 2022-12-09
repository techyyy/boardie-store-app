import styles from "styles/AddToBasketBtn.module.scss";
import {BasketContext} from "context/BasketContext";
import {useCallback, useContext, useEffect, useState} from "react";
import GetIcon from "components/GetIcon";
import cookies from "js-cookie";
import {sendRequest} from "../utils/RequestUtils";

const AddToBasketBtn = ({data: product}) => {
    const {basketItems, setBasketItems, setBasketTotal, currentQuantity} = useContext(BasketContext);

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const response = await sendRequest(`http://localhost:8080/products/${product.id}`, "PUT")
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const addToBasket = (product) => {
        let arr = [...basketItems];
        let filtered = basketItems.filter((item) => item.id === product.id);
        if (filtered.length > 0) {
            filtered[0].quantity += 1;
            arr[arr.indexOf(filtered[0])] = filtered[0];
            setBasketItems(arr);
        } else {
            setBasketItems((oldState) => [
                ...oldState,
                {
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                    quantity: currentQuantity,
                },
            ]);
        }
        setBasketTotal((oldTotal) => (oldTotal + product.price * (currentQuantity || 1)));
    };

    return (
        <button
            className={styles.addToBasket}
            onClick={(e) => {
                e.preventDefault();
                addToBasket(product);
                handleClick();
            }}
        >
            <GetIcon icon="BsFillCartPlusFill" size={18}/> add to basket
        </button>
    );
};

export default AddToBasketBtn;
