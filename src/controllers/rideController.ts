import { Request, Response } from 'express';
import { getGoogleMapsRoute } from '../services/googleMapsService';
import DriverModel from '../models/driverModel';
import RideModel from '../models/rideModel';

export const estimateRide = async (req: Request, res: Response) => {
  const { customer_id, origin, destination } = req.body;

  // Validações
  if (!customer_id || !origin || !destination || origin === destination) {
    return res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Dados inválidos' });
  }

  try {
    const route = await getGoogleMapsRoute(origin, destination);

    // Filtra motoristas com base na distância mínima que aceitam
    const drivers = await DriverModel.find();

    const options = drivers
      .filter(driver => route.distance >= driver.pricePerKm)
      .map(driver => ({
        id: driver._id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.rating,
          comment: 'Comentário sobre o motorista'
        },
        value: route.distance * driver.pricePerKm
      }))
      .sort((a, b) => a.value - b.value);

    return res.status(200).json({
      origin: route.origin,
      destination: route.destination,
      distance: route.distance,
      duration: route.duration,
      options,
      routeResponse: route
    });
  } catch (error) {
    return res.status(500).json({ error_code: 'SERVER_ERROR', error_description: error.message });
  }
};
