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

    const customStyle = {
        fontFamily: 'Open Sans, sans-serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '19px',
        color: '#000000'
    }

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
                                <CustomProductSelect items={cityList} customStyle={customStyle}/>
                            </div>
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