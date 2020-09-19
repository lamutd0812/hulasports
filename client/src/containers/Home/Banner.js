import React from 'react';

const banner = (props) => (
    <div className="banner-section spad">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-4">
                    <div className="single-banner">
                        <img src="img/banner-1.jpg" alt="" />
                        <div className="inner-text">
                            <h4>Men’s</h4>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="single-banner">
                        <img src="img/banner-2.jpg" alt="" />
                        <div className="inner-text">
                            <h4>Women’s</h4>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="single-banner">
                        <img src="img/banner-3.jpg" alt="" />
                        <div className="inner-text">
                            <h4>Kid’s</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default banner;