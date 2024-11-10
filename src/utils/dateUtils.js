export const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
};

export const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' });
};

export const formatToDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};