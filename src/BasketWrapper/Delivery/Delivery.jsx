import React, {useState} from 'react';
import s from './Delivery.module.css'
import ModalAddress from './../../ModalAddress/ModalAddress';

const Delivery = ({deliveryList, deliveryaddress}) => {
    const [ModalActive, setModalActive] = useState(false);
    const [modalType, setModalType] = useState(deliveryList[0].id);

    return <div className={s.MeinInfo}>
        <ModalAddress active={ModalActive} setActive={setModalActive}> </ModalAddress>
        <div className={s.Delivery}>
            <div className={s.DeliveryType}>{'Тип доставки'}</div>
            <div className={s.DeliveryMedia}>
                <div className={s.DeliveryTypeData}>
                    {deliveryList.length > 0 && deliveryList.map((item, key) =>
                        <div className={s.DeliveryTypeItem}>
                            <input className={s.DeliveryRadio} name={'deliveryRadioList'} value={item.id}
                                   id={`delivery-${key}-radio`} type={'radio'} onChange={() => setModalType(item.id)}/>
                            <label htmlFor={`delivery-${key}-radio`}>{item.title}</label>
                        </div>
                    )}
                </div>
                <div className={s.DeliveryAddress}>
                    <div className={s.DeliveryAddressTitle}>{'Адрес доставки'}</div>
                    <div className={s.DeliveryAddressLoca}>{deliveryaddress}</div>
                    <div className={s.DeliveryAddressButton}>
                        <button onClick={() => setModalActive(true)} className={s.DeliveryAddressButtonItem}>
                            {'Изменить'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Delivery;