import axios from 'axios';

interface RouteResponse {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distance: number;
  duration: string;
}

export const getGoogleMapsRoute = async (origin: string, destination: string): Promise<RouteResponse> => {
  const googleApiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${googleApiKey}`;

  const response = await axios.get(url);
  const data = response.data.routes[0];

  return {
    origin: data.legs[0].start_location,
    destination: data.legs[0].end_location,
    distance: data.legs[0].distance.value / 1000, // em km
    duration: data.legs[0].duration.text
  };
};
