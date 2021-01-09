import React from 'react'
import { Jumbotron } from 'react-bootstrap'

import Layout from '../../components/layouts'

const Home = (props) => {
    return (
        <Layout>
            <Jumbotron className="text-center m-5" style={{background: '#FFFF'}}>
                <h1>Welcome to admin dashbaord</h1>
            </Jumbotron>
        </Layout>
    )
}

export default Home
