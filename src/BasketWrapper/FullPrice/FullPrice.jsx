import React, {useState, useRef} from 'react';
import axios from 'axios';
import s from './FullPrice.module.css';
import {useStore} from '../../store/useStore';

const FullPrice = (props) => {
    const promoCodeInput = useRef();
    const mobilePromoCodeInput = useRef();
    const [editMod, setEditMod] = useState(false);
    const [promocodeError, setPromoCodeError] = useState(false);
    const {state, dispatch} = useStore();

    const checkPromoCodeHandler = () => {
        axios.post(
            'https://lovisnami/site2/api/add-promo-code',
            {
                "operation": "add_promo_code",
                "data": {
                    "promo_code": promoCodeInput.current.value
                }
            }
        ).then(result => console.log('add promo code', result))
    }

    const mobileCheckPromoCodeHandler = () => {
        axios.post(
            'https://lovisnami/site2/api/add-promo-code',
            {
                "operation": "add_promo_code",
                "data": {
                    "promo_code": mobilePromoCodeInput.current.value
                }
            }
        ).then(result => console.log('add promo code', result))
    }

    return <>
        <div className={s.FullPriceContainer}>
            <div className={s.FullPrice}>
                <div className={s.FullPriceWrapper}>
                    <div className={s.FullPriceCount}>
                        <div className={s.FullPriceTitle}>Всего</div>
                        <div className={s.FullPriceTotalCount}>
                            <div className={s.FullPriceTotalCountItem}>
                                {`Товары, ${state.basket.item_count} шт.`}
                            </div>
                            <div className={s.FullPriceItem}>
                                {(state.basket.total_sum + state.basket.discount_sum) + ' ₽'}
                            </div>
                        </div>
                    </div>
                    <div className={s.FullPriceDeliveryData}>
                        <div className={s.FullPriceDeliveryTitle}>Доставка:</div>
                        {state.basket.grouped_items && Object.values(state.basket.grouped_items).map((city, key) =>
                            <div key={key} className={s.FullPriceFlex}>
                                <div className={s.FullPriceCity}>{`из ${city.city_name}`}</div>
                                <div className={s.FullPriceItem}>{`${city.selected_delivery.shipping_cost} ₽`}</div>
                            </div>
                        )}
                        <div className={s.FullPriceSum}>
                            <div className={s.FullPriceFlex}>
                                <div className={s.FullPriceCity}>{'Сумма доставки'}</div>
                                <div className={s.FullPriceItem}>{'500 ₽'}</div>
                            </div>
                        </div>

                    </div>
                    <div className={s.FullPriceDiscount}>
                        <div className={s.FullPriceFlex}>
                            <div className={s.FullPriceCity}>{'Скидка'}</div>
                            <div className={s.FullPriceDiscountItem}>{`${state.basket.discount_sum} ₽`}</div>
                        </div>
                    </div>
                    <div className={s.FullPriceTotal}>
                        <div className={s.FullPriceFlex}>
                            <div className={s.FullPriceTotalItem}>{'Итого'}</div>
                            <div className={s.FullPriceTotalMein}>{`${state.basket.total_sum} ₽`}</div>
                        </div>
                        <div>
                            <button className={s.FullPriceButton}>
                                {'Оформить покупку'}
                            </button>
                        </div>
                        <div className={s.PromoCode}>
                            {editMod
                                ? <div>
                                    {state.basket.used_promo_code
                                        ? <div style={{position: 'relative'}}>
                                            <input className={s.PromoCodeFormInput} value={state.basket.used_promo_code}
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
                        :<div className={s.PromoCodeFormError}>
                            {'Ошибка! Промокод уже недействителен. Введите другой'}</div>
                    }

                </div>}
        </div>
        <div className={s.MobileTotal}>
            <div className={s.MobileTotalPrice}>
                <div>{`Итого ${state.basket.total_sum} ₽`}</div>
                <div>{`Промокод: - ${state.basket.discount_sum} ₽ (20%)`}</div>
            </div>
            <button className={s.MobileTotalButton}>{'Оформить покупку'}</button>
        </div>
    </>
}
export default FullPrice;