import React, {useState, useEffect, useRef} from 'react';
import customProduct from './customProductSelect.css';

const CustomProductSelect = ({items, selectType, height = undefined}) => {
    const buttonRef = useRef();
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [selectedKey, setSelectedKey] = useState(0);
    const [selectedItem, setSelectedItem] = useState(items[0]);

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

    return <div className='custom-product-wrapper' onClick={() => setIsOpenSelect(!isOpenSelect)}>
        <div className={`custom-product-select ${isOpenSelect ? 'open' : ''}`}
             style={height ? {width: '174px'} : {}}>
            <div className={'custom-product__trigger'} style={height ? {height: height, margin: '0'} : {}}
                 ref={buttonRef}>
                <span>{selectedItem.name}</span>
            </div>
            <div className={'custom-product-options'}>
                {items.map((item, key) =>
                    <span className={`custom-product-option ${selectedItem === item ? 'selected' : ''}`}
                          key={key} onClick={() => setSelectedItem(item)}>
                        {`${item.name} ${item.max ? `(макс. ${item.max} шт.)` : ''}`}
                    </span>
                )}
            </div>
        </div>
    </div>
}

export default CustomProductSelect;