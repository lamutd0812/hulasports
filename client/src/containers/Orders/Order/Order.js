import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOrderById } from '../../../store/actions/orderActions';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { getFormattedDate } from '../../../util/utility';

class Order extends Component {

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getOrderById(this.props.match.params.id);
        }
    }

    componentDidUpdate() {
        if (this.props.match.params.id) {
            if (!this.props.order || (this.props.order && this.props.order._id !== this.props.match.params.id)) {
                this.props.getOrderById(this.props.match.params.id);
            }
        }
    }

    render() {
        const orderInfor = (
            <section className="checkout-section checkout-section-order">
                <div className="container">
                    <div>Chi tiết đơn hàng #{this.props.order._id}</div>
                    <div>Ngày đặt hàng: {getFormattedDate(this.props.order.createdAt)}</div>
                    <div className="checkout-form">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="place-order">
                                    <h4>Thông tin giao hàng</h4>
                                    <div className="order-total order-infor-box">
                                        <ul>
                                            <li><b>Họ và tên:</b> <span>{this.props.shipmentInfor.fullname}</span></li>
                                            <li><b>Địa chỉ:</b> <span>{this.props.shipmentInfor.address}</span> </li>
                                            <li><b>Số điện thoại:</b> <span>{this.props.shipmentInfor.phone}</span> </li>
                                            <li><b>Lời nhắn:</b> <span>{this.props.shipmentInfor.message}</span> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="place-order">
                                    <h4>Hình thức giao hàng và thanh toán</h4>
                                    <div className="order-total order-infor-box">
                                        <ul>
                                            <li><b>Hình thức giao hàng:</b> <span>{this.props.shipmentMethod}</span></li>
                                            <li><b>Hình thức thanh toán:</b> <span>{this.props.paymentMethod}</span> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );

        const orderItems = (
            <section className="shopping-cart shopping-cart-order">
                <div className="container">
                    <div className="row">
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
                                        </tr>
                                    </thead>
                                    {this.props.order.items ? (
                                        <tbody>
                                            {this.props.order.items.map(item => (
                                                <tr key={item.productId + item.size}>
                                                    <td className="cart-pic first-row"><img src={item.productImage} alt="" /></td>
                                                    <td className="cart-title first-row">
                                                        <Link to={'/product/' + item.productId}>
                                                            <h5>{item.productTitle} (size {item.size})</h5>
                                                        </Link>
                                                    </td>
                                                    <td className="p-price first-row">${item.price}</td>
                                                    <td className="cart-title first-row"><b>{item.quantity}</b></td>
                                                    <td className="total-price first-row">${(item.price * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    ) : null}
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                </div>
                                <div className="col-lg-4 offset-lg-4">
                                    <div className="proceed-checkout">
                                        <ul>
                                            <li className="subtotal">Subtotal <span>${this.props.order.totalPrice}</span></li>
                                            <li className="cart-total">Total <span>${this.props.order.totalPrice}</span></li>
                                        </ul>
                                        <Link to="/orders" className="proceed-btn">XEM CÁC ĐƠN HÀNG KHÁC</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );

        return (
            <div>
                <div className="breacrumb-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-text product-more">
                                    <NavLink exact to="/"><i className="fa fa-home"></i> Home</NavLink>
                                    <NavLink to="/orders">Đơn hàng của bạn</NavLink>
                                    <span>Chi tiết đơn hàng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {!this.props.loading ? (
                    <div>
                        {orderInfor}
                        {orderItems}
                    </div>
                ) : <Spinner />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        order: state.orders.singleOrder.order,
        payment: state.orders.singleOrder.payment,
        paymentMethod: state.orders.singleOrder.paymentMethod,
        shipment: state.orders.singleOrder.shipment,
        shipmentMethod: state.orders.singleOrder.shipmentMethod,
        shipmentInfor: state.orders.singleOrder.shipmentInfor,
        loading: state.orders.loading
    };
};

const mapDispatchToProps = {
    getOrderById: getOrderById
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);