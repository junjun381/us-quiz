export interface City {
  name: string
  lat: number
  lng: number
  isCapital: boolean
}

export interface StateInfo {
  fips: number
  code: string
  name: string
  cities: City[]
}

export const statesData: StateInfo[] = [
  { fips: 1,  code: 'AL', name: 'Alabama',        cities: [{ name: 'Montgomery', lat: 32.366, lng: -86.300, isCapital: true }, { name: 'Birmingham', lat: 33.520, lng: -86.803, isCapital: false }] },
  { fips: 2,  code: 'AK', name: 'Alaska',          cities: [{ name: 'Juneau', lat: 58.301, lng: -134.420, isCapital: true }, { name: 'Anchorage', lat: 61.218, lng: -149.900, isCapital: false }] },
  { fips: 4,  code: 'AZ', name: 'Arizona',         cities: [{ name: 'Phoenix', lat: 33.448, lng: -112.074, isCapital: true }, { name: 'Tucson', lat: 32.222, lng: -110.975, isCapital: false }] },
  { fips: 5,  code: 'AR', name: 'Arkansas',        cities: [{ name: 'Little Rock', lat: 34.746, lng: -92.289, isCapital: true }, { name: 'Fort Smith', lat: 35.386, lng: -94.398, isCapital: false }] },
  { fips: 6,  code: 'CA', name: 'California',      cities: [{ name: 'Sacramento', lat: 38.581, lng: -121.494, isCapital: true }, { name: 'Los Angeles', lat: 34.052, lng: -118.244, isCapital: false }, { name: 'San Francisco', lat: 37.774, lng: -122.419, isCapital: false }] },
  { fips: 8,  code: 'CO', name: 'Colorado',        cities: [{ name: 'Denver', lat: 39.739, lng: -104.984, isCapital: true }, { name: 'Colorado Springs', lat: 38.833, lng: -104.821, isCapital: false }] },
  { fips: 9,  code: 'CT', name: 'Connecticut',     cities: [{ name: 'Hartford', lat: 41.763, lng: -72.685, isCapital: true }, { name: 'Bridgeport', lat: 41.179, lng: -73.190, isCapital: false }] },
  { fips: 10, code: 'DE', name: 'Delaware',        cities: [{ name: 'Dover', lat: 39.158, lng: -75.524, isCapital: true }, { name: 'Wilmington', lat: 39.745, lng: -75.547, isCapital: false }] },
  { fips: 12, code: 'FL', name: 'Florida',         cities: [{ name: 'Tallahassee', lat: 30.438, lng: -84.281, isCapital: true }, { name: 'Miami', lat: 25.774, lng: -80.194, isCapital: false }, { name: 'Jacksonville', lat: 30.332, lng: -81.656, isCapital: false }] },
  { fips: 13, code: 'GA', name: 'Georgia',         cities: [{ name: 'Atlanta', lat: 33.749, lng: -84.388, isCapital: true }, { name: 'Savannah', lat: 32.083, lng: -81.100, isCapital: false }] },
  { fips: 15, code: 'HI', name: 'Hawaii',          cities: [{ name: 'Honolulu', lat: 21.307, lng: -157.858, isCapital: true }] },
  { fips: 16, code: 'ID', name: 'Idaho',           cities: [{ name: 'Boise', lat: 43.615, lng: -116.202, isCapital: true }] },
  { fips: 17, code: 'IL', name: 'Illinois',        cities: [{ name: 'Springfield', lat: 39.798, lng: -89.654, isCapital: true }, { name: 'Chicago', lat: 41.878, lng: -87.630, isCapital: false }] },
  { fips: 18, code: 'IN', name: 'Indiana',         cities: [{ name: 'Indianapolis', lat: 39.791, lng: -86.148, isCapital: true }, { name: 'Fort Wayne', lat: 41.079, lng: -85.139, isCapital: false }] },
  { fips: 19, code: 'IA', name: 'Iowa',            cities: [{ name: 'Des Moines', lat: 41.590, lng: -93.621, isCapital: true }, { name: 'Cedar Rapids', lat: 41.977, lng: -91.665, isCapital: false }] },
  { fips: 20, code: 'KS', name: 'Kansas',          cities: [{ name: 'Topeka', lat: 39.049, lng: -95.678, isCapital: true }, { name: 'Wichita', lat: 37.692, lng: -97.330, isCapital: false }] },
  { fips: 21, code: 'KY', name: 'Kentucky',        cities: [{ name: 'Frankfort', lat: 38.200, lng: -84.863, isCapital: true }, { name: 'Louisville', lat: 38.252, lng: -85.758, isCapital: false }] },
  { fips: 22, code: 'LA', name: 'Louisiana',       cities: [{ name: 'Baton Rouge', lat: 30.451, lng: -91.154, isCapital: true }, { name: 'New Orleans', lat: 29.951, lng: -90.071, isCapital: false }] },
  { fips: 23, code: 'ME', name: 'Maine',           cities: [{ name: 'Augusta', lat: 44.324, lng: -69.765, isCapital: true }, { name: 'Portland', lat: 43.661, lng: -70.256, isCapital: false }] },
  { fips: 24, code: 'MD', name: 'Maryland',        cities: [{ name: 'Annapolis', lat: 38.972, lng: -76.501, isCapital: true }, { name: 'Baltimore', lat: 39.290, lng: -76.612, isCapital: false }] },
  { fips: 25, code: 'MA', name: 'Massachusetts',   cities: [{ name: 'Boston', lat: 42.360, lng: -71.058, isCapital: true }, { name: 'Worcester', lat: 42.262, lng: -71.802, isCapital: false }] },
  { fips: 26, code: 'MI', name: 'Michigan',        cities: [{ name: 'Lansing', lat: 42.732, lng: -84.556, isCapital: true }, { name: 'Detroit', lat: 42.331, lng: -83.046, isCapital: false }] },
  { fips: 27, code: 'MN', name: 'Minnesota',       cities: [{ name: 'Saint Paul', lat: 44.953, lng: -93.089, isCapital: true }, { name: 'Minneapolis', lat: 44.977, lng: -93.265, isCapital: false }] },
  { fips: 28, code: 'MS', name: 'Mississippi',     cities: [{ name: 'Jackson', lat: 32.317, lng: -90.207, isCapital: true }, { name: 'Gulfport', lat: 30.367, lng: -89.093, isCapital: false }] },
  { fips: 29, code: 'MO', name: 'Missouri',        cities: [{ name: 'Jefferson City', lat: 38.577, lng: -92.177, isCapital: true }, { name: 'Kansas City', lat: 39.100, lng: -94.578, isCapital: false }, { name: 'St. Louis', lat: 38.627, lng: -90.199, isCapital: false }] },
  { fips: 30, code: 'MT', name: 'Montana',         cities: [{ name: 'Helena', lat: 46.596, lng: -112.027, isCapital: true }, { name: 'Billings', lat: 45.783, lng: -108.501, isCapital: false }] },
  { fips: 31, code: 'NE', name: 'Nebraska',        cities: [{ name: 'Lincoln', lat: 40.808, lng: -96.700, isCapital: true }, { name: 'Omaha', lat: 41.257, lng: -95.938, isCapital: false }] },
  { fips: 32, code: 'NV', name: 'Nevada',          cities: [{ name: 'Carson City', lat: 39.165, lng: -119.767, isCapital: true }, { name: 'Las Vegas', lat: 36.175, lng: -115.137, isCapital: false }] },
  { fips: 33, code: 'NH', name: 'New Hampshire',   cities: [{ name: 'Concord', lat: 43.208, lng: -71.538, isCapital: true }, { name: 'Manchester', lat: 42.995, lng: -71.455, isCapital: false }] },
  { fips: 34, code: 'NJ', name: 'New Jersey',      cities: [{ name: 'Trenton', lat: 40.220, lng: -74.756, isCapital: true }, { name: 'Newark', lat: 40.736, lng: -74.172, isCapital: false }] },
  { fips: 35, code: 'NM', name: 'New Mexico',      cities: [{ name: 'Santa Fe', lat: 35.687, lng: -105.938, isCapital: true }, { name: 'Albuquerque', lat: 35.085, lng: -106.651, isCapital: false }] },
  { fips: 36, code: 'NY', name: 'New York',        cities: [{ name: 'Albany', lat: 42.652, lng: -73.756, isCapital: true }, { name: 'New York City', lat: 40.712, lng: -74.006, isCapital: false }] },
  { fips: 37, code: 'NC', name: 'North Carolina',  cities: [{ name: 'Raleigh', lat: 35.779, lng: -78.638, isCapital: true }, { name: 'Charlotte', lat: 35.227, lng: -80.843, isCapital: false }] },
  { fips: 38, code: 'ND', name: 'North Dakota',    cities: [{ name: 'Bismarck', lat: 46.808, lng: -100.783, isCapital: true }, { name: 'Fargo', lat: 46.877, lng: -96.789, isCapital: false }] },
  { fips: 39, code: 'OH', name: 'Ohio',            cities: [{ name: 'Columbus', lat: 39.962, lng: -83.000, isCapital: true }, { name: 'Cleveland', lat: 41.499, lng: -81.695, isCapital: false }, { name: 'Cincinnati', lat: 39.103, lng: -84.512, isCapital: false }] },
  { fips: 40, code: 'OK', name: 'Oklahoma',        cities: [{ name: 'Oklahoma City', lat: 35.467, lng: -97.516, isCapital: true }, { name: 'Tulsa', lat: 36.154, lng: -95.993, isCapital: false }] },
  { fips: 41, code: 'OR', name: 'Oregon',          cities: [{ name: 'Salem', lat: 44.942, lng: -123.029, isCapital: true }, { name: 'Portland', lat: 45.523, lng: -122.676, isCapital: false }] },
  { fips: 42, code: 'PA', name: 'Pennsylvania',    cities: [{ name: 'Harrisburg', lat: 40.274, lng: -76.884, isCapital: true }, { name: 'Philadelphia', lat: 39.953, lng: -75.165, isCapital: false }, { name: 'Pittsburgh', lat: 40.440, lng: -79.996, isCapital: false }] },
  { fips: 44, code: 'RI', name: 'Rhode Island',    cities: [{ name: 'Providence', lat: 41.824, lng: -71.413, isCapital: true }] },
  { fips: 45, code: 'SC', name: 'South Carolina',  cities: [{ name: 'Columbia', lat: 34.000, lng: -81.035, isCapital: true }, { name: 'Charleston', lat: 32.776, lng: -79.931, isCapital: false }] },
  { fips: 46, code: 'SD', name: 'South Dakota',    cities: [{ name: 'Pierre', lat: 44.367, lng: -100.346, isCapital: true }, { name: 'Sioux Falls', lat: 43.549, lng: -96.700, isCapital: false }] },
  { fips: 47, code: 'TN', name: 'Tennessee',       cities: [{ name: 'Nashville', lat: 36.166, lng: -86.784, isCapital: true }, { name: 'Memphis', lat: 35.149, lng: -90.048, isCapital: false }] },
  { fips: 48, code: 'TX', name: 'Texas',           cities: [{ name: 'Austin', lat: 30.267, lng: -97.743, isCapital: true }, { name: 'Houston', lat: 29.760, lng: -95.370, isCapital: false }, { name: 'Dallas', lat: 32.783, lng: -96.800, isCapital: false }] },
  { fips: 49, code: 'UT', name: 'Utah',            cities: [{ name: 'Salt Lake City', lat: 40.760, lng: -111.891, isCapital: true }, { name: 'Provo', lat: 40.233, lng: -111.658, isCapital: false }] },
  { fips: 50, code: 'VT', name: 'Vermont',         cities: [{ name: 'Montpelier', lat: 44.260, lng: -72.576, isCapital: true }, { name: 'Burlington', lat: 44.476, lng: -73.213, isCapital: false }] },
  { fips: 51, code: 'VA', name: 'Virginia',        cities: [{ name: 'Richmond', lat: 37.541, lng: -77.436, isCapital: true }, { name: 'Virginia Beach', lat: 36.853, lng: -75.978, isCapital: false }] },
  { fips: 53, code: 'WA', name: 'Washington',      cities: [{ name: 'Olympia', lat: 47.037, lng: -122.900, isCapital: true }, { name: 'Seattle', lat: 47.606, lng: -122.332, isCapital: false }] },
  { fips: 54, code: 'WV', name: 'West Virginia',   cities: [{ name: 'Charleston', lat: 38.351, lng: -81.633, isCapital: true }, { name: 'Huntington', lat: 38.419, lng: -82.445, isCapital: false }] },
  { fips: 55, code: 'WI', name: 'Wisconsin',       cities: [{ name: 'Madison', lat: 43.074, lng: -89.384, isCapital: true }, { name: 'Milwaukee', lat: 43.038, lng: -87.906, isCapital: false }] },
  { fips: 56, code: 'WY', name: 'Wyoming',         cities: [{ name: 'Cheyenne', lat: 41.140, lng: -104.820, isCapital: true }, { name: 'Casper', lat: 42.867, lng: -106.313, isCapital: false }] },
]

export const fipsToState: Record<number, StateInfo> = Object.fromEntries(
  statesData.map(s => [s.fips, s])
)

export const allCities = statesData.flatMap(s => s.cities.map(c => ({ ...c, stateCode: s.code, stateName: s.name })))
