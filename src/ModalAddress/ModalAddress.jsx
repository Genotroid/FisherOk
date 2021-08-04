import React from 'react';
import s from './ModalAddress.module.css';
import CustomProductSelect from '../BasketWrapper/Basket/Product/CustomProductSelect';
import {useStore} from '../store/useStore';

const ModalAddress = ({active, setActive, changeAddressHook}) => {
    const {state, dispatch} = useStore();

    const customStyle = {
        fontFamily: 'Open Sans, sans-serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '19px',
        color: '#000000'
    }

    const returnToTKHandle = (e) => {
        e.preventDefault();
        dispatch({type: "setCourierModalActive", data: true});
        dispatch({type: "setAddressModalActive", data: false});
    }

    return <div className={state.addressModalActive ? s.ModalActive : s.Modal}
                onClick={() => dispatch({type: "setAddressModalActive", data: false})}>
        <div className={state.addressModalActive ? s.ModalContentActive : s.ModalContent}
             onClick={e => e.stopPropagation()}>
            <div className={s.ModalOff}>
                <a className={s.ModalOffLink} onClick={() => dispatch({type: "setAddressModalActive", data: false})} />
            </div>
            <form>
                <div className={s.ModalContent}>
                    <button className={s.ModalPostChooseTKButton} onClick={returnToTKHandle}>
                        {'Вернуться к выбору ТК'}
                    </button>
                    <div className={s.ModalContentName}>{'Адрес курьерской доставки'}</div>
                    <div className={s.AddressShippingCost}>
                        <span>{'Стоимость доставки: '}</span>
                        <span style={{fontWeight: 'bold'}}>{state.selectedDelivery.shipping_cost}&#8381;</span>
                    </div>
                    <div className={s.ModalContentData}>
                        <div className={s.ModalContentSity}>
                            <div className={s.ModalContentItem}>
                                <span>{'Ваш город'}</span>
                                <input style={{height: '36px'}} type={'text'} readOnly={true}
                                       value={state.departureCity.city_name}/>
                                {/*<CustomProductSelect items={cityList} customStyle={customStyle}/>*/}
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