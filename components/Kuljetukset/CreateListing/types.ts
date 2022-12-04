export type WeightCategory = "NONE" | "LIGHT" | "MEDIUM" | "HEAVY" | "HEAVY-XL";
export type ListingTimeSensitivityQuery = "NOT_ANSWERED" | "YES" | "NO";
export type PreciousCargo = "NOT_ANSWERED" | "IS_PRECIOUS" | "NOT_PRECIOUS";
export type DateOptions = "RANGE" | "AFTER_DATE" | "SINGULAR_DATE";
export type ErroredFieldOptions =
  | "NONE"
  | "origin-address"
  | "target-address"
  | "cargo-details"
  | "drivers-risk"
  | "listing-time-sensitivity";

export interface CreateListingSubmitForm {
  originAddress: string;
  targetAddress: TargetAddress;
  fileLocations: string[];
  mainImage: string;
  textDescription: string;
  estimatedWeight: string;
  isListingTimeSensitive: string;
  selectedDate: Date;
  dateType: string;
  isCargoPrecious: string;
  distance: string;
  duration: string;
  userID: number;
}

export type DriveDetails = {
  distance: string;
  duration: string;
};

interface TargetAddress {
  label: string;
  value: GoogleAddress;
}

interface GoogleAddress {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
}

interface MatchedSubstring {
  length: number;
  offset: number;
}

interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
}

interface Term {
  offset: number;
  value: string;
}
