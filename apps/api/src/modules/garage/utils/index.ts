import { Coordinate } from "../dto/coordinate.dto";

export function calculateDistance(targetCoordinate:Coordinate, coordinate2:Coordinate) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (coordinate2.lat - targetCoordinate.lat) * (Math.PI / 180);
  const dLon = (coordinate2.lng - targetCoordinate.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(targetCoordinate.lat * (Math.PI / 180)) *
      Math.cos(coordinate2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}
