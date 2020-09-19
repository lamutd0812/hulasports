import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../../store/actions/orderActions'
import { Link, NavLink } from 'react-router-dom';
import { getFormattedDate } from '../../util/utility';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.getOrders();
    }

    componentDidUpdate() {
        if (this.props.orders.length < 1) {
            this.props.getOrders();
        }
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
                                    <span>Đơn hàng của bạn</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="shopping-cart spad">
                    <div className="container">
                        {!this.props.loading ? (
                            <div className="row">
                                {this.props.orders.length > 0 ? (
                                    <div className="col-lg-12">
                                        <div className="cart-table orders">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Mã đơn hàng</th>
                                                        <th>Ngày mua</th>
                                                        <th>Sản phẩm</th>
                                                        <th>Tổng tiền</th>
                                                        <th>Trạng thái</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.orders.map(order => (
                                                        <tr key={order._id}>
                                                            <td className="orders first-row">
                                                                <NavLink className="link" to={`/order/${order._id}`}>{order._id}</NavLink>
                                                            </td>
                                                            <td className="orders first-row">{getFormattedDate(order.createdAt)}</td>
                                                            {order.items.length > 1 ?
                                                                (
                                                                    <td className="orders title first-row">
                                                                        {order.items[0].productTitle} và {order.items.length - 1} sản phẩm khác
                                                                    </td>
                                                                ) : (
                                                                    <td className="orders first-row">
                                                                        {order.items[0].productTitle}
                                                                    </td>
                                                                )}
                                                            <td className="orders first-row">${order.totalPrice}</td>
                                                            <td className="orders first-row">{order.status}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (<div>Bạn chưa có đơn hàng nào.<Link className="shop-now" to="/products"> Mua sắm ngay!</Link></div>)}
                            </div>
                        ) : <Spinner />}
                    </div>
                </section>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading
    };
};

const mapDispatchToProps = {
    getOrders: getOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);