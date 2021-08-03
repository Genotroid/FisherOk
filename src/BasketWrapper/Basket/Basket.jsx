import React, {useState} from 'react';
import s from './Basket.module.css'
import Product from './Product/Product';
import {useStore} from '../../store/useStore';
import availableDelivers from '../../jsons/delivers.json';

const Basket = ({city}) => {
    const {state, dispatch} = useStore();
    const setModalActiveHandler = () => {

        dispatch({type: "setDepartureCity", data: city});
        dispatch({type: "setDeliveryList", data: availableDelivers});
        dispatch({type: "setSelectedDelivery", data: city.selected_delivery});

        if (city.selected_delivery) {
            dispatch({type: "setPostModalActive", data: true});
        } else {
            dispatch({type: "setCourierModalActive", data: true});
        }

    }

    return <div className={s.Basket}>
        <div className={s.BasketProduct}>
            <div className={s.BasketSticky}>
                <div className={s.BasketDelivery}>
                    <div className={s.BasketDeliveryCity}>{city.city_name}</div>
                    <div style={{width: '300px'}}>
                        <div className={s.BasketDeliveryInfo} onClick={setModalActiveHandler}>
                            <span className={s.BasketDeliveryDate}>
                                {`Поступление 27-29 июля за ${city.selected_delivery.shipping_cost} ₽`}
                            </span>
                            <div className={s.BasketDeliveryLogo}><img src={city.selected_delivery.logo_url}/></div>
                        </div>
                        <div className={s.BasketDeliverySubInfo}>
                            {`Доставка курьером ${city.selected_delivery.name}. 
                            Адрес доставки: г. Москва, ул. Генерала Белобородова, д.65, кв.10`}
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