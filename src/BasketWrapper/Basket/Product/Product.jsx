import React, {useCallback} from 'react';
import axios from 'axios';
import s from './Product.module.css';
import CustomSelect from './CustomProductSelect';
import {useStore} from '../../../store/useStore';

export const Product = ({product, cityId}) => {
    const {dispatch} = useStore();
    const setBasket = useCallback((data) => dispatch({type: "setBasket", data: data}), [dispatch]);

    const changeCountHandler = (newCount) => {

        if (newCount !== product.quantity) {
            axios.post(
                ' https://devnew.lovisnami.ru:39878/api/v2/basket/item?dev_test_key=c048db8a21f93d3dc4e6',
                {
                    "operation": "change_item_amount",
                    "data": {
                        "item_id": product.item_id,
                        "amount": newCount,
                        "departure_city_id": product.departure_city_id
                    }
                })
                .then(result => {
                    setBasket(result.data.data)
                })
                .catch(error => {
                    console.log('error', error)
                });
        }

    }

    const changeDepCityHandler = (newDepCityId) => {

        if (newDepCityId !== cityId) {
            axios.post(
                ' https://devnew.lovisnami.ru:39878/api/v2/basket/item?dev_test_key=c048db8a21f93d3dc4e6',
                {
                    "operation": "change_item_departure_city",
                    "data": {
                        "item_id": product.item_id,
                        "departure_city_id": product.departure_city_id,
                        "new_departure_city_id": newDepCityId
                    }
                })
                .then(result => {
                    setBasket(result.data.data)
                })
                .catch(error => {
                    console.log('error', error)
                });
        }

    }

    const changeCheckboxHandler = (e) => {
        axios.post(
            ' https://devnew.lovisnami.ru:39878/api/v2/basket/item?dev_test_key=c048db8a21f93d3dc4e6',
            {
                "operation": "change_item_checked",
                "data": {
                    "item_id": product.item_id,
                    "departure_city_id": product.departure_city_id,
                    "checked": e.target.checked ? '1' : '0'
                }
            })
            .then(result => {
                setBasket(result.data.data)
            })
            .catch(error => {
                console.log('error', error)
            });
    }

    return <div className={s.Product}>
        <div className={s.ProductInput}>
            <input className={s.CheckboxMein} type={'checkbox'} id={`checkbox-${cityId}-item-${product.item_id}`}
                   name={`checkbox-${cityId}-item-${product.item_id}`} checked={product.checked === '1'}
                   onChange={changeCheckboxHandler}/>
            <label htmlFor={`checkbox-${cityId}-item-${product.item_id}`}></label>
        </div>
        <div className={s.ProductImg}>
            {product.is_sales === "1" &&
            <div className={s.SaleLabel}><span>{`${product.sales_discount} %`}</span></div>}
            <img src={`https://lovisnami.ru/${product.small_image}`} alt={''}/>
        </div>
        <div className={s.ProductName}>
            <div className={s.ProductNameItem}>{product.item_name}</div>
            <div className={s.ProductNameLoca}>
                {Object.values(product.stocks_by_city).length === 1 && <div className={s.ProductNameLocaItem}>
                    {`Есть только в ${Object.values(product.stocks_by_city)[0].city_name}`}
                </div>}
                {Object.values(product.stocks_by_city).length > 1 &&
                <CustomSelect items={Object.values(product.stocks_by_city)}
                              selectedCityId={product.departure_city_id} changeDepCityHandler={changeDepCityHandler}
                />
                }
            </div>
        </div>
        <div className={s.ProductRight}>
            <div className={s.ProductCountPrice}>
                <div className={s.ProductCount}>
                    <div className={s.ProductButton}>
                        <button className={s.ProductButtonMinus}
                                onClick={() =>
                                    changeCountHandler(product.quantity > 1 ? product.quantity - 1 : product.quantity)
                                }/>
                        <div className={s.ProductButtonCount}>{product.quantity}</div>
                        <button className={s.ProductButtonPlus}
                                onClick={() =>
                                    changeCountHandler(product.quantity < product.stock_level
                                        ? product.quantity + 1
                                        : product.quantity
                                    )}/>
                    </div>
                    <div className={s.ProductMaxCount}>{`макс: ${product.stock_level} шт.`}</div>
                </div>
                <div className={s.ProductPrice}>
                    {product.is_sales !== "0" &&
                    <div className={s.ProductPriceNew}>
                        {parseInt(product.sales_price * product.quantity).toLocaleString()} &#8381;
                    </div>}
                    <div className={product.is_sales !== "0" ? s.ProductPriceOld : ''}>
                        {parseInt(product.price * product.quantity).toLocaleString()} &#8381;
                    </div>
                </div>
            </div>
            <div className={s.ProductArti}>{`Артикул: ${product.item_code}`}</div>
        </div>
        <div className={s.ProductDelete}>
            <a className={s.ProductDeleteClose} onClick={e => {
                e.preventDefault();
                changeCountHandler(0);
            }}/>
        </div>
    </div>
}

export default Product;
