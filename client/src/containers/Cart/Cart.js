import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { checkValidity } from '../../util/utility';
import { connect } from 'react-redux';
import { updateCart, removeCartItem, emptyCart } from '../../store/actions/cartActions';

class Cart extends Component {

    inputChangeHandler = (event, item) => {
        let newQty = event.target.value;
        let inputRules = {
            isNumeric: true
        }
        if (newQty < 1 || !checkValidity(newQty, inputRules)) {
            newQty = 1;
        }
        this.props.updateCart(item.product._id, newQty, item.size);
    }

    changeQuantityHandler = (command, item) => {
        let newQty = item.quantity;
        if (command === '+') {
            newQty++;
        } else {
            newQty--;
        }
        if (newQty < 1) {
            newQty = 1;
        }
        this.props.updateCart(item.product._id, newQty, item.size);
    }

    removeCartItem = (item) => {
        this.props.removeCartItem(item.product._id, item.size);
    }

    emptyCart = () => {
        this.props.emptyCart();
    }

    render() {
        return (
            <div>
                <div className="breacrumb-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-text product-more">
                                    <NavLink exact to="/"><i className="fa fa-home"></i> Home</NavLink>
                                    <span>Giỏ hàng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="shopping-cart spad">
                    <div className="container">
                        <div className="row">
                            {this.props.cartItems.length > 0 ? (
                                <div className="col-lg-12">
                                    <div className="cart-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Hình ảnh</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Giá</th>
                                                    <th>Số lượng</th>
                                                    <th>Thành tiền</th>
                                                    <th><i className="ti-close"
                                                        onClick={() => this.emptyCart()}></i></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.cartItems.map(item => (
                                                    <tr key={item.product._id + item.size}>
                                                        <td className="cart-pic first-row"><img src={item.product.images[0]} alt="" /></td>
                                                        <td className="cart-title first-row">
                                                            <Link to={'/product/' + item.product._id}>
                                                                <h5>{item.product.title} (size {item.size})</h5>
                                                            </Link>
                                                        </td>
                                                        <td className="p-price first-row">${((1 - item.product.discount / 100) * item.product.price).toFixed(2)}</td>
                                                        <td className="qua-col first-row">
                                                            <div className="quantity">
                                                                <div className="pro-qty">
                                                                    <span
                                                                        className="dec qtybtn"
                                                                        onClick={() => this.changeQuantityHandler("-", item)}>-</span>
                                                                    <input
                                                                        type="text"
                                                                        value={item.quantity}
                                                                        onChange={(e) => this.inputChangeHandler(e, item)}
                                                                    />
                                                                    <span
                                                                        className="inc qtybtn"
                                                                        onClick={() => this.changeQuantityHandler("+", item)}>+</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="total-price first-row">${((1 - item.product.discount / 100) * item.product.price * item.quantity).toFixed(2)}</td>
                                                        <td className="close-td first-row">
                                                            <i className="ti-close"
                                                                onClick={() => this.removeCartItem(item)}
                                                            ></i>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="cart-buttons">
                                                <a href="/products" className="primary-btn continue-shop">Continue shopping</a>
                                                <a href="/" className="primary-btn up-cart">Update cart</a>
                                            </div>
                                            <div className="discount-coupon">
                                                <h6>Discount Codes</h6>
                                                <form action="#" className="coupon-form">
                                                    <input type="text" placeholder="Enter your codes" />
                                                    <button type="submit" className="site-btn coupon-btn">Apply</button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 offset-lg-4">
                                            <div className="proceed-checkout">
                                                <ul>
                                                    <li className="subtotal">Subtotal <span>${this.props.totalPrice}</span></li>
                                                    <li className="cart-total">Total <span>${this.props.totalPrice}</span></li>
                                                </ul>
                                                {this.props.isAuth ? (
                                                    <Link to="/checkout/shipping" className="proceed-btn">TIẾN HÀNH ĐẶT HÀNG</Link>
                                                ) : (
                                                    <Link to="/login" className="proceed-btn">ĐĂNG NHẬP ĐỂ ĐẶT HÀNG</Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (<div>Chưa có sản phẩm nào trong giỏ hàng.<Link className="shop-now" to="/products"> Mua sắm ngay!</Link></div>)}
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cartItems,
        totalPrice: state.cart.totalPrice,
        cartError: state.cart.error,
        isAuth: state.auth.token != null
    };
};

const mapDispatchToProps = {
    updateCart: updateCart,
    removeCartItem: removeCartItem,
    emptyCart: emptyCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);