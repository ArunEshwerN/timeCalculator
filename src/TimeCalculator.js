import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import './App.css';

function TimeCalculator() {
    const [destinationTime, setDestinationTime] = useState('');
    const [earlyStart, setEarlyStart] = useState('');
    const [format12Hour, setFormat12Hour] = useState(true); // Default to 12-hour format
    const [results, setResults] = useState(null);

    const calculateTimes = (e) => {
        e.preventDefault();
        const destinationDate = new Date(`1970-01-01T${destinationTime}:00`);

        let earlyMinutes = parseInt(earlyStart);
        if (earlyStart.includes('h')) {
            earlyMinutes = parseInt(earlyStart) * 60; // Convert hours to minutes
        }

        const takeOffTime = new Date(destinationDate.getTime() - earlyMinutes * 60000 - 30 * 60000);
        const getReadyTime = new Date(takeOffTime.getTime() - 15 * 60000);
        const eatTime = new Date(getReadyTime.getTime() - 30 * 60000);
        const bathroomTime = new Date(eatTime.getTime() - 30 * 60000);

        setResults({
            takeOffTime,
            getReadyTime,
            eatTime,
            bathroomTime
        });
    };

    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = '';

        if (format12Hour) {
            ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
        }

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${formattedMinutes} ${format12Hour ? ampm : ''}`;
    };

    return (
        <div className="calculator-container">
            <Form onSubmit={calculateTimes}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Destination Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={destinationTime}
                                onChange={(e) => setDestinationTime(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Early Start (e.g., 30m or 1h)</Form.Label>
                            <Form.Control
                                type="text"
                                value={earlyStart}
                                onChange={(e) => setEarlyStart(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mt-3">
                    <Form.Check
                        type="radio"
                        label="12-Hour Format (AM/PM)"
                        checked={format12Hour}
                        onChange={() => setFormat12Hour(true)}
                    />
                    <Form.Check
                        type="radio"
                        label="24-Hour Format"
                        checked={!format12Hour}
                        onChange={() => setFormat12Hour(false)}
                    />
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit">
                    Calculate Times
                </Button>
            </Form>

            {results && (
                <div className="results mt-4">
                    <h3>Calculated Times</h3>
                    <p><strong>Take-Off Time:</strong> {formatTime(results.takeOffTime)}</p>
                    <p><strong>Get Ready Time:</strong> {formatTime(results.getReadyTime)}</p>
                    <p><strong>Eat Time:</strong> {formatTime(results.eatTime)}</p>
                    <p><strong>Bathroom Time:</strong> {formatTime(results.bathroomTime)}</p>
                </div>
            )}
        </div>
    );
}

export default TimeCalculator;
