import React from 'react';

const instagramPhotos = (props) => {
    return (
        <div className="instagram-photo">
            <div className="insta-item" style={{backgroundImage: `url(${"img/insta-1.jpg"})`}}>
                <div className="inside-text">
                    <i className="ti-instagram"></i>
                    <h5><a href="/">colorlib_Collection</a></h5>
                </div>
            </div>
            <div className="insta-item" style={{backgroundImage: `url(${"img/insta-2.jpg"})`}}>
                <div className="inside-text">
                    <i className="ti-instagram"></i>
                    <h5><a href="/">colorlib_Collection</a></h5>
                </div>
            </div>
            <div className="insta-item" style={{backgroundImage: `url(${"img/insta-3.jpg"})`}}>
                <div className="inside-text">
                    <i className="ti-instagram"></i>
                    <h5><a href="/">colorlib_Collection</a></h5>
                </div>
            </div>
            <div className="insta-item" style={{backgroundImage: `url(${"img/insta-4.jpg"})`}}>
                <div className="inside-text">
                    <i className="ti-instagram"></i>
                    <h5><a href="/">colorlib_Collection</a></h5>
                </div>
            </div>
            <div className="insta-item" style={{backgroundImage: `url(${"img/insta-5.jpg"})`}}>
                <div className="inside-text">
                    <i className="ti-instagram"></i>
                    <h5><a href="/">colorlib_Collection</a></h5>
                </div>
            </div>
            <div className="insta-item" style={{backgroundImage: `url(${"img/insta-6.jpg"})`}}>
                <div className="inside-text">
                    <i className="ti-instagram"></i>
                    <h5><a href="/">colorlib_Collection</a></h5>
                </div>
            </div>
        </div>
    );
};

export default instagramPhotos;