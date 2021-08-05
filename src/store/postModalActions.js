export const postModalInitialState = {
    postModalActive: false,
    selectedDelivery: {},
    geoData: []
};

export const postModalActions = {
    setPostModalActive: (state, data) => ({postModalActive: data}),
    setSelectedDelivery: (state, data) => ({selectedDelivery: data}),
    setGeoData: (state, data) => ({geoData: data}),
};
