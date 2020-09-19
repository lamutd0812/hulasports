import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchProducts, fetchProductsByCategory,
    fetchProductsByTag, sortProductsByPrice
} from '../../store/actions/productActions';
import { updateObject } from '../../util/utility';
import { addToCart } from '../../store/actions/cartActions';
import { NavLink } from 'react-router-dom';
import ProductFilter from './ProductFilter';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import Pagination from './Pagination/Pagination';

class Products extends Component {

    state = {
        addedToCart: false
    }

    componentDidMount() {
        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const categoryId = query.get('categoryId');
            const tagId = query.get('tagId');
            const page = query.get('page')
            if (page) {
                if (!categoryId && !tagId) {
                    this.props.fetchProducts(page);
                }
                else {
                    if (categoryId) {
                        this.props.fetchProductsByCategory(categoryId, page);
                    }
                    if (tagId) {
                        this.props.fetchProductsByTag(tagId, page);
                    }
                }
            } else {
                if (categoryId) {
                    this.props.fetchProductsByCategory(categoryId, 1);
                }
                if (tagId) {
                    this.props.fetchProductsByTag(tagId, 1);
                }
            }
        } else {
            this.props.fetchProducts(1);
        }
    };

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const categoryId = query.get('categoryId');
            const tagId = query.get('tagId');
            const page = query.get('page')
            if (!categoryId && !tagId) {
                this.props.fetchProducts(page);
            }
            else {
                if (categoryId) {
                    this.props.fetchProductsByCategory(categoryId, page);
                }
                if (tagId) {
                    this.props.fetchProductsByTag(tagId, page);
                }
            }
        }
    }

    productImageClickedHandler = (id) => {
        this.props.history.push('/product/' + id);
    }

    addToCart = (product, quantity, size) => {
        this.props.addToCart(product._id, quantity, size);
        this.setState(updateObject(this.state, { addedToCart: true }));
    }

    closeModal = () => {
        this.setState(updateObject(this.state, { addedToCart: false }));
    }

    render() {
        const products = (
            <div>
                <div className="breacrumb-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-text">
                                    <NavLink to="/"><i className="fa fa-home"></i> Home</NavLink>
                                    <span>Shop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="product-shop spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
                                <ProductFilter />
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                <div className="product-show-option">
                                    <div className="row">
                                        <div className="col-lg-7 col-md-7">
                                            <div className="select-option">
                                                <select className="nice-select sorting"
                                                    value={this.props.sortByPrice}
                                                    onChange={(e) => this.props.sortProductsByPrice(this.props.products, e.target.value)}>
                                                    <option value="random">Giá: Ngẫu nhiên</option>
                                                    <option value="lowest">Giá: Thấp đến Cao</option>
                                                    <option value="highest">Giá: Cao đến Thấp</option>
                                                </select>
                                                <select className="nice-select p-show">
                                                    <option value="">Mới nhất</option>
                                                    <option value="">Bán chạy</option>
                                                    <option value="">Giảm giá nhiều</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-5 text-right">
                                            {this.props.products ? <p>{this.props.products.length} sản phẩm có sẵn</p> : <p>Không tìm thấy sản phẩm nào</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list">
                                    {!this.props.products ? <Spinner /> : (
                                        <div className="row">
                                            {this.props.products.map(product => (
                                                <div className="col-lg-4 col-sm-6" key={product._id}>
                                                    <div className="product-item">
                                                        <div className="pi-pic">
                                                            <img
                                                                src={product.images[0]}
                                                                alt={product.title}
                                                                onClick={() => this.productImageClickedHandler(product._id)} />
                                                            {product.discount > 0 ? <div className="sale pp-sale">-{product.discount}%</div> : null}
                                                            <div className="icon">
                                                                <i className="icon_heart_alt"></i>
                                                            </div>
                                                            <ul>
                                                                <li className="w-icon active">
                                                                    <button onClick={() => this.addToCart(product, 1, 'S')}>
                                                                        <i className="icon_bag_alt"></i>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button onClick={() => this.addToCart(product, 1, 'S')}>
                                                                        + Thêm nhanh vào giỏ
                                                                        </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="pi-text">
                                                            <div className="catagory-name">{product.categoryId.name}</div>
                                                            <NavLink to={`/product/${product._id}`}>
                                                                <h5>{product.title}</h5>
                                                            </NavLink>
                                                            {product.discount > 0 ? (
                                                                <div className="product-price">
                                                                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                                                                    <span>${product.price}</span>
                                                                </div>
                                                            ) : (
                                                                    <div className="product-price">
                                                                        ${product.price}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <Pagination
                                    currentPage={this.props.currentPage}
                                    hasNextPage={this.props.hasNextPage}
                                    hasPrevPage={this.props.hasPrevPage}
                                    nextPage={this.props.nextPage}
                                    prevPage={this.props.prevPage}
                                    lastPage={this.props.lastPage}
                                    location={this.props.location} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );

        return (
            <Aux>
                {products}
                <Modal
                    show={this.state.addedToCart}
                    message="Thêm vào giỏ hàng thành công!"
                    modalClosed={this.closeModal}>
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.allProducts,
        currentPage: state.products.currentPage,
        hasNextPage: state.products.hasNextPage,
        hasPrevPage: state.products.hasPrevPage,
        nextPage: state.products.nextPage,
        prevPage: state.products.prevPage,
        lastPage: state.products.lastPage,
        sortByPrice: state.products.sortByPrice
    };
};

const mapDispatchToProps = {
    fetchProducts: fetchProducts,
    fetchProductsByCategory: fetchProductsByCategory,
    fetchProductsByTag: fetchProductsByTag,
    sortProductsByPrice: sortProductsByPrice,
    addToCart: addToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);