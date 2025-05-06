




// import React, { useState, useEffect } from 'react';
// import { ApartmentService } from './ApartmentService';
// import { Button } from 'primereact/button';
// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import { classNames } from 'primereact/utils';
// import Update from '../apartments/Update';
// import axios from 'axios';

// const Apartments = () => {
//     const { roles } = useSelector((state) => state.token);
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [permission, setPermission] = useState([]);
//     const [layout, setLayout] = useState('grid');
//     const [visibleUpdate, setVisibleUpdate] = useState(false); // נראות הדיאלוג של Update
//     const [selectedApartment, setSelectedApartment] = useState(null);
//     const [update,setUpdate]=useState(null)
//     // Fetch apartments from service
//     const fetchApartments = () => {
//         ApartmentService.getProducts().then((data) => setProducts(data.slice(0, 12)));
//     };

//     useEffect(() => {
//         fetchApartments();
//     }, [permission,update]);

//     const perm = async (id) => {
//         try {
//             const res = await axios.put('http://localhost:8000/apartment/perm', { _id: id });
//             if (res.status === 200) {
//                 const updatedProduct = res.data;
//                 setProducts((prevProducts) =>
//                     prevProducts.map((p) =>
//                         p._id === updatedProduct._id ? updatedProduct : p
//                     )
//                 );
//                 setPermission(res.data);
//             }
//         } catch (e) {
//             console.error('Error updating permission:', e);
//         }
//     };

//     const deleteApart = async (id) => {
//         try {
//             const res = await axios({
//                 method: 'delete',
//                 url: 'http://localhost:8000/apartment',
//                 data: { _id: id },
//             });
//             if (res.status === 200) {
//                 setProducts(res.data);
//             }
//         } catch (e) {
//             console.error('Error deleting apartment:', e);
//         }
//     };

//     const handleCardClick = (e, product) => {
//         const targetTag = e.target.tagName;
//         if (targetTag !== 'BUTTON' && targetTag !== 'I') {
//             navigate(`/Apartment`, { state: { product } });
//         }
//     };

//     const handleUpdateSuccess = (updatedApartment) => {
//         setProducts((prevProducts) =>
//             prevProducts.map((p) =>
//                 p._id === updatedApartment._id ? updatedApartment : p
//             )
//         );
//     };

//     const listItem = (product, index) => (
//         <div className="col-12" key={product._id}>
//             <div
//                 className={classNames(
//                     'flex flex-column xl:flex-row xl:align-items-start p-4 gap-4',
//                     { 'border-top-1 surface-border': index !== 0 }
//                 )}
//                 onClick={(e) => handleCardClick(e, product)}
//                 style={{ cursor: 'pointer' }}
//             >
//                 <img
//                     src={`http://localhost:8000/uploads/${product.img?.[0]}`}
//                     alt="Image not available"
//                     width="200"
//                     height="200"
//                     style={{
//                         objectFit: 'cover',
//                         borderRadius: '10px',
//                     }}
//                 />
//                 <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
//                     <div className="flex flex-column align-items-center sm:align-items-start gap-3">
//                         <span className="flex align-items-center gap-2">
//                             <i className="pi pi-map-marker" />
//                             <span className="font-semibold">{`${product.address.city}, ${product.address.street}`}</span>
//                         </span>
//                         <div className="text-2xl font-bold text-900">{`${product.size} מ"ר ${product.numOfRooms} חדרים`}</div>
//                         <div className="flex align-items-center gap-3">
//                             <span className="font-semibold">{product.description}</span>
//                         </div>
//                     </div>
//                     <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
//                         <span className="text-2xl font-semibold">₪{product.price}</span>
//                         <Button icon="pi pi-heart" className="p-button-rounded"></Button>
//                         {roles === 'Admin' && (
//                             <>
//                                 <Button
//                                     icon="pi pi-trash"
//                                     className="p-button-rounded"
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         deleteApart(product._id);
//                                     }}
//                                 ></Button>

//                                 <Button
//                                     icon="pi pi-refresh"
//                                     style={{
//                                         backgroundColor: product.permission ? 'green' : 'red',
//                                         color: 'white',
//                                         borderRadius: '50%',
//                                         border: 'none',
//                                         padding: '10px 20px',
//                                         cursor: 'pointer',
//                                     }}
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         perm(product._id);
//                                     }}
//                                 ></Button>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

//     const gridItem = (product) => (
//         <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
//             <div
//                 className="p-4 border-1 surface-border surface-card border-round"
//                 onClick={(e) => handleCardClick(e, product)}
//                 style={{ cursor: 'pointer' }}
//             >
//                 <div className="flex flex-wrap align-items-center justify-content-between gap-2">
//                     <div className="flex align-items-center gap-2">
//                         <i className="pi pi-map-marker" />
//                         <span className="font-semibold">{`${product.address.city}, ${product.address.street}`}</span>
//                     </div>
//                 </div>
//                 <div className="flex flex-column align-items-center gap-3 py-5">
//                     <img
//                         src={`http://localhost:8000/uploads/${product.img?.[0]}`}
//                         alt="Image not available"
//                         width="200"
//                         height="200"
//                         style={{
//                             objectFit: 'cover',
//                             borderRadius: '10px',
//                         }}
//                     />
//                     <div className="text-2xl font-bold">{`${product.size} מ"ר ${product.numOfRooms} חדרים`}</div>
//                     <span className="font-semibold">{product.description}</span>
//                 </div>
//                 <div className="flex align-items-center justify-content-between">
//                     <span className="text-2xl font-semibold">₪{product.price}</span>
//                     <Button icon="pi pi-heart" className="p-button-rounded"></Button>
//                     {roles === 'Admin' && (
//                         <>
//                             <Button
//                                 icon="pi pi-trash"
//                                 className="p-button-rounded"
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     deleteApart(product._id);
//                                 }}
//                             ></Button>
//                             <Button
//                                 icon="pi pi-update"
//                                 rounded
//                                 severity="secondary"
//                                 aria-label="Bookmark"
//                                 onClick={() => {
//                                     setSelectedApartment(product);
//                                     setVisibleUpdate(true);
//                                 }}
//                             />
//                             <Button
//                                 icon="pi pi-refresh"
//                                 style={{
//                                     backgroundColor: product.permission ? 'green' : 'red',
//                                     color: 'white',
//                                     borderRadius: '50%',
//                                     border: 'none',
//                                     padding: '10px 20px',
//                                     cursor: 'pointer',
//                                 }}
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     perm(product._id);
//                                 }}
//                             ></Button>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );

//     const itemTemplate = (product, layout, index) => {
//         if (!product) return;

//         if (!product.permission && roles === 'User') return;

//         if (layout === 'list') return listItem(product, index);
//         else if (layout === 'grid') return gridItem(product);
//     };

//     const header = () => (
//         <div className="flex justify-content-end">
//             <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
//         </div>
//     );

//     return (
//         <div className="card" dir="rtl">
//             <DataView
//                 value={products}
//                 itemTemplate={(product, index) => itemTemplate(product, layout, index)}
//                 layout={layout}
//                 header={header()}
//             />
//             {visibleUpdate && (
//                 <Update
//                     visible={visibleUpdate}
//                     setVisible={setVisibleUpdate}
//                     apartment={selectedApartment}
//                     onUpdateSuccess={handleUpdateSuccess}
//             getApartmentsDataById={ ApartmentService.getApartmentsData}
//             setUpdate={setUpdate}

//                 />
//             )}
//         </div>
//     );
// };

// export default Apartments;
import React, { useState, useEffect } from 'react';
import { ApartmentService } from './ApartmentService';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown'; // הוספת הייבוא החסר
import { Slider } from 'primereact/slider';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { classNames } from 'primereact/utils';
import Update from '../apartments/Update';
import axios from 'axios';

const Apartments = () => {
    const { roles } = useSelector((state) => state.token);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [permission, setPermission] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [update, setUpdate] = useState(null);

    // Sidebar states for search
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [generalText, setGeneralText] = useState('');
    const [rooms, setRooms] = useState(null);
    const [sizeRange, setSizeRange] = useState([0, 200]);
    const [directions, setDirections] = useState(null);
    const [floor, setFloor] = useState('');
    const [priceRange, setPriceRange] = useState([0, 5000]);

    const directionsOptions = [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
    ];

    // Fetch apartments from service
    const fetchApartments = () => {
        ApartmentService.getProducts().then((data) => {
            setProducts(data.slice(0, 12));
            setFilteredProducts(data.slice(0, 12));
        });
    };

    useEffect(() => {
        fetchApartments();
    }, [permission, update]);

    const perm = async (id) => {
        try {
            const res = await axios.put('http://localhost:8000/apartment/perm', { _id: id });
            if (res.status === 200) {
                const updatedProduct = res.data;
                setProducts((prevProducts) =>
                    prevProducts.map((p) =>
                        p._id === updatedProduct._id ? updatedProduct : p
                    )
                );
                setPermission(res.data);
            }
        } catch (e) {
            console.error('Error updating permission:', e);
        }
    };

    // const deleteApart = async (id) => {
    //     try {
    //         const res = await axios({
    //             method: 'delete',
    //             url: 'http://localhost:8000/apartment',
    //             data: { _id: id },
    //         });
    //         if (res.status === 200) {
    //             setProducts(res.data);
    //         }
    //     } catch (e) {
    //         console.error('Error deleting apartment:', e);
    //     }
    // };
    const deleteApart = async (id) => {
        try {
            const res = await axios({
                method: 'delete',
                url: 'http://localhost:8000/apartment',
                data: { _id: id },
            });
            if (res.status === 200) {
                // עדכון המצב (state) על ידי סינון הדירה שנמחקה
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product._id !== id)
                );
                setFilteredProducts((prevFiltered) =>
                    prevFiltered.filter((product) => product._id !== id)
                );
            }
        } catch (e) {
            console.error('Error deleting apartment:', e);
        }
    };
    const handleCardClick = (e, product) => {
        const targetTag = e.target.tagName;
        if (targetTag !== 'BUTTON' && targetTag !== 'I') {
            navigate(`/Apartment`, { state: { product } });
        }
    };

    const handleUpdateSuccess = (updatedApartment) => {
        setProducts((prevProducts) =>
            prevProducts.map((p) =>
                p._id === updatedApartment._id ? updatedApartment : p
            )
        );
    };

    const handleSearch = () => {
        const filtered = products.filter((product) => {
            const searchText = generalText.toLowerCase();

            // בדיקות התאמה לפי כל הקריטריונים
            const matchesDescription = product.description?.toLowerCase().includes(searchText);
            const matchesCity = product.address?.city?.toLowerCase().includes(searchText);
            const matchesStreet = product.address?.street?.toLowerCase().includes(searchText);
            const matchesRooms = rooms ? product.numOfRooms === rooms : true;
            const matchesSize = product.size >= sizeRange[0] && product.size <= sizeRange[1];
            const matchesDirections = directions ? product.airDirections === directions : true;
            const matchesFloor = floor ? product.floor.toLowerCase() === floor.toLowerCase() : true;
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

            return (
                (matchesDescription || matchesCity || matchesStreet) &&
                matchesRooms &&
                matchesSize &&
                matchesDirections &&
                matchesFloor &&
                matchesPrice
            );
        });

        setFilteredProducts(filtered);
        setSidebarVisible(false); // Close sidebar after search
    };

    const resetFilters = () => {
        setGeneralText('');
        setRooms(null);
        setSizeRange([0, 200]);
        setDirections(null);
        setFloor('');
        setPriceRange([0, 5000]);

        // עדכון הרשימה לאחר איפוס
        fetchApartments();
        setSidebarVisible(false); // Close sidebar after reset
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) return;

        if (!product.permission && roles === 'User') return;

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listItem = (product, index) => (
        <div className="col-12" key={product._id}>
            <div
                className={classNames(
                    'flex flex-column xl:flex-row xl:align-items-start p-4 gap-4',
                    { 'border-top-1 surface-border': index !== 0 }
                )}
                onClick={(e) => handleCardClick(e, product)}
                style={{ cursor: 'pointer' }}
            >
                <img
                    src={`http://localhost:8000/uploads/${product.img?.[0]}`}
                    alt="Image not available"
                    width="200"
                    height="200"
                    style={{
                        objectFit: 'cover',
                        borderRadius: '10px',
                    }}
                />
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <span className="flex align-items-center gap-2">
                            <i className="pi pi-map-marker" />
                            <span className="font-semibold">{`${product.address.city}, ${product.address.street}`}</span>
                        </span>
                        <div className="text-2xl font-bold text-900">{`${product.size} מ"ר ${product.numOfRooms} חדרים`}</div>
                        <div className="flex align-items-center gap-3">
                            <span className="font-semibold">{product.description}</span>
                        </div>
                    </div>
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="text-2xl font-semibold">₪{product.price}</span>
                        <Button icon="pi pi-heart" className="p-button-rounded"></Button>
                        {roles === 'Admin' && (
                            <>
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-rounded"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteApart(product._id);
                                    }}
                                ></Button>
                                <Button
                                    icon="pi pi-refresh"
                                    style={{
                                        backgroundColor: product.permission ? 'green' : 'red',
                                        color: 'white',
                                        borderRadius: '50%',
                                        border: 'none',
                                        padding: '10px 20px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        perm(product._id);
                                    }}
                                ></Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const gridItem = (product) => (
        <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
            <div
                className="p-4 border-1 surface-border surface-card border-round"
                onClick={(e) => handleCardClick(e, product)}
                style={{ cursor: 'pointer' }}
            >
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-map-marker" />
                        <span className="font-semibold">{`${product.address.city}, ${product.address.street}`}</span>
                    </div>
                </div>
                <div className="flex flex-column align-items-center gap-3 py-5">
                    <img
                        src={`http://localhost:8000/uploads/${product.img?.[0]}`}
                        alt="Image not available"
                        width="200"
                        height="200"
                        style={{
                            objectFit: 'cover',
                            borderRadius: '10px',
                        }}
                    />
                    <div className="text-2xl font-bold">{`${product.size} מ"ר ${product.numOfRooms} חדרים`}</div>
                    <span className="font-semibold">{product.description}</span>
                </div>
                <div className="flex align-items-center justify-content-between">
                    <span className="text-2xl font-semibold">₪{product.price}</span>
                    <Button icon="pi pi-heart" className="p-button-rounded"></Button>
                    {roles === 'Admin' && (
                        <>
                            <Button
                                icon="pi pi-trash"
                                className="p-button-rounded"
                                onClick={(e) => {
                                        e.stopPropagation();
                                        deleteApart(product._id);
                                    }}
                            ></Button>
                            <Button
                                icon="pi pi-update"
                                rounded
                                severity="secondary"
                                aria-label="Bookmark"
                                onClick={() => {
                                    setSelectedApartment(product);
                                    setVisibleUpdate(true);
                                }}
                            />
                            <Button
                                icon="pi pi-refresh"
                                style={{
                                    backgroundColor: product.permission ? 'green' : 'red',
                                    color: 'white',
                                    borderRadius: '50%',
                                    border: 'none',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    perm(product._id);
                                }}
                            ></Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    const header = () => (
        <div className="flex justify-content-between align-items-center">
            <div className="flex align-items-center gap-3">
                <Button icon="pi pi-ellipsis-v" onClick={() => setSidebarVisible(true)} />
                <InputText
                    placeholder="חיפוש חופשי..."
                    value={generalText}
                    onChange={(e) => {
                        setGeneralText(e.target.value);
                        handleSearch(); // הפעלת החיפוש החופשי
                    }}
                    className="p-inputtext-sm"
                />
            </div>
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );

    return (
        <div className="card" dir="rtl">
            <DataView
                value={filteredProducts}
                itemTemplate={(product, index) => itemTemplate(product, layout, index)}
                layout={layout}
                header={header()}
            />
            {visibleUpdate && (
                <Update
                    visible={visibleUpdate}
                    setVisible={setVisibleUpdate}
                    apartment={selectedApartment}
                    onUpdateSuccess={handleUpdateSuccess}
                    getApartmentsDataById={ApartmentService.getApartmentsData}
                    setUpdate={setUpdate}
                />
            )}
            <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}>
                <div className="p-grid p-dir-col p-align-start">
                    <h3>חיפוש מתקדם</h3>
                    <div className="p-field">
                        <label htmlFor="rooms">מספר חדרים</label>
                        <InputNumber
                            id="rooms"
                            value={rooms}
                            onValueChange={(e) => setRooms(e.value)}
                            placeholder="הקלד מספר חדרים"
                            showButtons
                            min={0}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="sizeRange">שטח (מ"ר)</label>
                        <Slider
                            id="sizeRange"
                            value={sizeRange}
                            onChange={(e) => setSizeRange(e.value)}
                            range
                            min={0}
                            max={400}
                        />
                        <div>מ"ר {sizeRange[0]} - {sizeRange[1]}</div>
                    </div>
                    <div className="p-field">
                        <label htmlFor="directions">כיווני אוויר</label>
                        <Dropdown
                            id="directions"
                            value={directions}
                            options={directionsOptions}
                            onChange={(e) => setDirections(e.value)}
                            placeholder="בחר כיוון"
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="floor">קומה</label>
                        <InputText
                            id="floor"
                            value={floor}
                            onChange={(e) => setFloor(e.target.value)}
                            placeholder="הקלד קומה"
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="priceRange">טווח מחירים</label>
                        <Slider
                            id="priceRange"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.value)}
                            range
                            min={0}
                            max={10000}
                        />
                        <div>₪ {priceRange[0]} - ₪ {priceRange[1]}</div>
                    </div>
                    <Button label="חפש" icon="pi pi-search" onClick={handleSearch} className="p-button-success p-mb-2" />
                    <Button label="איפוס" icon="pi pi-refresh" className="p-button-secondary" onClick={resetFilters} />
                </div>
            </Sidebar>
        </div>
    );
};

export default Apartments;