import React, {useState} from 'react';
import s from './Basket.module.css'
import Product from './Product/Product';
import image1 from './../img/image38.png'
import ModalDelivery from "./../../ModalDelivery/ModalDelivery";

const Basket = ({city}) => {
    const [ModalActive, setModalActive] = useState(false);

    return <div className={s.Basket}>
        <ModalDelivery active={ModalActive} setActive={setModalActive} departureCityId={city.city_id}
                       selectedDelivery={city.selected_delivery}/>
        <div className={s.BasketProduct}>
            <div className={s.BasketSticky}>
                <div className={s.BasketDelivery}>
                    <div className={s.BasketDeliveryCity}>{city.city_name}</div>
                    {city.selected_delivery &&
                        <div className={s.BasketDeliveryInfo} onClick={() => setModalActive(true)}>
                            <span className={s.BasketDeliveryDate}>
                                {`Поступление 27-29 июля за ${city.selected_delivery.shipping_cost} ₽`}
                            </span>
                            <div className={s.BasketDeliveryLogo}><img src={city.selected_delivery.logo_url}/></div>
                        </div>
                    }
                </div>
            </div>
            <div className={s.ProductСontainer}>
                {city.items && city.items.map((item, key) =>
                    <Product product={item} cityId={city.city_id} key={key}/>
                )}
            </div>
        </div>

    </div>
}
export default Basket;