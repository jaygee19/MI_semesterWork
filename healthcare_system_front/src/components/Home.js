import React, { Component } from 'react'
import Navigation from '../panels/Navigation'
import Carousel from 'react-bootstrap/Carousel'
import HC from 'C:/Users/Janci/Desktop/FRI - IV/MI/healthcare_system_front/src/images/HC.jpg'
import Doctor from 'C:/Users/Janci/Desktop/FRI - IV/MI/healthcare_system_front/src/images/dcotor2.png'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Image } from 'react-bootstrap'
import FooterCom from './FooterCom'

class Home extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <div className="container borders" style={{ color: 'dark' }}>
                    <Navigation />
                    <p></p>
                    <hr />
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={HC}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <p></p>
                    <hr />
                    <div class="row">

                        <div class="col-lg-4">
                            <div className="d-flex justify-content-around">
                                <Card style={{ width: '18rem' }}>
                                    <p></p>
                                    <Image className="rounded mx-auto d-block" width="50%" height="50%" src={Doctor} thumbnail />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                        </Card.Text>
                                        <Button variant="primary">Kontakt</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div className="d-flex justify-content-around">
                                <Card style={{ width: '18rem' }}>
                                    <p></p>
                                    <Image className="rounded mx-auto d-block" width="50%" height="50%" src={Doctor} thumbnail />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                        </Card.Text>
                                        <Button variant="primary">Kontakt</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div className="d-flex justify-content-around">
                                <Card style={{ width: '18rem' }}>
                                    <p></p>
                                    <Image className="rounded mx-auto d-block" width="50%" height="50%" src={Doctor} thumbnail />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                        </Card.Text>
                                        <Button variant="primary">Kontakt</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <FooterCom></FooterCom>
                </div>
            </div>
        )
    }
}

export default Home;