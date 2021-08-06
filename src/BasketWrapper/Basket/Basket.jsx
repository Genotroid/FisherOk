import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import s from './Basket.module.css'
import Product from './Product/Product';
import {useStore} from '../../store/useStore';

const Basket = ({city}) => {
    const [isSticky, setIsSticky] = useState(false);
    const mobileStickyBlockRef = useRef();
    const {state, dispatch} = useStore();
    const setModalActiveHandler = () => {

        axios.post(
            ' https://devnew.lovisnami.ru:39878/api/v2/basket/delivery?dev_test_key=c048db8a21f93d3dc4e6',
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

        if (!city.selected_delivery) {
            dispatch({type: "setCourierModalActive", data: true});
            return;
        }

        if (city.selected_delivery.delivery_info_type === 'points') {
            axios.post(
                ' https://devnew.lovisnami.ru:39878/api/v2/basket/delivery?dev_test_key=c048db8a21f93d3dc4e6',
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
            dispatch({type: "setAddressModalActive", data: true});
        }

    }

    //TODO finish as method
    const isAllChecked = () => {

        if (!state.basket.grouped_items) {
            return false;
        }

        return true;
    }

    useEffect(() => {
        const cachedRef = mobileStickyBlockRef.current,
            observer = new IntersectionObserver(
                ([e]) => setIsSticky(e.intersectionRatio < 1),
                {threshold: [1]}
            )

        observer.observe(cachedRef)

        return () => observer.unobserve(cachedRef)
    }, []);

    const getDeliveryData = () => {
        let string = '';
        let startDate = new Date(city.selected_delivery.shipping_delivery_interval[0]);
        let endDate = new Date(city.selected_delivery.shipping_delivery_interval[1]);

        const months = ['января', 'февраля', 'марта', 'апреля',
            'мая', 'июня', 'июля', 'августа',
            'сентября', 'октября', 'ноября', 'декабря'];

        console.log('city', city);
        console.log('selectedDelivery', city.selected_delivery);
        console.log('startDate', startDate.getMonth());
        console.log('endDate', endDate);

        if (startDate.getMonth() === endDate.getMonth()) {
            string = `${startDate.getDay()} - ${endDate.getDay()} ${months[startDate.getMonth()]}`;
        } else {
            string = `${startDate.getDay()} ${months[startDate.getMonth()]} - ${endDate.getDay()} ${months[endDate.getMonth()]}`;
        }

        return string;
    }

    return <div className={s.Basket}>
        <div className={s.BasketProduct}>
            <div className={s.BasketSticky + (isSticky ? ` ${s.isSticky}` : '')} ref={mobileStickyBlockRef}>
                <div className={s.MobileBasketInput}>
                    <div className={s.MobileGoods}>{'Товары'}</div>
                    <input className={s.CheckboxMein} type={'checkbox'} id={'check_all_mobile'} name={'check_all'}
                           checked={() => isAllChecked()}/>
                    <label htmlFor={'check_all_mobile'}>
                        {isSticky ? `Выбрать все товары (${state.basket.item_count} шт.)` : 'Выбрать всё'}
                    </label>
                </div>
                <div className={s.BasketDelivery}>
                    <div className={s.BasketDeliveryCity}>{city.departure_city_name}</div>
                    {city.selected_delivery
                        ? <div className={s.BasketChoosedDeliveryInfo}>
                            <div className={s.BasketDeliveryInfo} onClick={setModalActiveHandler}>
                                <span className={s.BasketDeliveryDate}>
                                    {`Поступление ${getDeliveryData()} за ${city.selected_delivery.shipping_cost} ₽`}
                                </span>
                                <div className={s.BasketDeliveryLogo}>
                                    <img src={city.selected_delivery.logo_url}/>
                                </div>
                            </div>
                            <div className={s.BasketDeliverySubInfo}>
                                {`${city.selected_delivery.delivery_info_type === 'points' ? 'Доставка курьером' : 'Пункт выдачи'} 
                                ${city.selected_delivery.name}. 
                                Адрес ${city.selected_delivery.delivery_info_type === 'points'
                                    ? 'доставки: ' + city.selected_delivery.address
                                    : 'пункта: ' + city.selected_delivery.client_address}`}
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