import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class ProductFilter extends Component {
    render() {
        return (
            <div>
                <div className="filter-widget">
                    <h4 className="fw-title">Danh mục</h4>
                    {this.props.categories ? (
                        <ul className="filter-catagories">
                            {this.props.categories.map(category => (
                                <li key={category._id}><NavLink to={`/products?categoryId=${category._id}`}>{category.name}</NavLink></li>
                            ))}
                        </ul>
                    ) : null}
                </div>
                <div className="filter-widget">
                    <h4 className="fw-title">Thương hiệu</h4>
                    {this.props.brands ? (
                        <ul className="filter-catagories">
                            {this.props.brands.map(brand => (
                                <li key={brand._id}><NavLink to={`/products?brandId=${brand._id}`}>{brand.name}</NavLink></li>
                            ))}
                        </ul>
                    ) : null}
                </div>
                <div className="filter-widget">
                    <h4 className="fw-title">Price</h4>
                    <div className="filter-range-wrap">
                        <div className="range-slider">
                            <div className="price-input">
                                <input type="text" id="minamount" defaultValue="$50" />
                                <input type="text" id="maxamount" defaultValue="$100" />
                            </div>
                        </div>
                        <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                            data-min="50" data-max="100">
                            <div className="ui-slider-range ui-corner-all ui-widget-header"></div>
                            <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default"></span>
                            <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default"></span>
                        </div>
                    </div>
                    <a href="/" className="filter-btn">Filter</a>
                </div>
                <div className="filter-widget">
                    <h4 className="fw-title">Size</h4>
                    <div className="fw-size-choose">
                        <div className="sc-item">
                            <input type="radio" id="s-size" />
                            <label htmlFor="s-size">s</label>
                        </div>
                        <div className="sc-item">
                            <input type="radio" id="m-size" />
                            <label htmlFor="m-size">m</label>
                        </div>
                        <div className="sc-item">
                            <input type="radio" id="l-size" />
                            <label htmlFor="l-size">l</label>
                        </div>
                        <div className="sc-item">
                            <input type="radio" id="xs-size" />
                            <label htmlFor="xs-size">xs</label>
                        </div>
                    </div>
                </div>
                <div className="filter-widget">
                    <h4 className="fw-title">Tags</h4>
                    <div className="fw-tags">
                        <a href="/">Towel</a>
                        <a href="/">Shoes</a>
                        <a href="/">Coat</a>
                        <a href="/">Dresses</a>
                        <a href="/">Trousers</a>
                        <a href="/">Men's hats</a>
                        <a href="/">Backpack</a>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        categories: state.products.categories,
        brands: state.products.brands
    };
};

export default connect(mapStateToProps, null)(ProductFilter);