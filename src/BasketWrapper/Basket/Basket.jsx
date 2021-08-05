import React, {useState} from 'react';
import axios from 'axios';
import s from './Basket.module.css'
import Product from './Product/Product';
import {useStore} from '../../store/useStore';
import availableDelivers from '../../jsons/deliveries_available.json';

const Basket = ({city}) => {
    const {state, dispatch} = useStore();
    const setModalActiveHandler = () => {

        axios.post(
            'https://lovisnami.ru/site2/api/get_deliveris',
            {
                "operation": "get_available_deliveries",
                "data": {
                    "departure_city_id": city.city_id
                }
            }
        ).then(result => {
            dispatch({type: "setDeliveryList", data: result.data});
            dispatch({type: "setDepartureCity", data: city});
            dispatch({type: "setSelectedDelivery", data: city.selected_delivery});
        }).catch(error => {
            dispatch({type: "setDeliveryList", data: availableDelivers});
            dispatch({type: "setDepartureCity", data: city});
            dispatch({type: "setSelectedDelivery", data: city.selected_delivery});
        })

        console.log('ModalAddress city', city);

        if (city.selected_delivery.address) {
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
                    {city.selected_delivery.address
                        ? <div style={{width: '310px'}}>
                            <div className={s.BasketDeliveryInfo} onClick={setModalActiveHandler}>
                                <span className={s.BasketDeliveryDate}>
                                    {`Поступление 27-29 июля за ${city.selected_delivery.shipping_cost} ₽`}
                                </span>
                                <div className={s.BasketDeliveryLogo}>
                                    <img src={city.selected_delivery.logo_url}/>
                                </div>
                            </div>
                            <div className={s.BasketDeliverySubInfo}>
                                {`Доставка курьером ${city.selected_delivery.name}. 
                                Адрес доставки: г. Москва, ул. Генерала Белобородова, д.65, кв.10`}
                            </div>
                        </div>
                        : <div className={s.BasketChooseDeliveryInfo}
                               onClick={setModalActiveHandler}>
                            <span className={s.BasketDeliveryDate}>{'Выбрать тип доставки'}</span>
                        </div>
                    }
                </div>
            </div>
            <div className={s.ProductContainer}>
                {city.items && city.items.map((item, key) =>
                    <Product product={item} cityId={city.city_id} key={key}/>
                )}
            </div>
        </div>

    </div>
}
export default Basket;