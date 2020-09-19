import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {

    render() {
        return (
            <Aux>
                <Navigation />
                <main>
                    {this.props.children}
                </main>
                <Footer />
            </Aux>
        );
    }
}

export default Layout;