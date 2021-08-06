import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import s from './BasketWrapper.module.css'
import Basket from './Basket/Basket';
import FullPrice from './FullPrice/FullPrice';
import {useStore} from '../store/useStore';
import PostDelivery from '../ModalDelivery/PostDelivery/PostDelivery';
import CourierDelivery from '../ModalDelivery/CourierDelivery/CourierDelivery';
import ModalAddress from '../ModalAddress/ModalAddress';

const BasketWrapper = (props) => {
    const {state, dispatch} = useStore();
    const [choosenProduct, setChoosenProduct] = useState([]);
    const setBasket = useCallback((data) => dispatch({type: "setBasket", data: data}), [dispatch]);

    const getBasketData = () => {
        axios.get('https://cors-anywhere.herokuapp.com/http://devnew.lovisnami.ru:39878/api/v2/basket?dev_test_key=c048db8a21f93d3dc4e6')
            .then(result => setBasket(result.data.data))
            .catch(error => console.log('error message', error));
    }

    useEffect(() => {
        getBasketData();
    }, []);


    //TODO finish as method
    const isAllChecked = () => {

        if(!state.basket.grouped_items) {
            return false;
        }

        return true;
    }

    return <div className={s.BasketWrapper}>
        <div className={s.BasketWrapperItem}>
            <div className={s.BasketWrapperPath}>{'Главная / Корзина'}</div>
            <div className={s.BasketWrapperName}>{'Корзина'}</div>
            <div className={s.BasketWrapperInput}>
                <input className={s.CheckboxMein} type={'checkbox'} id={'check_all'} name={'check_all'}
                       checked={isAllChecked}/>
                <label htmlFor={'check_all'}>{'Выбрать всё'}</label>
            </div>
        </div>
        <div className={s.BasketContent}>
             <div className={s.BasketContentData}>
                {state.basket.grouped_items && state.basket.grouped_items.map((city, key) => <Basket city={city}/>)}
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