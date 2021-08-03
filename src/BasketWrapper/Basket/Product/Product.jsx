import React, {useState} from 'react';
import axios from 'axios';
import s from './Product.module.css';
import CustomSelect from './CustomProductSelect';
import image from './../../img/karasy1.jpg';

export const Product = ({product, cityId}) => {
    const [maxCount, setMaxCount] = useState(product.stock_level);
    const [itemCount, setItemCount] = useState(product.quantity);

    const changeCountHandler = (newCount) => {
        axios.post('test.url', [newCount]).then(
            // result => setBasket(result.data);
        );
    }

    return <div className={s.Product}>
        <div className={s.ProductInput}>
            <input className={s.CheckboxMein} type={'checkbox'} id={`checkbox-${cityId}-item-${product.item_id}`}
                   name={`checkbox-${cityId}-item-${product.item_id}`}/>
            <label htmlFor={`checkbox-${cityId}-item-${product.item_id}`}></label>
        </div>
        <div className={s.ProductImg}>
            {product.is_sales === "1" && <div className={s.SaleLabel}><span>{product.sales_discount}</span></div>}
            <img src={`https://lovisnami.ru/${product.small_image}`}/>
        </div>
        <div className={s.ProductName}>
            <div className={s.ProductNameItem}>{product.item_name}</div>
            <div className={s.ProductNameLoca}>
                {Object.values(product.stocks_by_city).length === 1 && <div className={s.ProductNameLocaItem}>
                    {`Есть только в ${Object.values(product.stocks_by_city)[0].city_name}`}
                </div>}
                {Object.values(product.stocks_by_city).length > 1 &&
                    <CustomSelect items={Object.values(product.stocks_by_city)}
                                  selectedCityId={product.departure_city_id}
                    />
                }
            </div>
        </div>
        <div className={s.ProductRight}>
            <div className={s.ProductCountPrice}>
                <div className={s.ProductCount}>
                    <div className={s.ProductButton}>
                        <button className={s.ProductButtonMinus}
                                onClick={() => changeCountHandler(product.quantity - 1)}></button>
                        <div className={s.ProductButtonCount}>{product.quantity}</div>
                        <button className={s.ProductButtonPlus}
                                onClick={() => changeCountHandler(product.quantity + 1)}></button>
                    </div>
                    <div className={s.ProductMaxCount}>{`макс: ${maxCount} шт.`}</div>
                </div>
                <div className={s.ProductPrice}>
                    {product.is_sales !== "0" &&
                    <div className={s.ProductPriceNew}>
                        {parseInt(product.sales_price).toLocaleString()} &#8381;
                    </div>}
                    <div className={product.is_sales !== "0" ? s.ProductPriceOld : ''}>
                        {parseInt(product.price).toLocaleString()} &#8381;
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
