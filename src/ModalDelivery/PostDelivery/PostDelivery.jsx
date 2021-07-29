import React, {useState, useRef} from 'react';
import s from './PostDelivery.module.css';
import SearchIcon from '../../Icons/SearchIcon';
import CustomSelect from '../../BasketWrapper/CustomSelect/CustomSelect';
import MapImage from '../../BasketWrapper/img/map.png';

const PostDelivery = ({active, setActive}) => {
    const [mobileModalState, setMobileModalState] = useState(window.innerWidth < 768 ? 1 : 0);
    const modalRef = useRef();

    const addressList = [
        'Москва, Авиамоторная улица 6с4',
        'Москва, Красноказарменная улица 10',
        'Москва, Авиамоторная',
        'улица, д. 5',
        'Москва, Ухтомская улица, д. 13',
        'Москва, м Семёновская, Большая Семёновская улица, д. 45',
        'Москва, Песочный переулок, д. 3',
        'Москва, Авиамоторная улица 6с4',
        'Москва, Ухтомская улица, д. 13',
        'Москва, м Семёновская, Большая Семёновская улица, д. 45',
        'Мсква, Ухтомская улица, д. 13',
        'Москва, м Семёновская, Большая Семёновская улица, д. 45',
        'Москва, Авиамоторная улица 6с4',
        'Москва, Красноказарменная улица 10',
        'Москва, Авиамоторная',
        'улица, д. 5',
        'Москва, Ухтомская улица, д. 13',
        'Москва, м Семёновская, Большая Семёновская улица, д. 45',
        'Москва, Песочный переулок, д. 3',
        'Москва, Авиамоторная улица 6с4',
        'Москва, Ухтомская улица, д. 13',
        'Москва, м Семёновская, Большая Семёновская улица, д. 45',
        'Мсква, Ухтомская улица, д. 13',
        'Москва, м Семёновская, Большая Семёновская улица, д. 45'
    ]
    const deliveryList = [
        {name: 'СДЭК', price: 1190, delivery: '1-2 дня (24-26 июля)'},
        {name: 'Почта России', price: 0, delivery: '1-2 дня (24-26 июля)'},
        {name: 'EMS', price: 290, delivery: '1-2 дня (24-26 июля)'},
        {name: 'Деловые линии', price: 190, delivery: '1-2 дня (24-26 июля)'}
    ];
    const cityList = [
        {name: 'Санкт-Петербурга'},
        {name: 'Москвы'},
        {name: 'Волгограда'},
        {name: 'Ярославля'},
    ];

    const changeCkBoxHandler = (newMobileState) => {

        if(mobileModalState !== 0) {
            setMobileModalState(newMobileState);
        }

    }

    return (
        <div className={(active ? s.ModalActive : s.Modal) + ' modal-active'} ref={modalRef} onClick={() => setActive(false)}>
            <div className={mobileModalState === 1 ? s.ModalContentActive : s.ModalPostContentActive}
                 onClick={e => e.stopPropagation()}>
                <div className={mobileModalState ? s.ModalOff : s.ModalPostOff}>
                    <a className={mobileModalState ? s.ModalOffLink : s.ModalPostOffLink}
                       onClick={() => setActive(false)}></a>
                </div>
                {(mobileModalState === 1 || !mobileModalState) &&
                <div className={mobileModalState === 1 ? s.ModalDeliveryName : s.ModalPostDeliveryName}>
                    {'Выбор транспортной компании из '} <CustomSelect items={cityList} modalForm={modalRef}/>
                </div>
                }
                {mobileModalState > 1 && <div className={s.ModalPostDeliveryName}>
                    <button className={s.ModalPostChooseTKButton} onClick={() => setMobileModalState(1)}>
                        {'Вернуться к выбору ТК'}
                    </button>
                </div>
                }
                {(mobileModalState === 1 || !mobileModalState) &&
                <div className={mobileModalState ? s.ModalDeliveryData : s.ModalPostDeliveryData}>
                    {deliveryList.map((delivery, key) =>
                        <div className={mobileModalState ? s.ModalDeliveryItem : s.ModalPostDeliveryItem}>
                            <div className={mobileModalState ? s.ModalDeliveryOne : s.ModalPostDeliveryOne}>
                                <div className={s.OneInput}>
                                    <input className={s.ModalDeliveryRadio} name="delivery" value="sdek"
                                           id={`delivery-radio-${key}`} type="radio"
                                           onChange={() => changeCkBoxHandler(2)}/>
                                    <label htmlFor={`delivery-radio-${key}`}>
                                        {mobileModalState
                                            ? <>
                                                <div>
                                                    <img style={{width: '61px', height: '27px', opacity: '1 !important'}}
                                                         src="data:image/png;base64,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"
                                                         alt=""/>
                                                </div>
                                                <div className={s.OneName}>{delivery.name}</div>
                                                <div className={s.OneData}>{'1 - 2 дня (24-26 июля)'}</div>
                                                <div className={s.OnePrice}>{`${'190'.toLocaleString()} ₽`}</div>
                                            </>
                                            : <div className={s.ModalPostDelivery}>
                                                <div>
                                                    <img style={{width: '61px', height: '27px', opacity: '1 !important'}}
                                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAA6CAMAAAC9ITYKAAAAhFBMVEUAVaX///8AUqQAS6EATqIwZq19lsOBmMUGV6YrZKyardCsutdEcbGpuNYAQ54AUKMAR6D5+vzj6PHV3evJ0uTO1+cAOpsAQJ0AN5pui77x9Pl0kMGtv9qRpsxjhbuJoMnAyuAALJcAMphWerYeXKhAa698nMdjgLmetNRQbrAAJpWgqs85LslhAAAHgElEQVRYhe2ZaZOjOBKGEWCwxaWDw+hAagsGquf//79NAdVlu6iZ7aqenYiN1gcHRliPlJl6M5GD4JOtShBCaXX+ZPssdufGn/79V7lh9NOt+gXc8JQVP9ky+RUrvXJz9NMti35zf3M/y+Xqf8AV7wanXLF3N8Wv5hbmbXDAUYRG43Lur+7o/OWvuGEV/jQXt8vrkpTKKMzCJHb0xmZqeSUzMj1x79WauH4i/mIcoWM8772vFxE54i7RtdkGb1RmC10jijVHAmPuULpbPoifuKRBFBoq4Aap/TAkCB1CbaxhklHme5GJt8dU/MwVFvHOELrZslcIY4aGmjmOtEbY4q2n78cUcX7HLfk2I+BGGH4Kz8R33C0wdbw/psgzt3TIDarf7Kwpx8aaAuw6qyKpKbcrt3H2RpebfeQWt2+151YCDd8KxErPva7cIIKu5RYHJUPmahGNnu18igJOsnSblrhKM7cjuLgZy1OqSbYtamKdlWXLHrlZBFYsIqDRMjwhdKmAG1+N53o/+GdX7oTo+MxV7TDaFhuz7pOa5apQ4N3EYtsrvt7E2kZmmIMcHXJj8AAJWoRcDNFImbjnEoYEg/lO4XNcmbhxWZnk4+bigv9RJFmtTZFxvDmpXUozW3mhH3AxalZuH8fDHvw/uNG+IdwjlzOKbGR1McsW71FtGM8ujO2RDOE+OZU23viMH3L1D25QxfOc3XNjgXR+EiiJH7jqRkZdJ/2S4n4+b5LElyTF0u2z6PuLmlU628zFV/exnbt9TSF58G8oUB91HOHo0c7NpazSvk9tm+s+2qKrkKAbm4hRF6m+1VgO6dQR/BdxBWNdVs3a4vmVG0CsV5FFKnr2Lze5UeBOqdV0BQGgGURWr+rUrz6KF5zoIi2wk/ZBN964wZmi4QbWLYP3XOhzYVR4T9xzbUVGlxo56LGT5xD2DRc6SbCViQSZoNcgSkis5/4PM1ziMjnkEoUoeGUvvR64IURrHsZg+u5JN/QYSKxUobGZQvAGPuW9kaNJ5QTK2FfnQaWLUouZ4v5Jr1RE+GrA2AdttoswhLcge38QXvwWqkCWumc7oxqbxSZhXs+RBDMbY+fGmiXVsIamHFU6TnbRelOuH9zwNF3C8DKtglD2JievCWOcTuBo6Fr9PU0+h6yf91zet7eT1lLq2E3VpWb1S550+jTMl7ngXFZR2s16MHq43qZ7nQzC8PXDjxjf5cHt5t51/+WOy6yqLSzRujRNJCFdmemlWHSxGPXSddGIpRlwg9Ostrb5pXnfkKSAxKeHIVWTHHL7HQdaBtiZKVc9CCS3BuPKicf8+1WuuwWpVLWZ+zx3OtFtPddOLX1zybGWYx/iATaVya8te+D+KDGq6PUdYr8K4yiEbn8ZB28Xj1xRcDG5RKoF60HHp8SZpaq1xGeVT7nDuVKw6JTUTDUPceWGOfRfyKDMGlNhOSwGxiejyS7VMMC0SgOQ/gL39DvdQGhoHcY9ttmyyMQ1hTpnLl1m2ERW/2kLY7Ietx1Fz7oBKQMSrRc2DpIRe0eAPKwpfyIIkaBsGgL7eKhKfbCPhLS07GyRYIyVha00WllLCfuvWCDkdINfOsWMfcctQIviM9AZyH7o66AGChvrg/UCFQwpLcwDaqChgxxTvl8vZNio6R2EtFIWajypZ3VeOGLaKtPzaRJ7knzigoZbGLJoHSy4bJAYu7XUwR0JgfsNFs49183ww/iIC9kwVihOlG5gamYxs3JQxfbshX9vRNC8FbT33NMJsdaCGQmiYeTzPuRbWGPrvU6Rr1JX7prGz0fcVbagHxIsY85kOK8N1HgCFUgJLujbUw/cEYkbhzREBBrnVR2DjiFZbVwwHCj1WmtqeCA85opu+8YLMw84NVOy1Ctv+Xb/0nLPnUbEbgwBBIaVm/S3YkvDntsHiEWeq76LtdA54uIk9EWcniC27GyW2qqXGSKUfkvzD7hYoxq4Y3jH7YC7rzchZyRi4NoOrJB/wJ2uPmCFWSRqEn3CBbgZr7fGkh1zofVdDSPCpjlDzRjA0GQvLYDbhTt3roDrjrm0NXUhUDrWTIM6J3ZJaiZhQKXqVh1zrSgIpPQ0AntHLQRSt2VBf/ji91EYQLz5fVTBw0N1zO0GJgyfoHLlztqswP4lQBca7kYfcOcWEuyM2HeIPhJp8BXpghD2QX71+wjeW+grtwEROrazAw7NWQH2Yn/mbaEoUiHKa1/Mi2PusDpydQJEa+kDtyHVvHpt56Jg5cKHr0YO41nqnoNYZXWdJloarSmMUEOFq4qjuCI1ndcMDEUqHbwqENgtUFhGE3g+J0LACwwTZ2LpEEaKfsRFdljChgo715QyS4WYMyj9T0am6IgbkG47QwvJaT9Ni8jkozYsR3cOSh/d/mN9LlofPuSyfE7UopgY4E1QVMgqWi8Yy7w45r61t1Ljtcb44FTv+HxD2K18rjHWCddyv1mjv+P+1+1vzlVmwRI0vz/h+Ie5Oe7lItXt/XnLP8vliDc+R9Cjzv/Pc7Pf3H+bq34BN7iAHv1k67/yB8O/9b9G/MX/cU6fbBdf45vx8sn2H483vv3/DBDyAAAAAElFTkSuQmCC"
                                                         alt=""/>
                                                </div>
                                                <div>{delivery.name}</div>
                                                <div style={{whiteSpace: 'nowrap'}}>{'1 - 2 дня (24-26 июля)'}</div>
                                                <div style={{fontWeight: 'bold'}}>{`${'190'.toLocaleString()} ₽`}</div>
                                            </div>}
                                    </label>

                                </div>
                                {/*{mobileModalState*/}
                                {/*    ? <>*/}
                                {/*        <div>*/}
                                {/*            <img style={{width: '61px', height: '27px'}}*/}
                                {/*                 src="data:image/png;base64,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"*/}
                                {/*                 alt=""/>*/}
                                {/*        </div>*/}
                                {/*        <div className={s.OneName}>{delivery.name}</div>*/}
                                {/*        <div className={s.OneData}>{'1 - 2 дня (24-26 июля)'}</div>*/}
                                {/*        <div className={s.OnePrice}>{`${'190'.toLocaleString()} ₽`}</div>*/}
                                {/*    </>*/}
                                {/*    : <div className={s.ModalPostDelivery}>*/}
                                {/*        <div>*/}
                                {/*            <img style={{width: '61px', height: '27px'}}*/}
                                {/*                 src="data:image/png;base64,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"*/}
                                {/*                 alt=""/>*/}
                                {/*        </div>*/}
                                {/*        <div>{delivery.name}</div>*/}
                                {/*        <div style={{whiteSpace: 'nowrap'}}>{'1 - 2 дня (24-26 июля)'}</div>*/}
                                {/*        <div style={{fontWeight: 'bold'}}>{`${'190'.toLocaleString()} ₽`}</div>*/}
                                {/*    </div>}*/}
                            </div>
                        </div>
                    )}
                </div>
                }
                {(mobileModalState > 1 || !mobileModalState) &&
                <div className={s.MainBox}>
                    {(mobileModalState === 3 || !mobileModalState) && <div className={s.AddressBox}>
                        <div className={s.SearchAddress}>
                            {mobileModalState !== 0 &&
                                <button className={s.ModalPostHideList} onClick={() => setMobileModalState(2)}>
                                    {'Свернуть список'}
                                </button>
                            }
                        </div>
                        <div className={s.SearchAddress}>
                            <input placeholder={'поиск адреса'}/>
                            <SearchIcon color={'#808AAE'} size={15}/>
                        </div>
                        <div className={s.AddressBook}>
                            <ul>
                                {addressList.map((address, key) => <li key={key}>{address}</li>)}
                            </ul>
                        </div>
                    </div>}
                    <div className={s.MapBox}>
                        <div style={{height: '97%'}}>
                            <img className={s.MapImg} src={MapImage}/>
                        </div>
                        {mobileModalState === 2 &&
                        <div style={{justifyContent: 'flex-end', display: 'flex', paddingBottom: '15px'}}>
                            <button className={s.ModalPostShowList} onClick={() => setMobileModalState(3)}>
                                {'Показать списком'}
                            </button>
                        </div>}
                    </div>
                </div>
                }
            </div>
        </div>
    )
}
export default PostDelivery;