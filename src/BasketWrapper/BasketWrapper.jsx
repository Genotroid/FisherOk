import React, {useState, useEffect, useCallback, useRef} from 'react';
import axios from 'axios';
import s from './BasketWrapper.module.css'
import Basket from './Basket/Basket';
import Delivery from './Delivery/Delivery';
import FullPrice from './FullPrice/FullPrice';
import {useStore} from '../store/useStore';
import tempBasket from '../jsons/basket.json';
import PostDelivery from '../ModalDelivery/PostDelivery/PostDelivery';
import CourierDelivery from '../ModalDelivery/CourierDelivery/CourierDelivery';
import ModalAddress from '../ModalAddress/ModalAddress';

const BasketWrapper = (props) => {
    const mobileStickyBlockRef = useRef();
    const [isSticky, setIsSticky] = useState(false)
    const {state, dispatch} = useStore();
    const [choosenProduct, setChoosenProduct] = useState([]);
    const setBasket = useCallback((data) => dispatch({type: "setBasket", data: data}), [dispatch]);

    const getBasketData = () => {
        axios.get('https://lovisnami.ru/site2/api/jsons/get-basket', {
            headers: {"Access-Control-Allow-Origin": "*"},
            responseType: 'json'
        }).then(result => {
            console.log('getJson from lovisname', result);
            dispatch({type: "setBasket", data: result.data});
        })
            .catch(error => {
                setBasket(tempBasket);
            });
    }

    useEffect(() => {
        getBasketData();
    }, []);

    useEffect(()=>{
        const cachedRef = mobileStickyBlockRef.current,
            observer = new IntersectionObserver(
                ([e]) => setIsSticky(e.intersectionRatio < 1),
                {threshold: [1]}
            )

        observer.observe(cachedRef)

        return () => observer.unobserve(cachedRef)
    }, [])

    return <div className={s.BasketWrapper}>
        <div className={s.BasketWrapperItem}>
            <div className={s.BasketWrapperPath}>{'Главная / Корзина'}</div>
            <div className={s.BasketWrapperName}>{'Корзина'}</div>
            <div className={s.BasketWrapperInput}>
                <input className={s.CheckboxMein} type={'checkbox'} id={'check_all'} name={'check_all'}/>
                <label htmlFor={'check_all'}>{'Выбрать всё'}</label>
            </div>
        </div>
        <div className={s.BasketContent}>
            <div className={s.BasketContentData}>
                <div className={s.MobileBasketWrapperInput + (isSticky ? ` ${s.isSticky}` : '')} ref={mobileStickyBlockRef}>
                    <div className={s.MobileGoods}>{'Товары'}</div>
                    <input className={s.CheckboxMein} type={'checkbox'} id={'check_all_mobile'} name={'check_all'}/>
                    <label htmlFor={'check_all_mobile'}>
                        {isSticky ? `Выбрать все товары (${state.basket.item_count} шт.)` : 'Выбрать всё'}
                    </label>
                </div>
                {state.basket.grouped_items && state.basket.grouped_items.map((city, key) =>
                    <Basket city={city}/>
                )}
            </div>
            <div className={s.BasketRightMenu}>
                <FullPrice/>
            </div>
        </div>
        <CourierDelivery/>
        <PostDelivery/>
        <ModalAddress/>
    </div>
}
export default BasketWrapper;