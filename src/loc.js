/**
 * Converts degrees to radians.
 *
 * @param {number} value - The value in degrees to convert.
 * @return {number} The corresponding value in radians.
 */
function toRad(value) {
    return (value * Math.PI) / 180;
}

/**
 * Calculates the distance between two geographical coordinates using the Haversine formula.
 *
 * @param {number} lat1 - The latitude of the first point
 * @param {number} lng1 - The longitude of the first point
 * @param {number} lat2 - The latitude of the second point
 * @param {number} lng2 - The longitude of the second point
 * @return {number} The distance between the two points in kilometers
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const l1 = toRad(lat1);
    const l2 = toRad(lat2);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

/**
 * Sorts an array of places by their distance from a specified point.
 *
 * @param {Array} places - The array of places to be sorted.
 * @param {number} lat - The latitude of the specified point.
 * @param {number} lon - The longitude of the specified point.
 * @return {Array} A new array of places sorted by distance from the specified point.
 */
export function sortPlacesByDistance(places, lat, lon) {
    const sortedPlaces = [...places];
    sortedPlaces.sort((a, b) => {
        const distanceA = calculateDistance(lat, lon, a.lat, a.lon);
        const distanceB = calculateDistance(lat, lon, b.lat, b.lon);
        return distanceA - distanceB;
    });
    return sortedPlaces;
}
