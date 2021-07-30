import React from 'react';
import s from './ModalAddress.module.css';
import CustomProductSelect from '../BasketWrapper/Basket/Product/CustomProductSelect';

const ModalAddress = ({active, setActive}) => {
    const cityList = [
        {name: 'Москва'},
        {name: 'Ярославль'},
        {name: 'Волгоград'},
        {name: 'Санкт-Петербург'}
    ];

    return <div className={active ? s.ModalActive : s.Modal} onClick={() => setActive(false)}>
        <div className={active ? s.ModalContentActive : s.ModalContent} onClick={e => e.stopPropagation()}>
            <div className={s.ModalOff}>
                <a className={s.ModalOffLink} onClick={() => setActive(false)}></a>
            </div>
            <form>
                <div className={s.ModalContent}>
                    <div className={s.ModalContentName}>{'Адрес доставки'}</div>
                    <div className={s.ModalContentData}>
                        <div className={s.ModalContentSity}>
                            <div className={s.ModalContentItem}>
                                <span>{'Ваш город'}</span>
                                <select className={s.SelectCss}>
                                    <option className={s.SelectCssOption}>{'Москва'}</option>
                                    <option>{'Воронеж'}</option>
                                    <option>{'Ярославль'}</option>
                                    <option>{'Ростов-на-Дону'}</option>
                                </select>
                            </div>
                            {/*<CustomProductSelect items={cityList}/>*/}
                            <div className={s.ModalContentItem}>
                                <span>{'Улица'}</span><input type={'text'}/>
                            </div>
                            <div className={s.ModalContentItem}>
                                <span>{'Дом'}</span><input type={'text'}/>
                            </div>
                            <div className={s.ModalContentItem}>
                                <span>{'Кв'}</span><input type={'text'}/>
                            </div>
                        </div>
                        <div className={s.ModalContentComent}>
                            <span>{'Комментарий для курьера'}</span>
                            <div>
                                <textarea />
                            </div>
                        </div>
                    </div>
                    <button className={s.ModalLink} type={'submit'}>{'Сохранить адрес'}</button>
                </div>
            </form>
        </div>
    </div>
}
export default ModalAddress;