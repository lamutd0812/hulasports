import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getShipmentMethods, getPaymentMethods, placeOrder } from '../../store/actions/checkoutActions';
import { emptyCart } from '../../store/actions/cartActions';
import { updateObject } from '../../util/utility';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

class Payment extends Component {

    state = {
        shipmentMethod: {
            id: null,
            selected: false
        },
        paymentMethod: {
            id: null,
            selected: false
        },
        orderCreated: false
    };

    componentDidMount() {
        this.props.getShipmentMethods();
        this.props.getPaymentMethods();
    }

    onShipmentMethodChange = (event) => {
        this.setState(updateObject(this.state, {
            shipmentMethod: {
                id: event.target.value,
                selected: true
            }
        }));
    }

    onPaymentMethodChange = (event) => {
        this.setState(updateObject(this.state, {
            paymentMethod: {
                id: event.target.value,
                selected: true
            }
        }));
    }

    editShippingInfor = () => {
        this.props.history.push('/checkout/shipping');
    }

    placeOrder = (shipmentMethodId, paymentMethodId) => {
        this.props.placeOrder(shipmentMethodId, paymentMethodId);
        this.props.emptyCart();
        this.setState(updateObject(this.state, { orderCreated: true }));
    }

    closeModal = () => {
        this.setState(updateObject(this.state, { orderCreated: false }));
        this.props.history.push('/orders');
    }

    render() {
        const payment = (
            <div>
                <div className="breacrumb-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-text product-more">
                                    <NavLink exact to="/"><i className="fa fa-home"></i> Home</NavLink>
                                    <NavLink to="/cart">Giỏ hàng</NavLink>
                                    <span>Thanh toán</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="checkout-section spad">
                    <div className="container">
                        {this.props.cartItems.length > 0 ? (
                            <div className="checkout-form">
                                <div className="row">
                                    {this.props.shippingInfor ? (
                                        <div className="col-lg-6">
                                            {this.props.shipmentMethods && this.props.paymentMethods ? (
                                                <div>
                                                    <div className="select-shipment-payment">
                                                        <h4>1. Chọn hình thức giao hàng</h4>
                                                        <h5>{this.state.shipmentMethod.id}</h5>
                                                        {this.props.shipmentMethods.map(sm => (
                                                            <div className="col-lg-12" key={sm._id}>
                                                                <div className="create-item">
                                                                    <label>
                                                                        {sm.name}
                                                                        <input type="radio"
                                                                            value={sm._id}
                                                                            onChange={this.onShipmentMethodChange}
                                                                            checked={this.state.shipmentMethod.id === sm._id} />
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="select-shipment-payment">
                                                        <h4>2. Chọn hình thức thanh toán</h4>
                                                        <h5>{this.state.paymentMethod.id}</h5>
                                                        {this.props.paymentMethods.map(pm => (
                                                            <div className="col-lg-12" key={pm._id}>
                                                                <div className="create-item">
                                                                    <label>
                                                                        {pm.name}
                                                                        <input type="radio"
                                                                            value={pm._id}
                                                                            onChange={this.onPaymentMethodChange}
                                                                            checked={this.state.paymentMethod.id === pm._id} />
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : (
                                            <div className="col-lg-6">
                                                <div className="row">
                                                    <span>Bạn chưa nhập nhập thông tin giao hàng. Click vào{" "}
                                                        <Link className="link" to="/checkout/shipping">đây</Link>
                                                        {" "}để hoàn thành thông tin giao hàng trước khi đặt hàng!</span>
                                                </div>
                                            </div>
                                        )}
                                    <div className="col-lg-6">
                                        <div className="place-order">
                                            <div className="order-total">
                                                <h4>Thông tin giao hàng <button className="edit-shipping-infor" onClick={this.editShippingInfor}>Sửa</button></h4>
                                                {this.props.shippingInfor ? (
                                                    <ul className="order-table infor">
                                                        <li className="fw-shipping-infor">Họ và tên: <span>{this.props.shippingInfor.fullname}</span></li>
                                                        <li className="fw-shipping-infor">Địa chỉ: <span>{this.props.shippingInfor.address}</span> </li>
                                                        <li className="fw-shipping-infor">Số điện thoại: <span>{this.props.shippingInfor.phone}</span> </li>
                                                        <li className="fw-shipping-infor">Lời nhắn: <span>{this.props.shippingInfor.message}</span> </li>
                                                    </ul>
                                                ) : null}
                                            </div>

                                            <div className="order-total">
                                                <h4>Đơn hàng của bạn</h4>
                                                <ul className="order-table">
                                                    <li>Sản phẩm <span>Giá</span></li>
                                                    {this.props.cartItems.map(item => (
                                                        <li key={item.product._id + item.size} className="fw-normal">
                                                            {item.product.title} x {item.quantity}
                                                            <span>${((1 - item.product.discount / 100) * item.product.price * item.quantity).toFixed(2)}</span>
                                                        </li>
                                                    ))}
                                                    <li className="fw-normal">Tạm tính <span>${this.props.totalPrice}</span></li>
                                                    <li className="total-price">Thành tiền <span>${this.props.totalPrice}</span></li>
                                                </ul>
                                                <div className="order-btn">
                                                    <button
                                                        className="site-btn place-btn"
                                                        disabled={!this.props.shippingInfor ||
                                                            !this.state.shipmentMethod.selected ||
                                                            !this.state.paymentMethod.selected}
                                                            onClick={() => this.placeOrder(this.state.shipmentMethod.id, this.state.paymentMethod.id)}>
                                                        Đặt hàng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                                <div>Chưa có sản phẩm nào trong giỏ hàng.
                                    <Link className="shop-now" to="/products"> Mua sắm ngay!</Link>
                                </div>
                            )}
                    </div>
                </section>
            </div>
        );

        return (
            <Aux>
                {payment}
                <Modal
                    show={this.state.orderCreated}
                    message="Đặt hàng thành công!"
                    modalClosed={this.closeModal}>
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cartItems,
        totalPrice: state.cart.totalPrice,
        shipmentMethods: state.checkout.shipmentMethods,
        paymentMethods: state.checkout.paymentMethods,
        shippingInfor: state.checkout.shippingInfor,
        createdOrderId: state.checkout.createdOrderId
    };
};

const mapDispatchToProps = {
    getShipmentMethods: getShipmentMethods,
    getPaymentMethods: getPaymentMethods,
    placeOrder: placeOrder,
    emptyCart: emptyCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);