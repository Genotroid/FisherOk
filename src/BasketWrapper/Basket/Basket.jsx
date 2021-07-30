import React, {useState} from 'react';
import s from './Basket.module.css'
import Product from './Product/Product';
import image1 from './../img/image38.png'
import ModalDelivery from "./../../ModalDelivery/ModalDelivery";

const Basket = ({city, tempKey}) => {
    const [ModalActive, setModalActive] = useState(false);

    return <div className={s.Basket}>
        <ModalDelivery active={ModalActive} setActive={setModalActive} modalType={tempKey}/>
        <div className={s.BasketProduct} style={{paddingBottom: '25px'}}>
            <div className={s.BasketSticky}>
                <div className={s.BasketDelivery}>
                    <div className={s.BasketDeliveryCity}>{city.name}</div>
                    <div className={s.BasketDeliveryInfo} onClick={() => setModalActive(true)}>
                        <span className={s.BasketDeliveryDate}>{'Поступление 27-29 июля за 350 ₽'}</span>
                        <div className={s.BasketDeliveryLogo}><img src={image1} alt={'item image'}/></div>
                    </div>
                </div>
            </div>
            <div className={s.ProductСontainer}>
                {city.products && city.products.map((product, key) =>
                    <Product product={product} cityId={city.id} key={key}/>
                )}
            </div>
        </div>

    </div>
}
export default Basket;