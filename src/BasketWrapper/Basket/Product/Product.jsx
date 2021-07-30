import React, {useState} from 'react';
import s from './Product.module.css';
import CustomSelect from './CustomProductSelect';
import image from './../../img/karasy1.jpg'

export const Product = ({product, cityId}) => {
    const [maxCount, setMaxCount] = useState(product.maxCount);
    const [itemCount, setItemCount] = useState(product.count);

    const changeCountHandler = (newCount) => {

        if (newCount > 0 && newCount <= maxCount) {
            setItemCount(newCount);
        }

    }

    return <div className={s.Product}>
        <div className={s.ProductInput}>
            <input className={s.CheckboxMein} type={'checkbox'} id={`checkbox-${cityId}-item-${product.id}`}
                   name={`checkbox-${cityId}-item-${product.id}`}/>
            <label htmlFor={`checkbox-${cityId}-item-${product.id}`}></label>
        </div>
        <div className={s.ProductImg}>
            {product.salePrice && <div className={s.SaleLabel}><span>{'-15 %'}</span></div>}
            <img src={image} /*src={`/img/${product.img}`}*//>
        </div>
        <div className={s.ProductName}>
            <div className={s.ProductNameItem}>{product.title}</div>
            <div className={s.ProductNameLoca}>
                {product.deliverFrom.length === 1 && <div className={s.ProductNameLocaItem}>
                    {`Есть только в ${product.deliverFrom[0].name}`}
                </div>}
                {product.deliverFrom.length > 1 && <CustomSelect items={product.deliverFrom}/>}
            </div>
        </div>
        <div className={s.ProductRight}>
            <div className={s.ProductCountPrice}>
                <div className={s.ProductCount}>
                    <div className={s.ProductButton}>
                        <button className={s.ProductButtonMinus}
                                onClick={() => changeCountHandler(itemCount - 1)}></button>
                        <div className={s.ProductButtonCount}>{itemCount}</div>
                        <button className={s.ProductButtonPlus}
                                onClick={() => changeCountHandler(itemCount + 1)}></button>
                    </div>
                    <div className={s.ProductMaxCount}>{`макс: ${maxCount} шт.`}</div>
                </div>
                <div className={s.ProductPrice}>
                    {product.salePrice &&
                    <div className={s.ProductPriceNew}>
                        {(product.price * itemCount).toLocaleString()} &#8381;
                    </div>}
                    <div className={product.salePrice ? s.ProductPriceOld : ''}>
                        {(product.price * itemCount).toLocaleString()} &#8381;
                    </div>
                </div>
            </div>
            <div className={s.ProductArti}>{`Артикул: ${product.article}`}</div>
        </div>
        <div className={s.ProductDelete}>
            <a className={s.ProductDeleteClose}></a>
        </div>
    </div>
}

export default Product;
