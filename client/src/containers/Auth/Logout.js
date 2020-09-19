import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { getCart } from '../../store/actions/cartActions';

class Logout extends Component {

    componentDidMount(){
        this.props.onLogout();
        this.props.fetchCart();
    }

    render() {
        return (
            <div>
                <Redirect to="/" />
            </div>
        );
    }
}

const mapDispatchToProps = {
    onLogout: logout,
    fetchCart: getCart
};

export default connect(null, mapDispatchToProps)( Logout);