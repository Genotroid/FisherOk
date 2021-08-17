import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import s from './FullPrice.module.css';
import {useStore} from '../../store/useStore';

const FullPrice = () => {
    const {state, dispatch} = useStore();
    const promoCodeInput = useRef();
    const mobilePromoCodeInput = useRef();
    const [promocodeError, setPromoCodeError] = useState(false);
    const [editMod, setEditMod] = useState(false);
    const [totalData, setTotalData] = useState({
        itemsCount: 0,
        itemsSum: 0,
        totalSum: 0,
        totalSale: 0,
        isSale: false
    })

    const checkPromoCodeHandler = () => {
        setPromoCodeError(false);
        axios.post(
            ' https://devnew.lovisnami.ru:39878/api/v2/basket/promo-code?dev_test_key=c048db8a21f93d3dc4e6',
            {
                "operation": "add_promo_code",
                "data": {
                    "promo_code": promoCodeInput.current.value
                }
            })
            .then(result => {

                if (result.data.error === 1) {
                    setPromoCodeError(true);
                } else {
                    dispatch({type: "setBasket", data: result.data.data});
                }

            })
            .catch(error => setPromoCodeError(true))
    }

    const mobileCheckPromoCodeHandler = () => {
        setPromoCodeError(false);
        axios.post(
            ' https://devnew.lovisnami.ru:39878/api/v2/basket/promo-code?dev_test_key=c048db8a21f93d3dc4e6',
            {
                "operation": "add_promo_code",
                "data": {
                    "promo_code": mobilePromoCodeInput.current.value
                }
            })
            .then(result => dispatch({type: "setBasket", data: result.data.data}))
            .catch(error => setPromoCodeError(true))
    }

    const getShippingCostTotal = () => {
        let total = 0;

        if (!state.basket.grouped_items) {
            return total;
        }

        const deliveries = state.basket.grouped_items.map(city => {

            if (city.selected_delivery) {
                total += city.selected_delivery.shipping_cost
            }

        });

        return total;
    }

    useEffect(() => {
        let items = [];
        let itemsSum = 0;
        let itemsCount = 0;
        let totalSale = 0;
        let isSale = false;

        if (!state.basket.grouped_items) {
            return;
        }

        state.basket.grouped_items.map(city => city.items
            .filter(item => item.checked === '1')
            .map(item => items.push(item))
        );

        items.map(item => {
            itemsSum += item.price * item.quantity;
            itemsCount += item.quantity;

            if (item.is_sales === '1') {
                isSale = true;
                totalSale += (parseInt(item.price) - parseInt(item.sales_price)) * item.quantity;
            }

        });

        setTotalData({
            itemsCount: itemsCount,
            itemsSum: itemsSum,
            totalSum: itemsSum - totalSale,
            totalSale: totalSale,
            isSale: isSale
        })

    }, [state.basket]);

    if (!state.basket.grouped_items) {
        return <></>;
    }

    return <>
        <div className={s.FullPriceContainer}>
            <div className={s.FullPrice}>
                <div className={s.FullPriceWrapper}>
                    <div className={s.FullPriceCount}>
                        <div className={s.FullPriceTitle}>Всего</div>
                        <div className={s.FullPriceTotalCount}>
                            <div className={s.FullPriceTotalCountItem}>
                                {`Товары, ${totalData.itemsCount} шт.`}
                            </div>
                            <div className={s.FullPriceItem}>
                                {totalData.itemsSum + ' ₽'}
                            </div>
                        </div>
                    </div>
                    <div className={s.FullPriceDeliveryData}>
                        <div className={s.FullPriceDeliveryTitle}>{'Доставка:'}</div>
                        {state.basket.grouped_items && state.basket.grouped_items
                            .filter(city => city.selected_delivery && city.selected_delivery.module_id)
                            .map((city, key) =>
                                <div key={key} className={s.FullPriceFlex}>
                                    <div className={s.FullPriceCity}>{`из ${city.departure_city_name}`}</div>
                                    <div className={s.FullPriceItem}>{`${city.selected_delivery.shipping_cost} ₽`}</div>
                                </div>
                            )}
                        <div className={s.FullPriceSum}>
                            <div className={s.FullPriceFlex}>
                                <div className={s.FullPriceCity}>{'Сумма доставки'}</div>
                                <div className={s.FullPriceItem}>{`${getShippingCostTotal()} ₽`}</div>
                            </div>
                        </div>

                    </div>
                    {totalData.isSale && <div className={s.FullPriceDiscount}>
                        <div className={s.FullPriceFlex}>
                            <div className={s.FullPriceCity}>{'Скидка'}</div>
                            <div className={s.FullPriceDiscountItem}>{`${totalData.totalSale} ₽`}</div>
                        </div>
                    </div>}
                    <div className={s.FullPriceTotal}>
                        <div className={s.FullPriceFlex}>
                            <div className={s.FullPriceTotalItem}>{'Итого'}</div>
                            <div className={s.FullPriceTotalMein}>{`${totalData.totalSum} ₽`}</div>
                        </div>
                        <div>
                            <button className={s.FullPriceButton}>
                                {'Оформить покупку'}
                            </button>
                        </div>
                        <div className={s.PromoCode}>
                            {editMod
                                ? <div>
                                    {state.basket.promo_code.promo_code_discount > 0
                                        ? <div style={{position: 'relative'}}>
                                            <input className={s.PromoCodeFormInput} value={'asdasd'}
                                                   style={{width: '167px', paddingRight: '23px'}}/>
                                            <a className={s.PromoCodeFormLink}/>
                                            <div className={s.PromoCodeFormOk}>
                                                {'Код применен. Скидка не распространяется на акционные товары'}
                                            </div>
                                        </div>
                                        : <div className={s.PromoCodeForm}>
                                            <input className={s.PromoCodeFormInput} autoFocus={true}
                                                   placeholder={'Введите промокод'} ref={promoCodeInput}/>
                                            <button className={s.PromoCodeFormButton} onClick={checkPromoCodeHandler}>
                                                {'ОК'}
                                            </button>
                                            {promocodeError && <div className={s.PromoCodeFormError}>
                                                {'Ошибка! Промокод уже недействителен. Введите другой'}
                                            </div>}
                                        </div>
                                    }
                                </div>
                                :
                                <a onClick={() => setEditMod(true)} className={s.PromoCodeItem}>{'Ввести промокод'}</a>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={s.MobilePromoCodeInput}>
            {!editMod
                ? <div className={s.PromoCode}>
                    <a onClick={() => setEditMod(true)} className={s.PromoCodeItem}>{'Ввести промокод'}</a>
                </div>
                : <div className={s.PromoCodeForm}>
                    {editMod
                        ? <>
                            <input className={s.PromoCodeFormInput} autoFocus={true}
                                   placeholder={'Введите промокод'} ref={mobilePromoCodeInput}/>
                            <button className={s.PromoCodeFormButton}
                                    onClick={mobileCheckPromoCodeHandler}>{'ОК'}</button>
                            {state.basket.used_promo_code && <div className={s.PromoCodeFormOk}>
                                {'Код применен. Скидка не распространяется на акционные товары'}
                            </div>}
                        </>
                        : <div className={s.PromoCodeFormError}>
                            {'Ошибка! Промокод уже недействителен. Введите другой'}</div>
                    }

                </div>}
        </div>
        <div className={s.MobileTotal}>
            <div className={s.MobileTotalPrice}>
                <div>{`Итого ${state.basket.total_sum} ₽`}</div>
                <div dangerouslySetInnerHTML={{__html: state.basket.promo_code.text}}/>
            </div>
            <button className={s.MobileTotalButton}>{'Оформить покупку'}</button>
        </div>
    </>
}
export default FullPrice;