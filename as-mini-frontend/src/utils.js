export const formatPrice = (soldPrice, currency) => {
    // format price with host default locale
    return parseFloat(soldPrice, 10).toLocaleString(undefined, { style: 'currency', currency });
};
