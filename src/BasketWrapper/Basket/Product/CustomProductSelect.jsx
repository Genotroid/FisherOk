import React, {useState, useEffect, useRef} from 'react';
import customProduct from './customProductSelect.css';

const CustomProductSelect = ({items, selectedCityId, selectType, customStyle, changeDepCityHandler}) => {
    const buttonRef = useRef();
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [selectedKey, setSelectedKey] = useState(0);
    const [selectedItem, setSelectedItem] = useState(items.find(item => item.departure_city === selectedCityId));

    const handleClick = event => {

        if (event.target !== buttonRef.current) {
            setIsOpenSelect(false)
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick)
        }
    }, []);

    return <div className={'custom-product-wrapper'} style={customStyle ? {position: 'initial', height: '40px'} : {}}
                onClick={() => setIsOpenSelect(!isOpenSelect)}>
        <div className={`custom-product-select ${isOpenSelect ? 'open' : ''}`}>
            <div className={'custom-product__trigger'} style={customStyle ? {...customStyle, height: '40px'} : {}}
                 ref={buttonRef}>
                <span>{selectedItem.city_name}</span>
            </div>
            <div className={'custom-product-options'}>
                {items.map((item, key) =>
                    <span className={`custom-product-option ${selectedCityId === item.departure_city ? 'selected' : ''}`}
                          key={key} onClick={() => changeDepCityHandler(item.departure_city)}
                          style={customStyle ? customStyle : {}}>
                        {`${item.city_name} ${item.in_stock ? `(макс. ${item.in_stock} шт.)` : ''}`}
                    </span>
                )}
            </div>
        </div>
    </div>
}

export default CustomProductSelect;