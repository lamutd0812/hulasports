import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeCartItem } from '../../store/actions/cartActions';

class Navigation extends Component {

    removeCartItem = (item) => {
        this.props.removeCartItem(item.product._id, item.size);
    }

    render() {
        return (
            <div>
                <header className="header-section">
                    <div className="header-top">
                        <div className="container">
                            <div className="ht-left">
                                <div className="mail-service">
                                    <i className=" fa fa-envelope"></i>
                                    lamutd0812@gmail.com
                                </div>
                                <div className="phone-service">
                                    <i className=" fa fa-phone"></i>
                                    0999999999
                                </div>
                            </div>
                            <div className="ht-right">
                                {!this.props.isAuth ? (
                                    <NavLink to="/login" className="login-panel">
                                        <i className="fa fa-user"></i>Login
                                    </NavLink>
                                ) : (
                                        <div className="login-panel">
                                            Hello {this.props.userId} |
                                            <NavLink className="logout" to="/logout"> <i className="fa fa-sign-out"></i>Logout</NavLink>
                                        </div>
                                    )}

                                <div className="top-social">
                                    <NavLink to="/"><i className="ti-facebook"></i></NavLink>
                                    <NavLink to="/"><i className="ti-twitter-alt"></i></NavLink>
                                    <NavLink to="/"><i className="ti-linkedin"></i></NavLink>
                                    <NavLink to="/"><i className="ti-pinterest"></i></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="inner-header">
                            <div className="row">
                                <div className="col-lg-2 col-md-2">
                                    <div className="logo">
                                        <NavLink to="/">
                                            <img src="/img/logo.png" alt="" />
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-7">
                                    <div className="advanced-search">
                                        <button type="button" className="category-btn">All Categories</button>
                                        <div className="input-group">
                                            <input type="text" placeholder="What do you need?" />
                                            <button type="button"><i className="ti-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 text-right col-md-3">
                                    <ul className="nav-right">
                                        <li className="heart-icon">
                                            <NavLink exact to="/">
                                                <i className="icon_heart_alt"></i>
                                                <span>1</span>
                                            </NavLink>
                                        </li>
                                        <li className="cart-icon">
                                            <NavLink to="/cart">
                                                <i className="icon_bag_alt"></i>
                                                <span>{this.props.cartItems.length}</span>
                                            </NavLink>
                                            <div className="cart-hover">
                                                {this.props.cartItems.length > 0 ?
                                                    <div className="select-items">
                                                        <table>
                                                            <tbody>
                                                                {this.props.cartItems.map(item => (
                                                                    <tr key={item.product._id + item.size}>
                                                                        <td className="si-pic-img">
                                                                            <img src={item.product.images[0]} alt="" />
                                                                        </td>
                                                                        <td className="si-text">
                                                                            <div className="product-selected">
                                                                                <p>${((1 - item.product.discount / 100) * item.product.price).toFixed(2)} x {item.quantity}</p>
                                                                                <Link to={'/product/' + item.product._id}>
                                                                                    <h6>{item.product.title} (size {item.size})</h6>
                                                                                </Link>
                                                                            </div>
                                                                        </td>
                                                                        <td className="si-close">
                                                                            <i className="ti-close"
                                                                                onClick={() => this.removeCartItem(item)}></i>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div> : <div> Cart Empty.<Link to="/products"> Shop now!</Link></div>}
                                                <div className="select-total">
                                                    <span>total:</span>
                                                    <h5>${this.props.totalPrice}</h5>
                                                </div>
                                                <div className="select-button">
                                                    <NavLink to="/cart" className="primary-btn view-card">VIEW CART</NavLink>
                                                    <NavLink to="/checkout" className="primary-btn checkout-btn">CHECK OUT</NavLink>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="cart-price">${this.props.totalPrice}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav-item">
                        <div className="container">
                            <div className="nav-depart">
                                <div className="depart-btn">
                                    <i className="ti-menu"></i>
                                    <span>All departments</span>
                                    {this.props.categories ? (
                                        <ul className="depart-hover">
                                            {/* <li className="active"><a href="/">Women’s Clothing</a></li> */}
                                            <li><NavLink to="/products">Tất cả thể loại</NavLink></li>
                                            {this.props.categories.map(category => (
                                                <li key={category._id}><NavLink to={`/products?categoryId=${category._id}`}>{category.name}</NavLink></li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </div>
                            </div>
                            <nav className="nav-menu mobile-menu">
                                <ul>
                                    <li><NavLink to="/">Home</NavLink></li>
                                    <li><NavLink to="/products" activeClassName="link-active">Sản phẩm</NavLink></li>
                                    {/* <li><a href="/">Collection</a>
                                        <ul className="dropdown">
                                            <li><a href="/">Men's</a></li>
                                            <li><a href="/">Women's</a></li>
                                            <li><a href="/">Kid's</a></li>
                                        </ul>
                                    </li> */}
                                    {this.props.isAuth ?
                                        <li><NavLink to="/orders">Đơn hàng</NavLink></li> : null}
                                    {/* <li><a href="/">Pages</a>
                                        <ul className="dropdown">
                                            <li><a href="./blog-details.html">Blog Details</a></li>
                                            <li><a href="./shopping-cart.html">Shopping Cart</a></li>
                                            <li><a href="./check-out.html">Checkout</a></li>
                                            <li><a href="./faq.html">Faq</a></li>
                                            <li><a href="./register.html">Register</a></li>
                                            <li><a href="./login.html">Login</a></li>
                                        </ul>
                                    </li> */}
                                </ul>
                            </nav>
                            <div id="mobile-menu-wrap"></div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null,
        userId: state.auth.userId,
        categories: state.products.categories,
        cartItems: state.cart.cartItems,
        totalPrice: state.cart.totalPrice,
        cartError: state.cart.error
    };
};

const mapDispatchToProps = {
    removeCartItem: removeCartItem
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);