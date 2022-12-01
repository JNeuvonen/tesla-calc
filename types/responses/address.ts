// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface GoogleAddressRes {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Geometry {
  bounds: Bounds;
  location: Location;
  location_type: string;
  viewport: Bounds;
}

interface Bounds {
  northeast: Location;
  southwest: Location;
}

interface Location {
  lat: number;
  lng: number;
}
