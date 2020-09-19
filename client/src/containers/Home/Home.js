import React, { Component } from 'react';
import Banner from './Banner';
import InstagramPhotos from './InstagramPhotos';

class Home extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <Banner />
                <InstagramPhotos />
            </div>
        );
    }
}

export default Home;