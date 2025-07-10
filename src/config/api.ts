// API Configuration
export const API_CONFIG = {
  // This will be configurable for deployment
  BASE_URL: 'https://api.raceresult.com',
  ENDPOINTS: {
    LIVE_RESULTS: '/345604/OOYDF8PDY8ZDNZIVSQKTGQTOYG62NSF4',
  },
  // Polling interval for live updates (in milliseconds)
  POLLING_INTERVAL: 30000, // 30 seconds
};

// API Response types based on the provided JSON structure
export interface ApiField {
  Expression: string;
  Label: string;
  Label2: string;
  Alignment: number;
  FontBold: boolean;
  FontItalic: boolean;
  FontUnderlined: boolean;
  Line: number;
  Color: string;
  Link: string;
  ColSpan: number;
  ColOffset: number;
  Position: number;
  DynamicFormat: string;
  PreviewOnly: boolean;
  ResponsiveHide: number;
}

export interface ApiList {
  ListName: string;
  HeadLine1: string;
  HeadLine2: string;
  LastChange: string;
  Fields: ApiField[];
  Orders: any[];
  Filters: any[];
}

export interface ApiResponse {
  List: ApiList;
  Data: string[][];
  DataFields: string[];
  GroupFilters: any;
}

// Field mapping for easier data access
export const FIELD_MAPPING = {
  BIB: 0,
  RIDER_NAME: 1,
  RIDER_ID: 2,
  FLAG: 3,
  HORSE_NAME: 4,
  HORSE_ID: 5,
  MAIN_RANK: 6,
  // Phase 1 data starts around index 8
  PHASE_1_START: 9,
  PHASE_1_ARRIVAL: 10,
  PHASE_1_LOOP_TIME: 11,
  PHASE_1_LOOP_SPEED: 12,
  PHASE_1_IN_TIME: 13,
  PHASE_1_RECOVERY: 14,
  PHASE_1_PHASE_SPEED: 15,
  PHASE_1_RIDE_TIME: 16,
  PHASE_1_RIDE_SPEED: 17,
  PHASE_1_RANK: 18,
  PHASE_1_START_NEXT: 19,
  PHASE_1_READY: 20,
  // Phase 2 data starts around index 24
  PHASE_2_START: 25,
  PHASE_2_ARRIVAL: 26,
  PHASE_2_LOOP_TIME: 27,
  PHASE_2_LOOP_SPEED: 28,
  PHASE_2_IN_TIME: 29,
  PHASE_2_RECOVERY: 30,
  PHASE_2_PHASE_SPEED: 31,
  PHASE_2_RIDE_TIME: 32,
  PHASE_2_RIDE_SPEED: 33,
  PHASE_2_RANK: 34,
  PHASE_2_START_NEXT: 35,
  PHASE_2_READY: 36,
  // Phase 3 data starts around index 40
  PHASE_3_START: 41,
  PHASE_3_ARRIVAL: 42,
  PHASE_3_LOOP_TIME: 43,
  PHASE_3_LOOP_SPEED: 44,
  PHASE_3_IN_TIME: 45,
  PHASE_3_RECOVERY: 46,
  PHASE_3_PHASE_SPEED: 47,
  PHASE_3_RIDE_TIME: 48,
  PHASE_3_RIDE_SPEED: 49,
  PHASE_3_RANK: 50,
  PHASE_3_START_NEXT: 51,
  PHASE_3_READY: 52,
  // Vet check data starts around index 55
  VET_PRE_HR: 55,
  VET_1_RECOVERY: 60,
  VET_1_HR: 61,
  VET_1_REC_INDEX: 62,
  VET_2_RECOVERY: 75,
  VET_2_HR: 76,
  VET_2_REC_INDEX: 77,
  VET_3_RECOVERY: 90,
  VET_3_HR: 91,
  VET_3_REC_INDEX: 92,
};