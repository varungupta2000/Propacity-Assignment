import React, { useEffect, useState } from 'react'
import flightImage from '../../public/flight.jpg';
import flightFare from "../../public/flightFare.jpg"
import { CircularProgress } from '@mui/material';
import Image from 'next/image';

import BasicModal from '../modal';
import { AirlineDetails, FlightDetails } from '../../utils/type'
import { dateAndTimeConvert } from '../../utils/dateAndTimeConvert'

import styles from "./styles.module.scss"

const FlightBoxes = () => {
    const [flightData, setFlightData] = useState<FlightDetails[]>([])
    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [dataId, setdataId] = useState(0)
    const [modal, setModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const fetchData = async () => {
        const data = await fetch("https://api.npoint.io/4829d4ab0e96bfab50e7").then(res => res.json()).then(res => setFlightData(res.data.result))
        setLoading(false)
        return data;
    }

    //This function is used to handle Sorting on the basis of price
    const handleAsSortClick = (sortingType: string) => {
        const sortedData = [...flightData];
        if (sortingType === "Asc") {
            sortedData.sort((a, b) => {
                return a.fare - b.fare;
            });
        } else {
            sortedData.sort((a, b) => {
                return b.fare - a.fare;
            });
        }
        setFlightData(sortedData);
    }

    //This function gets all the airline names
    const allAirlines = Array.from(
        new Set(
            flightData.reduce((airlines: FlightDetails[], item) => {
                item.displayData.airlines.forEach((airline: any) => airlines.push(airline.airlineName));
                return airlines;
            }, [])
        )
    ).sort();

    //This function is used 
    const handleCheckboxChange = (airline: string) => {
        const updatedAirlines = selectedAirlines.includes(airline)
            ? selectedAirlines.filter(selectedAirline => selectedAirline !== airline)
            : [...selectedAirlines, airline];
        setSelectedAirlines(updatedAirlines);
    }

    const filteredFlightData = selectedAirlines.length > 0
        ? flightData.filter(item => item.displayData.airlines.some(airline => selectedAirlines.includes(airline.airlineName)))
        : flightData;

    const handleModal = (id: string) => {
        setdataId(parseInt(id) - 1);
        setModal(true)
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    // Calculate the index of the first item on the current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Get the current items to display on the page
    const currentItems = filteredFlightData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.filter}>
                <p className={styles.sortHeading}>SORT BY:</p>
                <div className={styles.sortingButtons}>
                    <button onClick={() => handleAsSortClick("Asc")} className={styles.button}>Ascending Sort by Price</button>
                    <button onClick={() => handleAsSortClick("Des")} className={styles.button}>Descending Sort by Price</button>
                </div>
                <p className={styles.sortHeading}>FILTER BY AIRLINES:</p>
                <div className={styles.airlineFilter}>
                    {allAirlines.map((airline: any, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                value={airline}
                                checked={selectedAirlines.includes(airline)}
                                onChange={() => handleCheckboxChange(airline)}
                            />
                            <span className={styles.checkboxLabel}>{airline}</span>
                        </label>
                    ))}
                </div>
            </div>
            {isLoading && <div className={styles.loader}><CircularProgress /></div>}
            {!isLoading && <div className={styles.boxes}>
                <div className={styles.dataContainer}>
                    {currentItems.map((item: FlightDetails) =>
                        <div key={item.id} className={styles.box}>
                            {item.displayData.airlines.map((airline: AirlineDetails, index: number) => (
                                <div key={index} className={styles.airlineDetails}>
                                    <div className={styles.flightImage}>
                                        <Image src={flightImage} alt="flightImage" width={50} height={50} />
                                    </div>
                                    <p className={styles.airLineName}>{airline.airlineName}</p>
                                    <div className={styles.airlineCodeAndNumber}>
                                        <span>{airline.airlineCode}</span>
                                        <span>{airline.flightNumber}</span>
                                    </div>
                                </div>
                            ))}
                            <div className={styles.ArrivalDeparture}>
                                <div className={styles.depatureDetails}>
                                    <p className={styles.dateAndTime}>{dateAndTimeConvert(item.displayData.source.depTime).time}</p>
                                    <p className={styles.dateAndTime}>{dateAndTimeConvert(item.displayData.source.depTime).date}</p>
                                    <div className={styles.airportDetails}>
                                        <span className={styles.airportName}>{item.displayData.source.airport.airportName}
                                            &nbsp;(<span>{item.displayData.source.airport.airportCode}</span>)</span>
                                    </div>
                                </div>
                                <div className={styles.middleSection}>
                                    <p className={item.displayData.stopInfo !== "Non stop" ? styles.stop : styles.nonStop}>{item.displayData.stopInfo}</p>
                                    <hr className={styles.horizontalLine} />
                                    <p>{item.displayData.totalDuration}</p>
                                </div>
                                <div className={styles.arrivalDetails}>
                                    <p className={styles.dateAndTime}>{dateAndTimeConvert(item.displayData.destination.arrTime).time}</p>
                                    <p className={styles.dateAndTime}>{dateAndTimeConvert(item.displayData.destination.arrTime).date}</p>
                                    <div className={styles.airportDetails}>
                                        <span className={styles.airportName}>{item.displayData.destination.airport.airportName}
                                            &nbsp;(<span>{item.displayData.destination.airport.airportCode}</span>)</span>

                                    </div>
                                </div>
                            </div>
                            <div className={styles.fare}>
                                <div className={styles.flightFareImage}>
                                    <Image src={flightFare} alt="flightImage" width={70} height={70} />
                                </div>
                                <p>INR {item.fare}
                                    <p className={styles.taxes}>Includes all taxes</p>
                                    <p className={styles.viewDetails} onClick={() => handleModal(item.id)}>View Detials</p>
                                </p>
                            </div>
                        </div>)}

                    <div className={styles.pagination}>
                        {Array.from({ length: Math.ceil(filteredFlightData.length / itemsPerPage) }, (_, index) => (
                            <span key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? styles.active : styles.notActive}>
                                {index + 1}
                            </span>
                        ))}
                    </div>
                </div>
                {modal && <BasicModal open={modal} setOpen={setModal} data={filteredFlightData[dataId]} />}
            </div>}
        </div>
    )
}

export default FlightBoxes
