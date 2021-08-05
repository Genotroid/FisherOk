import React, {useState} from 'react';
import axios from 'axios';
import s from './Basket.module.css'
import Product from './Product/Product';
import {useStore} from '../../store/useStore';

const Basket = ({city}) => {
    const {state, dispatch} = useStore();
    const setModalActiveHandler = () => {

        axios.post(
            'http://devnew.lovisnami.ru:39878/api/v2/basket/delivery?dev_test_key=c048db8a21f93d3dc4e6',
            {
                "operation": "get_available_deliveries",
                "data": {
                    "departure_city_id": city.departure_city_id
                }
            }
        ).then(result => {
            dispatch({type: "setDeliveryList", data: result.data.data});
            dispatch({type: "setDepartureCity", data: city});
            dispatch({type: "setSelectedDelivery", data: city.selected_delivery});
        }).catch(error => {
            console.log('getDelivery error', error)
        })

        if (city.selected_delivery.address) {
            axios.post(
                'http://devnew.lovisnami.ru:39878/api/v2/basket/delivery?dev_test_key=c048db8a21f93d3dc4e6',
                {
                    "operation": "get_points",
                    "data": {
                        "module": city.selected_delivery.module_id
                    }
                })
                .then(result => dispatch({type: "setGeoData", data: result.data.data}))
                .catch(error => console.log('GetPoints error', error));

            dispatch({type: "setPostModalActive", data: true});
        } else {
            dispatch({type: "setCourierModalActive", data: true});
        }

    }

    return <div className={s.Basket}>
        <div className={s.BasketProduct}>
            <div className={s.BasketSticky}>
                <div className={s.BasketDelivery}>
                    <div className={s.BasketDeliveryCity}>{city.departure_city_name}</div>
                    {city.selected_delivery.address
                        ? <div className={s.BasketChoosedDeliveryInfo}>
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
                                Адрес доставки: ${city.selected_delivery.address}`}
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
                    <Product product={item} cityId={city.departure_city_id} key={key}/>
                )}
            </div>
        </div>

    </div>
}
export default Basket;