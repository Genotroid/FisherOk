import React, {useState, useRef, useEffect, useMemo} from 'react';
import geoData from '../../jsons/ymap.json';
import s from './PostDelivery.module.css';
import SearchIcon from '../../Icons/SearchIcon';
import CustomSelect from '../../BasketWrapper/CustomSelect/CustomSelect';
import MapImage from '../../BasketWrapper/img/map.png';
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import placemarkIcon from '../../BasketWrapper/img/placemark.png';
import './placemark.css';

const PostDelivery = ({active, setActive, delivers, selectedDelivery}) => {
    const addressRef = useRef();
    const modalRef = useRef();
    const [mobileModalState, setMobileModalState] = useState(window.innerWidth < 768 ? 1 : 0);
    const [activeAddress, setActiveAddress] = useState(geoData[0].address_geo);
    const [placemarkList, setPlacemarkList] = useState([]);
    const [center, setCenter] = useState(geoData[0].address_geo.split(','));
    const [zoom, setZoom] = useState(9);
    const mapState = useMemo(() => ({center, zoom: 12}), [center]);
    const imgStyle = {width: '61px', height: '27px', marginRight: '10px', objectFit: 'cover'};

    const enterKeyDown = (e) => {

        if (e.key === 'Enter') {
            filterGeoDataHandler(e);
        }

    }

    const changeCheckBoxHandler = (newMobileState) => {

        if (mobileModalState) {
            setMobileModalState(newMobileState);
        }

    }

    const convertGeoDataToPlacemark = (geo) => {
        const placeMarks = geo.map(geoPlace => {
            const placemarkContent = `
                <div class="baloon-content">
                    <div class="opacity-text">Адрес:</div>
                    <div class="bold-text" style="line-height: 15px;">${geoPlace.address}</div>
                    <div class="opacity-text custom-text">Режим работы</div>
                    <div class="bold-text">Ежедневно 10:00-21:00</div>
                    <div>
                        <button class="baloon-btn">Выбрать пункт</button>
                    </div>
                </div>`

            return {
                geometry: geoPlace.address_geo.split(','),
                properties: {
                    balloonContent: placemarkContent,
                },
                options: {
                    iconLayout: 'default#image',
                    iconImageHref: placemarkIcon,
                    iconImageSize: [25, 25],
                    balloonCloseButton: false,
                },
                modules: ['geoObject.addon.balloon'],
                address: geoPlace.address,
                address_geo: geoPlace.address_geo
            }
        });

        return placeMarks;
    }

    useEffect(() => {
        const placeMarks = convertGeoDataToPlacemark(geoData);

        setPlacemarkList(placeMarks);
    }, []);

    const filterGeoDataHandler = (e) => {
        const tempGeoData = geoData.filter(geo =>
            geo.address.toLowerCase().includes(addressRef.current.value.toLowerCase())
        );
        const tempPlacemarks = convertGeoDataToPlacemark(tempGeoData);
        console.log('tempPlacemarks', tempPlacemarks);
        setPlacemarkList(tempPlacemarks);
    }

    return (
        <div className={(active ? s.ModalActive : s.Modal) + ' modal-active'} ref={modalRef}
             onClick={() => setActive(false)}>
            <div className={mobileModalState === 1 ? s.ModalContentActive : s.ModalPostContentActive}
                 onClick={e => e.stopPropagation()}>
                <div className={mobileModalState ? s.ModalOff : s.ModalPostOff}>
                    <a className={mobileModalState ? s.ModalOffLink : s.ModalPostOffLink}
                       onClick={() => setActive(false)}></a>
                </div>
                {(mobileModalState === 1 || !mobileModalState) &&
                <div className={mobileModalState === 1 ? s.ModalDeliveryName : s.ModalPostDeliveryName}>
                    {'Выбор транспортной компании из Санкт-Петербурга'}
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
                    {delivers.map((delivery, key) =>
                        <div className={mobileModalState ? s.ModalDeliveryItem : s.ModalPostDeliveryItem}>
                            <div className={mobileModalState ? s.ModalDeliveryOne : s.ModalPostDeliveryOne}>
                                <div className={s.OneInput}>
                                    <input className={s.ModalDeliveryRadio} name={"delivery"} value={key}
                                           id={`delivery-radio-${key}`} type={"radio"}
                                           checked={delivery.module_id === selectedDelivery.module_id}
                                           onChange={() => changeCheckBoxHandler(2)}/>
                                    <label htmlFor={`delivery-radio-${key}`}>
                                        {mobileModalState
                                            ? <>
                                                <img style={imgStyle}
                                                     src={delivery.logo_url} alt={""}/>
                                                <div className={s.OneName}>{delivery.name}</div>
                                                <div className={s.OneData}>
                                                    {`${delivery.shipping_deliveries_days} (24-26 июля)`}
                                                </div>
                                                <div className={s.OnePrice}>
                                                    `${delivery.shipping_cost.toLocaleString()} ₽`}
                                                </div>
                                            </>
                                            : <div className={s.ModalPostDelivery}>
                                                <div>
                                                    <img style={imgStyle}
                                                         src={delivery.logo_url} alt={""}/>
                                                </div>
                                                <div className={s.OneName}>{delivery.name}</div>
                                                <div className={s.OneData} style={{whiteSpace: 'nowrap'}}>
                                                    {`${delivery.shipping_deliveries_days} (24-26 июля)`}
                                                </div>
                                                <div className={s.OnePrice} style={{fontWeight: 'bold'}}>
                                                    {`${delivery.shipping_cost.toLocaleString()} ₽`}
                                                </div>
                                            </div>}
                                    </label>

                                </div>
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
                                <span>{'Свернуть список'}</span><span className={s.CloseSelector}/>
                            </button>
                            }
                        </div>
                        <div className={s.SearchAddress}>
                            <input placeholder={'поиск адреса'} ref={addressRef} onKeyDown={enterKeyDown}/>
                            <button onClick={filterGeoDataHandler}>
                                <SearchIcon color={'#808AAE'} size={15}/>
                            </button>

                        </div>
                        <div className={s.AddressBook}>
                            <ul>
                                {placemarkList && placemarkList.map((placemark, key) =>
                                    <li key={key} className={activeAddress === placemark.address_geo ? 'active' : ''}
                                        onClick={() => {
                                            setCenter(placemark.address_geo.split(','));
                                            setActiveAddress(placemark.address_geo);
                                        }}>
                                        {placemark.address}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>}
                    <div className={s.MapBox}>
                        <YMaps className={s.MapImg}>
                            <div>
                                <Map width={mobileModalState ? '298px' : '550px'}
                                     height={mobileModalState ? '390px' : '550px'} state={mapState}>
                                    {placemarkList && placemarkList.map((placemark, key) =>
                                        <Placemark key={key} {...placemark}/>
                                    )}
                                </Map>
                            </div>
                        </YMaps>
                        {mobileModalState === 2 &&
                        <div style={{justifyContent: 'flex-end', display: 'flex'}}>
                            <button className={s.ModalPostShowList} onClick={() => setMobileModalState(3)}>
                                <span>{'Показать списком'}</span><span className={s.OpenSelector}/>
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