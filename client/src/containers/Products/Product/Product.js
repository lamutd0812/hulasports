import React, { Component } from 'react';
import ProductFilter from '../ProductFilter';
import { NavLink, Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../util/axios';
import { updateObject, checkValidity } from '../../../util/utility';
import { connect } from 'react-redux';
import { addToCart } from '../../../store/actions/cartActions';


class Product extends Component {

    state = {
        product: null,
        tags: null,
        selectedSize: '',
        quantity: '1',
        selectedImage: '',
        isProductAdded: false
    };

    loadProduct = () => {
        if (this.props.match.params.id) {
            if (!this.state.product || (this.state.product && this.state.product._id !== this.props.match.params.id)) {
                axios.get('/products/' + this.props.match.params.id)
                    .then(res => {
                        this.setState({
                            product: res.data.product,
                            tags: res.data.tags,
                            selectedSize: res.data.product.availableSizes[0]
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadProduct();
    }

    componentDidUpdate() {
        this.loadProduct();
    }

    selectedSizeChangeHandler = (sizeName) => {
        let newState = updateObject(this.state, { selectedSize: sizeName });
        this.setState(newState);
    }

    selectedImageChangeHandler = (image) => {
        let newState = updateObject(this.state, { selectedImage: image });
        this.setState(newState);
    }

    inputChangeHandler = (event) => {
        let newQty = event.target.value;
        let inputRules = {
            isNumeric: true
        }
        if (newQty < 1 || !checkValidity(newQty, inputRules)) {
            newQty = 1;
        }
        let newState = updateObject(this.state, { quantity: newQty });
        this.setState(newState);
    }

    changeQuantityHandler = (command) => {
        let newState = null;
        let newQty = this.state.quantity;
        if (command === '+') {
            newQty++;
        } else {
            newQty--;
        }
        if (newQty < 1) {
            newQty = 1;
        }
        newState = updateObject(this.state, { quantity: newQty });
        this.setState(newState);
    }

    addToCart = (product, quantity, size) => {
        this.props.addToCart(product._id, quantity, size);
        this.setState(updateObject(this.state, { isProductAdded: true }));
    }

    closeModal = () => {
        this.setState(updateObject(this.state, { isProductAdded: false }));
    }

    render() {
        return (
            <Aux>
                <div>
                    <div className="breacrumb-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="breadcrumb-text">
                                        <NavLink to="/"><i className="fa fa-home"></i> Home</NavLink>
                                        <NavLink to="/products">Shop</NavLink>
                                        <span>Product Detail</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.product ? (
                        <div>
                            {/* Product Shop Section Begin */}
                            <section className="product-shop spad page-details">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <ProductFilter />
                                        </div>
                                        <div className="col-lg-9">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="product-pic-zoom">
                                                        <img className="product-big-img"
                                                            src={!this.state.selectedImage ? this.state.product.images[0] :
                                                                this.state.selectedImage} alt="" />
                                                        <div className="zoom-icon">
                                                            <i className="fa fa-search-plus"></i>
                                                        </div>
                                                    </div>
                                                    <div className="product-thumbs">
                                                        <OwlCarousel className="owl-theme"
                                                            margin={10}
                                                            nav>
                                                            {this.state.product.images.map(image => (
                                                                <div className="pt-active"
                                                                    key={image}>
                                                                    <img
                                                                        src={image}
                                                                        alt=""
                                                                        onClick={() => this.selectedImageChangeHandler(image)}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </OwlCarousel>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="product-details">
                                                        <div className="pd-title">
                                                            <span>Football Kit</span>
                                                            <h3>{this.state.product.title}</h3>
                                                            <a href="/" className="heart-icon"><i className="icon_heart_alt"></i></a>
                                                        </div>
                                                        <div className="pd-rating">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star-o"></i>
                                                            <span>(5)</span>
                                                        </div>
                                                        <div className="pd-desc">
                                                            <p>{this.state.product.description}</p>
                                                            {this.state.product.discount > 0 ? (
                                                                <h4>
                                                                    ${(this.state.product.price * (1 - this.state.product.discount / 100)).toFixed(2)}
                                                                    <span>${this.state.product.price}</span>
                                                                </h4>
                                                            ) : (
                                                                <h4>
                                                                    ${this.state.product.price}
                                                                </h4>
                                                            )}
                                                        </div>
                                                        <div className="pd-size-choose">
                                                            {this.state.product.availableSizes.map(size => (
                                                                <div className="sc-item" key={size}>
                                                                    <label
                                                                        className={this.state.selectedSize === size ? "active" : null}
                                                                        onClick={() => this.selectedSizeChangeHandler(size)}>
                                                                        {size}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="quantity">
                                                            <div className="pro-qty">
                                                                <span
                                                                    className="dec qtybtn"
                                                                    onClick={() => this.changeQuantityHandler("-")}>-</span>
                                                                <input
                                                                    type="text"
                                                                    min="1"
                                                                    value={this.state.quantity}
                                                                    onChange={this.inputChangeHandler} />
                                                                <span
                                                                    className="inc qtybtn"
                                                                    onClick={() => this.changeQuantityHandler("+")}>+</span>
                                                            </div>
                                                            <button
                                                                className="primary-btn pd-cart"
                                                                onClick={() => this.addToCart(this.state.product, this.state.quantity, this.state.selectedSize)}>
                                                                Thêm vào giỏ hàng
                                                        </button>
                                                        </div>
                                                        <ul className="pd-tags">
                                                            <li>
                                                                <span>THỂ LOẠI:</span>
                                                                <Link className="pd-tags-title" to={`/products?categoryId=${this.state.product.categoryId._id}`}> {this.state.product.categoryId.name}</Link>
                                                            </li>
                                                            <li>
                                                                <span>TAGS</span>:
                                                                {this.state.tags.map(tag => (
                                                                    <Link key={tag._id} className="pd-tags-title" to={`/products?tagId=${tag._id}`}>{", "}{tag.name}</Link>
                                                                ))}
                                                            </li>
                                                        </ul>
                                                        <div className="pd-share">
                                                            <div className="p-code">Sku : 00012</div>
                                                            <div className="pd-social">
                                                                <a href="/"><i className="ti-facebook"></i></a>
                                                                <a href="/"><i className="ti-twitter-alt"></i></a>
                                                                <a href="/"><i className="ti-linkedin"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Product Tab */}
                                            <div className="product-tab">
                                                <div className="tab-item-title">
                                                    <p><b>Rating and Reviews</b></p>
                                                </div>
                                                <div className="tab-item-content">
                                                    <div className="tab-content">

                                                        {/* --------------------Customer Reviews Tab----------------- */}
                                                        <div className="tab-pane fade-in active" id="tab-3" role="tabpanel">
                                                            <div className="customer-review-option">
                                                                <h4>2 Comments</h4>
                                                                <div className="comment-option">
                                                                    <div className="co-item">
                                                                        <div className="avatar-pic">
                                                                            <img src="/img/product-single/avatar-1.png" alt="" />
                                                                        </div>
                                                                        <div className="avatar-text">
                                                                            <div className="at-rating">
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star-o"></i>
                                                                            </div>
                                                                            <h5>Brandon Kelley <span>27 Aug 2019</span></h5>
                                                                            <div className="at-reply">Nice !</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="co-item">
                                                                        <div className="avatar-pic">
                                                                            <img src="/img/product-single/avatar-2.png" alt="" />
                                                                        </div>
                                                                        <div className="avatar-text">
                                                                            <div className="at-rating">
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star-o"></i>
                                                                            </div>
                                                                            <h5>Roy Banks <span>27 Aug 2019</span></h5>
                                                                            <div className="at-reply">Nice !</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="personal-rating">
                                                                    <h6>Your Ratind</h6>
                                                                    <div className="rating">
                                                                        <i className="fa fa-star"></i>
                                                                        <i className="fa fa-star"></i>
                                                                        <i className="fa fa-star"></i>
                                                                        <i className="fa fa-star"></i>
                                                                        <i className="fa fa-star-o"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="leave-comment">
                                                                    <h4>Leave A Comment</h4>
                                                                    <form action="#" className="comment-form">
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <input type="text" placeholder="Name" />
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <input type="text" placeholder="Email" />
                                                                            </div>
                                                                            <div className="col-lg-12">
                                                                                <textarea placeholder="Messages"></textarea>
                                                                                <button type="submit" className="site-btn">Send message</button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* Product Shop Section End */}
                        </div>
                    ) : <Spinner />}
                </div>
                <Modal
                    show={this.state.isProductAdded}
                    message="Thêm vào giỏ hàng thành công!"
                    modalClosed={this.closeModal}>
                </Modal>
            </Aux>
        );
    }
}

const mapDispatchToProps = {
    addToCart: addToCart
};

export default connect(null, mapDispatchToProps)(Product);