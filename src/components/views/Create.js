import React from "react";
import '../../App.css';
import {Container, Button, Form} from 'react-bootstrap';
import {ethers} from "ethers";
import Luna from '../Luna.json'
import AOS from 'aos';
import 'aos/dist/aos.css';

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
            contractAdress: '0x494b907d4671077fc34c338b094e77a91d5d1298',
            account: null
        }
    }

    async componentDidMount() {
        AOS.init({
            duration : 2000
        });
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            let accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            const provider = new ethers.providers.Web3Provider(window.ethereum)

            await provider.send("eth_requestAccounts", []);

            const signer = provider.getSigner()
            console.log(signer)
            console.log(accounts[0])
            this.setState({account: accounts[0]})
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

    async mint(ipfsUrl) {
        if (typeof window.ethereum !== 'undefined') {
            let accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(this.state.contractAdress, Luna, signer)
            const transaction = await contract.mint(accounts[0], `ipfs://${ipfsUrl}`)
            await transaction.wait()
            console.log(contract)
        }
    }

    create = event => {
        const that = this
        event.preventDefault()
        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
        axios.post(url, {
            "description": this.state.description,
            "image": this.state.image,
            "name": this.state.name,
            "amount": this.state.price,
            "owner": this.state.account
        }, {
            headers: {
                pinata_api_key: '95f63f4b814b56773c2c',
                pinata_secret_api_key: 'c7b6e9fac4481750a6f18727d4862dabdb45addf28e491c71d26eb9e9ceb76af'
            }
        })
            .then(function (response) {
                console.log(response)
                that.mint(response.data.IpfsHash)
                    .then(response => console.log(response))
            })
            .catch(function (error) {
                //handle error here
                console.log(error)
            });
    }

    submit() {
        if (this.state.name && this.state.name !== '' && this.state.price && this.state.price !== '' &&
            this.state.image && this.state.image !== '' && this.state.description && this.state.description !== '') {
            return <Button className="mt-4" type="submit" variant="success">Minter</Button>
        } else {
            return <Button className="mt-4" variant="danger">Minter</Button>
        }
    }

    render() {
        return (
            <div>
                <Container style={{maxWidth: "550px"}} className="mt-4">
                    <h1>Créer un NFT</h1>
                    <Form data-aos="fade-up" onSubmit={this.create} className="mt-4">
                        <Form.Control onChange={this.getName} style={{borderRadius: 0}} className="mt-4"
                                      placeholder="Nom *"/>
                        <Form.Control onChange={this.getPrice} style={{borderRadius: 0}} className="mt-4" type="number"
                                      placeholder="Prix *"/>
                        <Form.Control onChange={this.getImageUrl} style={{borderRadius: 0}} className="mt-4"
                                      placeholder="URL de l'image *"/>
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