import React from "react";
import '../../App.css';
import {Container, Button, Form} from 'react-bootstrap';

const axios = require('axios');

//import { ethers, providers } from 'ethers'

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            image: '',
            description: '',
        }
    }

    getName = event => {
        event.preventDefault();
        this.setState({name: event.target.value})
    }

    getPrice = event => {
        event.preventDefault();
        this.setState({price: event.target.value})
    }

    getImageUrl = event => {
        event.preventDefault();
        this.setState({image: event.target.value})
    }

    getDesc = event => {
        event.preventDefault();
        this.setState({description: event.target.value})
    }

    create = event => {
        event.preventDefault()
        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
        axios.post(url, {
            "description": this.state.description,
            "image": this.state.image,
            "name": this.state.name,
            "amount": this.state.price
        }, {
            headers: {
                pinata_api_key: '95f63f4b814b56773c2c',
                pinata_secret_api_key: 'c7b6e9fac4481750a6f18727d4862dabdb45addf28e491c71d26eb9e9ceb76af'
            }
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                //handle error here
                console.log(error)
            });
    }

    submit(){
        if(this.state.name && this.state.name !== '' && this.state.price && this.state.price !== '' &&
        this.state.image && this.state.image !== '' && this.state.description && this.state.description !== '') {
            return <Button className="mt-4" variant="success">Minter</Button>
        } else {
            return <Button className="mt-4" variant="danger">Minter</Button>
        }
    }

    render() {
        return (
            <div>
                <Container style={{maxWidth: "550px"}} className="mt-4">
                    <h1>Créer un NFT</h1>
                    <Form className="mt-4">
                        <Form.Control onChange={this.getName} style={{borderRadius: 0}} className="mt-4"
                                      placeholder="Nom *"/>
                        <Form.Control onChange={this.getPrice} style={{borderRadius: 0}} className="mt-4" type="number"
                                      placeholder="Prix *"/>
                        <Form.Control onChange={this.getImageUrl} type="file" style={{borderRadius: 0}} className="mt-4" placeholder="Fichier *"/>
                        <Form.Control onChange={this.getDesc} style={{borderRadius: 0}} className="mt-4" as="textarea"
                                      placeholder="Description"/>
                        {this.submit()}
                    </Form>
                </Container>
            </div>
        );
    }

}

export default Create;