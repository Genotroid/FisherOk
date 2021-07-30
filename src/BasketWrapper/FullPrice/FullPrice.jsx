import React, {useState} from 'react';
import s from './FullPrice.module.css';

const FullPrice = (props) => {
    const [editMod, setEditMod] = useState(false);

    const activEditMod = () => {
        setEditMod(true)
    }

    return <>
        <div className={s.FullPriceContainer}>
            <div className={s.FullPrice}>
                <div className={s.FullPriceWrapper}>
                    <div className={s.FullPriceCount}>
                        <div className={s.FullPriceTitle}>Всего</div>
                        <div className={s.FullPriceTotalCount}>
                            <div className={s.FullPriceTotalCountItem}>
                                {'Товары, 12 шт.'}
                            </div>
                            <div className={s.FullPriceItem}>
                                {'20 789 ₽'}
                            </div>
                        </div>
                    </div>

                    <div className={s.FullPriceDeliveryData}>
                        <div className={s.FullPriceDeliveryTitle}>Доставка:</div>
                        <div className={s.FullPriceFlex}>
                            <div className={s.FullPriceCity}>
                                {'из Санкт-Петербурга'}
                            </div>
                            <div className={s.FullPriceItem}>
                                {'350 ₽'}
                            </div>
                        </div>
                        <div className={s.FullPriceFlex}>
                            <div className={s.FullPriceCity}>
                                {'из Волгограда'}
                            </div>
                            <div className={s.FullPriceItem}>
                                {'150 ₽'}
                            </div>
                        </div>
                        <div className={s.FullPriceFlex}>
                            <div className={s.FullPriceCity}>
                                {'из Москвы'}
                            </div>
                            <div className={s.FullPriceItem}>
                                {'0 ₽'}
                            </div>
                        </div>
                        <div className={s.FullPriceSum}>
                            <div className={s.FullPriceFlex}>
                                <div className={s.FullPriceCity}>
                                    {'Сумма доставки'}
                                </div>
                                <div className={s.FullPriceItem}>
                                    {'500 ₽'}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={s.FullPriceDiscount}>
                        <div className={s.FullPriceFlex}>
                            <div className={s.FullPriceCity}>
                                {'Скидка'}
                            </div>
                            <div className={s.FullPriceDiscountItem}>
                                {'834 ₽'}
                            </div>
                        </div>
                    </div>
                    <div className={s.FullPriceTotal}>
                        <div className={s.FullPriceFlex}>
                            <div className={s.FullPriceTotalItem}>
                                {'Итого'}
                            </div>
                            <div className={s.FullPriceTotalMein}>
                                {'21 389 ₽'}
                            </div>
                        </div>
                        <div>
                            <button className={s.FullPriceButton}>
                                {'Оформить покупку'}
                            </button>
                        </div>
                        <div className={s.PromoCode}>
                            {editMod
                                ?
                                <div>
                                    <div className={s.PromoCodeForm}>
                                        <input className={s.PromoCodeFormInput} autoFocus={true}
                                               placeholder={'Введите промокод'}/>
                                        <button className={s.PromoCodeFormButton} type="submit">{'ОК'}</button>
                                        <div className={s.PromoCodeFormError}>
                                            {'Ошибка! Промокод уже недействителен. Введите другой'}
                                        </div>
                                    </div>
                                    <div style={{position: 'relative'}}>
                                        <input className={s.PromoCodeFormInput} placeholder={'Промокод: F3FRL75R43'}
                                               style={{width: '167px', paddingRight: '23px'}}/>
                                        <a className={s.PromoCodeFormLink}/>
                                        <div className={s.PromoCodeFormOk}>
                                            {'Код применен. Скидка не распространяется на акционные товары'}
                                        </div>
                                    </div>
                                </div>
                                : <a onClick={() => activEditMod()} className={s.PromoCodeItem}>{'Ввести промокод'}</a>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={s.MobilePromoCodeInput}>
            {!editMod
            ? <div className={s.PromoCode}>
                <a onClick={() => activEditMod()} className={s.PromoCodeItem}>{'Ввести промокод'}</a>
            </div>
            : <div className={s.PromoCodeForm}>
                <input className={s.PromoCodeFormInput} autoFocus={true}
                       placeholder={'Введите промокод'}/>
                <button className={s.PromoCodeFormButton} type="submit">{'ОК'}</button>
                <div className={s.PromoCodeFormError}>
                    {'Ошибка! Промокод уже недействителен. Введите другой'}
                </div>
                <div className={s.PromoCodeFormOk}>
                    {'Код применен. Скидка не распространяется на акционные товары'}
                </div>
            </div>}
        </div>
        <div className={s.MobileTotal}>
            <div className={s.MobileTotalPrice}>
                <div>{`Итого 15 778 ₽`}</div>
                <div>{'Промокод: - 1800 ₽ (20%)'}</div>
            </div>
            <button className={s.MobileTotalButton}>{'Оформить покупку'}</button>
        </div>
    </>
}
export default FullPrice;