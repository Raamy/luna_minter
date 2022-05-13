import React from "react";
import {Row, Container, Card, Button} from 'react-bootstrap';
import {ethers} from "ethers";
import Luna from "../Luna.json";
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            account: null,
            contractAdress: '0x494b907d4671077fc34c338b094e77a91d5d1298',
            metadata: null
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
            const contract = new ethers.Contract(this.state.contractAdress, Luna, signer)
            const data = await contract.returnAllUris()
            this.setState({data: data})
            console.log(data)
            let metadata = []
            for (const nft of data) {
                if(nft !== "") {
                    await axios.get("https://ipfs.io/ipfs/" + nft.substr(6, nft.length - 1))
                        .then(response => {
                            console.log(response.data)
                            metadata.push(response.data)
                        })
                }
            }
            this.setState({metadata: metadata})
        }
    }

    render = () => {

        const Nfts = () => {
            if(this.state.metadata !== null) {
                const data = this.state.metadata;
                return data.map((nft) =>
                    <Card data-aos="fade" className="mx-5 shadow-lg" bg="dark" style={{ width: '30rem' }}>
                        <Card.Img variant="top" src={nft.image} />
                        <Card.Body>
                            <Card.Title>{nft.name}</Card.Title>
                            <hr/>
                            <Card.Text style={{textAlign: 'justify'}}>
                                Description : {nft.description}
                                <br/>
                                Prix: {nft.amount} ETH
                            </Card.Text>
                            <Button>{nft.owner}</Button>
                        </Card.Body>
                    </Card>
                )
            }
        }

        return (
            <div>
                <Container className="mt-4">
                    <h1>Accueil</h1>
                    <br/>
                    <Row>
                        {Nfts()}
                    </Row>
                </Container>
            </div>
        );
    }

}

export default Home;