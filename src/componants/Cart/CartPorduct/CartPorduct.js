import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import './CartPorduct.css';

const CartPorduct = ({handleQuentity, product }) => {
    const handleDeleteProduct = (e, productID) => {
        const cartItems = JSON.parse(localStorage.getItem("cartArray"))
        if (cartItems?.length) {
            const decProducts = cartItems.filter(info => {
                if (info.id !== productID) {
                    return info
                }
            })
            localStorage.setItem("cartArray", JSON.stringify(decProducts))
            e.target.parentElement.parentElement.style.display = "none"
        }
    }

    

    return (
      <div className="cart-product">
        <div>
          <img
            src={
              product.img
                ? `${process.env.REACT_APP_SERVER_HOST_URL}/${product.img}`
                : ""
            }
            alt=""
          />
        </div>
        <div>
          <h4>{product.title}</h4>
          <p>Brand</p>
        </div>
        <div>
          <p className="price">
            <TbCurrencyTaka />
            {Math.floor(product.price) * 100}
          </p>
          <p className="old-price">
            <TbCurrencyTaka />
            {Math.floor(
              product.price - product.price * (product.discount / 100)
            )}
          </p>
          <img
            className="delete"
            alt=""
            onClick={(e) => handleDeleteProduct(e, product._id)}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFPUlEQVR4nO1aXaycQxhehMZPIuH4F/+ilLrRStQFLlix5+z3vGOiOG5UWkWLcKGV9EhQSkVbNyhaoscFDkXKhUr8JP4Sh7a4oK30hxaJg+45O7PaT2Y6u6n93nfPfrvfcVZikrnZZ2fe53nnnXfemd1cLqMWa32QARYZoh8tUTxK326Ah9yYXKc1Q/RwEwL+0Q2wMNdpzRJt9wSVuqiJ706rrkyu05oNXh6r77fVYuBoC7xmiEppwyarbvbaHnBcWhZigA/GS4BN7qf3062C1kdZoucNMDTe5G1SzJAFVsaFQldjEYVClwW2jTdhO3rfGkfRkaIQCzzbASTjJvtyeU8Q/doBBOOmwozol0ZC1vyHhKxpctv/3zqnWWDVeIeOlfuLTQsxwH0dQDgWel8aIdd38Ca/Lk1oTREm+cwQ3eAOJBYHjCW6zdVnDcgMWGCOAayAb3E2DPA5iwNTmhYSa324MMncsGKPCfiGgJ8velSpycFZGwRnLPY40e0c7rg1LSSQ+ZlZkUcDiVsFot87fIToNEnIiNanhjk2Cs64JdhfzNjfmUpEmOgjxtCrDqtE0ZWCN3/yK9rdfYwkpFqOG6IdHF4B8mFFBhghH6YWYoEVjKFBh5WJJgp76A8vROvDRCG9vYcGR/3J4WWtzwpCvmTw51oRMl8kms9PMMBuZkV2x7ncfq4boj3M+D01XBqfz08IQn9nhMxLLaQMXM16NNwFpMwVa32wJ8LcKg2wyzuiUDhEWLEt+9yJkqtFpFILETNPFE1tdHusChWSxc5GRE24BVqlLmyU8VI1F8tseADTvTFgJWdspFg8JeCbEjiw0WEuc7FOAlZ4Jyh1LRuWYX+lbuxtEZjvMaI+wWuTAr6ewdeF1TpXCK0FYey9DLa1JRHB4HvSzSyc8I1C7xPGqx+PEjq9wYHPMGPXtizEAk9JE9ooupgjUyG6NAhdy4Tluw6rAJcJKzJNcqAherIdIXczxjY7rNTTc7yQWbr9WKLVDP66w8pAD5sogOOC3R8Y/K6WhXAGDfCXe3wOZ0WpQTLoZ/bXKnEzA8P+jJk580BnQ3JQa0Ki6Gw2M2l9RvD6N0wIzAjYcmbs014IcBMj8mtvk+hMYaUntvtTQcI7FaUu94SI3mpQIS9hRD4uVbaG6E2HVYiukKKgZSFilRpFNwchy6T0bIAHGEL3S+nVEC0N2Gypqm6rGeAdhtCiIPJOhtCDgdA8htA9Yc6FjAPuCNgjzJxvZyHkCYbQyw4rR1GREbkkiJzLkJ3j5yRamtgDQE8Y9wojZFnbQgRCX3hCSk1ucGDOSBBS6kbxwCsWz/MY0aDkgLaau+gwXh8S7x1AvxcCTGc8e00g+1I95ubK7R2X+BXAJYC2hYxE0elcOqy+hjNV7mrvgCgqJAgBV3khwBtsVVwodHG23NW5bSGx1geE1xH2NaO+pqqWMK5USQhR6hKuBKnVYFE0lVl94zi0LcQbAL4Vw6TuBHfCJFI18USfsic+kuHoDt1MRHChsO+1kzkv1vvPlZqUyExan8M9BdXOFySv19VQzaRxTzO1cqM+OwGb3OfDRCfXjxnW+iRPmGgzm80oWdZUn6AyaRaYxYTJV3Ff3/7uHarOu7v8Ax8XWkpd4DD3nTpstp+LaB1jZ1ZmQriNG4xs4xKBIfqNe+5xnzmM29C1PxwQf7/JpJWAE1kh/0IvaX1CZkLCO1R9OIx5N0QlZzuXZWNLh7Hvg7lO+PdPBn1B5kJirY+VXhfHpAPfxVofkbkQ1/zZAPRLL+kZ7YsdFngh7Sb/G9tu601vvEwMAAAAAElFTkSuQmCC"
          />
        </div>
        <div className="increment">
          <button onClick={(e) => handleQuentity("dicriment", product._id)}>
            -
          </button>
          <span id={product._id}>
            {product.quantity ? product.quantity : 1}
          </span>
          <button onClick={(e) => handleQuentity("increment", product._id)}>
            +
          </button>
        </div>
      </div>
    );
};

export default CartPorduct;