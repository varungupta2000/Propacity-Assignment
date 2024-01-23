export type AirportDetails = {
    cityCode: string;
    cityName: string;
    terminal: string;
    airportCode: string;
    airportName: string;
    countryCode: string;
    countryName: string;
}

export type AirlineDetails = {
    airlineCode: string;
    airlineName: string;
    flightNumber: string;
}

export type FlightDetails = {
    id: string;
    fare: number;
    displayData: {
        source: {
            airport: AirportDetails;
            depTime: string;
        }
        airlines: AirlineDetails[];
        stopInfo: string;
        destination: {
            airport: AirportDetails;
            arrTime: string;
        }
        totalDuration: string
    }
}