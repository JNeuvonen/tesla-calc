export const getDirectionsEndpoint = ({
  origin,
  target,
}: {
  origin: string;
  target: string;
}) => {
  return `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}2&destination=${target}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
};

export const getGeocodeEndpoint = (address: string) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
};
