import React from 'react';
import s from './BasketWrapper.module.css'
import Basket from './Basket/Basket';
import Delivery from './Delivery/Delivery';
import FullPrice from './FullPrice/FullPrice';

const  BasketWrapper = (props) => {
    const products = [
        {
            title: 'Костюм Onerus Фишер-45 (Таслан, Зел/жел) 52-54, рост 182-188',
            price: 5290,
            id: 1,
            img: 'karasy.jpg',
            deliverFrom: [
                {name: 'Москве', max: 400},
            ],
            article: 62275,
            count: 1,
            maxCount: 4
        },
        {
            title: 'Карабин с верт. и подш. Owner 5159-071 №8',
            price: 5390,
            id: 2,
            img: 'karasy1.jpg',
            deliverFrom: [
                {name: 'из Москвы', max: 100},
                {name: 'из Воронежа', max: 2},
                {name: 'из Ярославля', max: 5},
                {name: 'из Ростова-на-Дону', max: 2},
            ],
            salePrice: 4190,
            article: 62276,
            count: 1,
            maxCount: 6
        },
        {
            title: 'Карабин с верт. и подш. Owner 5159-071 №8',
            price: 5390,
            id: 3,
            img: 'karasy1.jpg',
            deliverFrom: [
                {name: 'из Москвы', max: 100},
                {name: 'из Воронежа', max: 2},
                {name: 'из Ярославля', max: 5},
                {name: 'из Ростова-на-Дону', max: 2},
            ],
            salePrice: 4190,
            article: 62276,
            count: 1,
            maxCount: 6
        }
    ];
    const cityList = [
        {
            id: 1,
            name: 'из Санкт-Петербурга',
            products: products
        },
        {
            id: 2,
            name: 'из Волгограда',
            products: [{
                title: 'Карабин с верт. и подш. Owner 5159-071 №8',
                price: 5390,
                id: 2,
                img: 'karasy1.jpg',
                deliverFrom: [
                    {name: 'из Москвы', max: 100},
                    {name: 'из Воронежа', max: 2},
                    {name: 'из Ярославля', max: 5},
                    {name: 'из Ростова-на-Дону', max: 2},
                ],
                salePrice: 4190,
                article: 62276,
                count: 1,
                maxCount: 6
            }]
        },
        {
            id: 3,
            name: 'из Санкт-Петербурга',
            products: products
        },
        {
            id: 4,
            name: 'из Санкт-Петербурга',
            products: products
        }
    ];
    const deliveryList = [
        {title: 'Курьером', id: 1, modalType: 1},
        {title: 'Пункт выдачи', id: 2, modalType: 2},
        {title: 'Постамат', id: 3, modalType: 2}
    ];
    const deliveryaddress = 'г.Москва, ул. Генерала Белобородова, д. 46 кв. 67';

    return <div className={s.BasketWrapper}>
        <div className={s.BasketWrapperItem}>
            <div className={s.BasketWrapperPath}>{'Главная / Корзина'}</div>
            <div className={s.BasketWrapperName}>{'Корзина'}</div>
            <div className={s.BasketWrapperInput}>
                <input className={s.CheckboxMein} type={'checkbox'} id={'check_all'} name={'check_all'}/>
                <label htmlFor={'check_all'}>{'Выбрать всё'}</label>
            </div>
        </div>
        <div className={s.BasketContent} >
            <div className={s.BasketContentData}>
                <div className={s.MobileBasketWrapperInput}>
                    <div className={s.MobileGoods}>{'Товары'}</div>
                    <input className={s.CheckboxMein} type={'checkbox'} id={'check_all'} name={'check_all'}/>
                    <label htmlFor={'check_all'}>{'Выбрать всё'}</label>
                </div>
                {cityList.length !== 0 && cityList.map((city, key) => <Basket city={city} tempKey={key+1}/>)}
            </div>
            <Delivery deliveryList={deliveryList} deliveryaddress={deliveryaddress}/>
            <FullPrice />
        </div>
    </div>
}
export default BasketWrapper;