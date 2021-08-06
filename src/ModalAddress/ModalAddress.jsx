import React, {useRef, useState} from 'react';
import axios from 'axios';
import s from './ModalAddress.module.css';
import CustomProductSelect from '../BasketWrapper/Basket/Product/CustomProductSelect';
import {useStore} from '../store/useStore';

const ModalAddress = ({active, setActive, changeAddressHook}) => {
    const {state, dispatch} = useStore();
    const [formData, setFormData] = useState({
        cityName: '',
        streetName: '',
        houseNumber: '',
        appartmentNumber: '',
        comment: '',
    });

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

    const inputChangeHandler = (e) => {
        const newValue = e.target.value;
        const name = e.target.name;

        let tempData = formData;
        tempData[name] = newValue;

        setFormData(tempData);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(formData.cityName) {
            let clientAddress = `г.${formData.cityName}`;

            if(formData.streetName !== '') {
                clientAddress += ` ул.${formData.streetName}`;
            }

            if(formData.houseNumber !== '') {
                clientAddress += ` д.${formData.houseNumber}`;

                if(formData.appartmentNumber !== '') {
                    clientAddress += ` кв.${formData.appartmentNumber}`;
                }
            }

            axios.post(
                'http://devnew.lovisnami.ru:39878/api/v2/basket/delivery/?dev_test_key=c048db8a21f93d3dc4e6',
                {
                    "operation": "change_delivery_type",
                    data:{
                        "departure_city_id": state.departureCity.departure_city_id,
                        "shipping_type_id": state.selectedDelivery.default_shipping_type,
                        "shipping_module_id": state.selectedDelivery.module_id,
                        "client_address": clientAddress
                    }
                })
                .then(result => {
                    dispatch({type: "setBasket", data: result.data.data});
                    dispatch({type: "setAddressModalActive", data: false})
                })
                .catch(error => console.log('ChangeDelivery error', error))
        }

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
                    {state.selectedDelivery && <div className={s.AddressShippingCost}>
                        <span>{'Стоимость доставки: '}</span>
                        <span style={{fontWeight: 'bold'}}>{state.selectedDelivery.shipping_cost} &#8381;</span>
                    </div>}
                    <div className={s.ModalContentData}>
                        <div className={s.ModalContentSity}>
                            <div className={s.ModalContentItem}>
                                <span>{'Ваш город'}</span>
                                <input type={'text'} name={'cityName'} onChange={inputChangeHandler}/>
                                {/*<CustomProductSelect items={cityList} customStyle={customStyle}/>*/}
                            </div>
                            <div className={s.ModalContentItem}>
                                <span>{'Улица'}</span><input type={'text'} name={'streetName'} onChange={inputChangeHandler}/>
                            </div>
                            <div className={s.ModalContentItem}>
                                <span>{'Дом'}</span><input type={'text'} name={'houseNumber'} onChange={inputChangeHandler}/>
                            </div>
                            <div className={s.ModalContentItem}>
                                <span>{'Кв'}</span><input type={'text'} name={'appartmentNumber'} onChange={inputChangeHandler}/>
                            </div>
                        </div>
                        <div className={s.ModalContentComent}>
                            <span>{'Комментарий для курьера'}</span>
                            <div>
                                <textarea name={'comment'} onChange={inputChangeHandler}/>
                            </div>
                        </div>
                    </div>
                    <button className={s.ModalLink} type={'submit'} onClick={submitHandler}>
                        {'Сохранить адрес'}
                    </button>
                </div>
            </form>
        </div>
    </div>
}
export default ModalAddress;