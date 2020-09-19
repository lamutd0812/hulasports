import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { checkValidity, updateObject } from '../../util/utility';
import { saveShippingInfor } from '../../store/actions/checkoutActions';
class Checkout extends Component {

    state = {
        controls: {
            fullname: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            address: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your address'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10
                },
                valid: false,
                touched: false
            },
            phone: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your phone number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 12,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            message: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your special message'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 200
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        isModalOpen: false
    }

    inputChangeHandler = (event) => {
        let controlName = event.target.name;
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        let formIsValid = true;
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }

        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    };

    formSubmitHandler = (event) => {
        event.preventDefault();
        const orderDetail = {
            fullname: this.state.controls.fullname.value,
            address: this.state.controls.address.value,
            phone: this.state.controls.phone.value,
            message: this.state.controls.message.value
        };
        this.props.saveShippingInfor(orderDetail);
        this.props.history.push('/checkout/payment');
    };

    render() {
        return (
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
                            <form className="checkout-form" onSubmit={this.formSubmitHandler}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h4>Thông tin giao hàng</h4>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <label>Họ tên<span>*</span></label>
                                                <input type="text"
                                                    name="fullname"
                                                    className={!this.state.controls.fullname.valid && this.state.controls.fullname.touched ? "form-input-error" : null}
                                                    defaultValue={this.state.controls.fullname.value}
                                                    onChange={this.inputChangeHandler} />
                                                {!this.state.controls.fullname.valid && this.state.controls.fullname.touched ? (
                                                    <p className="order-infor-error">Please enter a valid value!</p>
                                                ) : null}
                                            </div>
                                            <div className="col-lg-12">
                                                <label>Địa chỉ<span>*</span></label>
                                                <input type="text"
                                                    name="address"
                                                    className={!this.state.controls.address.valid && this.state.controls.address.touched ? "form-input-error" : null}
                                                    defaultValue={this.state.controls.address.value}
                                                    onChange={this.inputChangeHandler} />
                                                {!this.state.controls.address.valid && this.state.controls.address.touched ? (
                                                    <p className="order-infor-error">Please enter a valid value!</p>
                                                ) : null}
                                            </div>
                                            <div className="col-lg-12">
                                                <label>Số điện thoại<span>*</span></label>
                                                <input type="text"
                                                    name="phone"
                                                    className={!this.state.controls.phone.valid && this.state.controls.phone.touched ? "form-input-error" : null}
                                                    defaultValue={this.state.controls.phone.value}
                                                    onChange={this.inputChangeHandler} />
                                                {!this.state.controls.phone.valid && this.state.controls.phone.touched ? (
                                                    <p className="order-infor-error">Please enter a valid value!</p>
                                                ) : null}
                                            </div>
                                            <div className="col-lg-12">
                                                <label>Lời nhắn</label>
                                                <input type="text"
                                                    name="message"
                                                    className={!this.state.controls.message.valid && this.state.controls.message.touched ? "form-input-error" : null}
                                                    defaultValue={this.state.controls.message.value}
                                                    onChange={this.inputChangeHandler} />
                                                {!this.state.controls.message.valid && this.state.controls.message.touched ? (
                                                    <p className="order-infor-error">Please enter a valid value!</p>
                                                ) : null}
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="create-item">
                                                    <label htmlFor="acc-create">
                                                        Sử dụng thông tin tài khoản?
                                                    <input type="checkbox" id="acc-create" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="place-order">
                                            <h4>Đơn hàng của bạn</h4>
                                            <div className="order-total">
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
                                                        type="submit"
                                                        className="site-btn place-btn"
                                                        disabled={!this.state.formIsValid}>
                                                        Tiến hành thanh toán
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        ) : (
                                <div>Chưa có sản phẩm nào trong giỏ hàng.<Link className="shop-now" to="/products"> Mua sắm ngay!</Link></div>
                            )}
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
    };
};

const mapDispatchToProps = {
    saveShippingInfor: saveShippingInfor
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);