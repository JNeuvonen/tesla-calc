export interface GoogleLngLatToAddress {
  plus_code: PlusCode;
  results: Result[];
  status: string;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code?: PlusCode;
  types: string[];
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Geometry {
  location: Location;
  location_type: string;
  viewport: Bounds;
  bounds?: Bounds;
}

interface Bounds {
  northeast: Location;
  southwest: Location;
}

interface Location {
  lat: number;
  lng: number;
}
