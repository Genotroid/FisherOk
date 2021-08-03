import React, {useState} from 'react';
import s from './Basket.module.css'
import Product from './Product/Product';
import image1 from './../img/image38.png'
import ModalDelivery from "./../../ModalDelivery/ModalDelivery";

const Basket = ({city}) => {
    const [ModalActive, setModalActive] = useState(false);

    return <div className={s.Basket}>
        <ModalDelivery active={ModalActive} setActive={setModalActive} departureCity={city}/>
        <div className={s.BasketProduct}>
            <div className={s.BasketSticky}>
                <div className={s.BasketDelivery}>
                    <div className={s.BasketDeliveryCity}>{city.city_name}</div>
                    <div style={{width: '300px'}}>
                        <div className={s.BasketDeliveryInfo} onClick={() => setModalActive(true)}>
                            <span className={s.BasketDeliveryDate}>
                                {`Поступление 27-29 июля за ${city.selected_delivery.shipping_cost} ₽`}
                            </span>
                            <div className={s.BasketDeliveryLogo}><img src={city.selected_delivery.logo_url}/></div>
                        </div>
                        <div className={s.BasketDeliverySubInfo}>
                            {'Доставка курьером СДЕК. Адрес доставки: г. Москва, ул. Генерала Белобородова, д.65, кв.10'}
                        </div>
                    </div>
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