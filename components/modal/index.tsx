import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AirlineDetails } from '../../utils/type';
import { dateAndTimeConvert } from '../../utils/dateAndTimeConvert';
import styles from "./styles.module.scss"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const BasicModal = ({ open, setOpen, data }: any) => {
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div key={data.id}>
                        {data.displayData.airlines.map((airline: AirlineDetails, index: number) => (
                            <div key={index}>
                                <h3 className={styles.heading}>Flight Detials</h3>
                                <p><strong>Airline Name:</strong> {airline.airlineName}</p>
                                <p><strong>Airline Code:</strong> {airline.airlineCode}</p>
                                <p><strong>Flight Number:</strong> {airline.flightNumber}</p>
                            </div>
                        ))}

                        <div className={styles.details}>
                            <h3 className={styles.heading}>Departure Details</h3>
                            <p><strong>Departure Time:</strong> {dateAndTimeConvert(data.displayData.source.depTime).time}</p>
                            <p><strong>Departure Date:</strong> {dateAndTimeConvert(data.displayData.source.depTime).date}</p>
                            <div>
                                <p><strong>Airport: </strong>{data.displayData.source.airport.airportName}
                                    &nbsp;({data.displayData.source.airport.airportCode})</p>
                                <p><strong>Gate:</strong> {data.displayData.source.airport.terminal}</p>
                            </div>
                            <div >
                                <span><strong>Country: </strong>{data.displayData.source.airport.countryName}
                                    &nbsp;({data.displayData.source.airport.countryCode})</span>
                            </div>
                        </div>
                        <div className={styles.details}>
                            <h3 className={styles.heading}>Arrival Details</h3>
                            <p><strong>Departure Time:</strong> {dateAndTimeConvert(data.displayData.destination.arrTime).time}</p>
                            <p><strong>Departure Date:</strong> {dateAndTimeConvert(data.displayData.destination.arrTime).date}</p>
                            <p ><strong>Airport: </strong> {data.displayData.destination.airport.airportName}
                                &nbsp;({data.displayData.destination.airport.airportCode})</p>
                            <p><strong>Gate:</strong> {data.displayData.destination.airport.terminal}</p>
                            <div >
                                <span><strong>Country: </strong>{data.displayData.destination.airport.countryName}
                                    &nbsp;({data.displayData.destination.airport.countryCode})</span>
                            </div>
                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default BasicModal;