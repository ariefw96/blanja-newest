/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addItems } from './../../../redux/actionCreators/myBag'
import Rating from '../../moleculs/rating'
import './detailProduct.css'
import Review from './../../body/Review'
const base_url = process.env.REACT_APP_API_BASE_URL


class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.product_name,
            color: '',
            size: '',
        }
    }


    optCatcher = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log('size terpilih')
    }


    addToCart = () => {
        const { auth, dispatch } = this.props
        if (this.state.color == '' || this.state.size == '') {
            alert('Harap pilih warna dan ukuran!')
        } else {
            const bag = {
                user_id: auth.user_id,
                product_id: this.props.prod_id,
                product_name: this.props.product_name,
                product_img: this.props.product_img.split(',')[0],
                color: this.state.color,
                size: this.state.size,
                price: this.props.product_price,
                qty: 1
            }
            console.log(bag)
            dispatch(addItems(bag))
        }
    }

    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }



    render() {
        const { product_name, product_img, product_desc, product_price, color_id, color_name, size_id, size_name, store_name, condition_name, rating, dibeli, key, prod_id } = this.props
        const { auth, dispatch } = this.props
        let buyButton;
        if (auth.isLogin) {
            buyButton =
                <>
                    <Row className="justify-content-between mt-3 ml-1">
                        <Link className="chat text-decoration-none d-flex">Chat</Link>
                        <button className="btn btn-outline-danger mr-2 rounded-pill" onClick={this.addToCart}>Add to Cart</button>
                        <Link className="buy-now text-decoration-none d-flex ">Buy Now</Link>
                    </Row>
                </>
        }
        return (
            <>
                <Row className="d-flex" key={key}>
                    <div>
                        <div className="img">
                            <img className="img-fit" width="378px" src={base_url + product_img.split(',')[0]} />
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            {
                                product_img.split(',').map((image) => {
                                    return <>
                                        <div className="dtl-img">
                                            <img className="img-dtl" src={base_url + image} />
                                        </div>
                                    </>
                                })
                            }


                        </div>
                    </div>
                    <div className="dtl-prdct">
                        <p className="txt-name">{product_name}</p>
                        <p className="txt-brand text-muted">{store_name}</p>
                        <Rating total_rating={Math.floor(rating)} rating={rating} />
                        <p className="txt-brand text-muted mt-2">Price</p>
                        <h2>Rp. {this.toPrice(product_price)}</h2>
                        <div>
                            <p className="mt-4" style={{ fontSize: "16px", fontWeight: "bold" }} >Color</p>
                            <select id="color" className="form-control col-6" onChange={this.optCatcher}>
                                <option value="" selected hidden>Pilih warna</option>
                                <option value={color_name}>{color_name}</option>
                            </select>
                        </div>
                        <div>
                            <p className="mt-4" style={{ fontSize: "16px", fontWeight: "bold" }} >Size</p>
                            <select id="size" className="form-control col-6" onChange={this.optCatcher}>
                                <option value="" selected hidden>Pilih ukuran</option>
                                <option value={size_name}>{size_name}</option>
                            </select>
                        </div>
                        {buyButton}
                    </div>
                </Row>
                <div>
                    <h2 className="information">Informasi Product</h2>
                    <p className="condition">Condition</p>
                    <p className="v-condition">{condition_name}</p>
                    <p className="condition">Description</p>
                    <p className="v-description">{product_desc}</p>
                </div>
                <div>
                    <Review id={prod_id} rating={rating} />
                </div>
            </>
        )
    }
}

const mapStateToProps = ({ auth, bag }) => {
    return {
        auth,
        bag
    };
};

export default connect(mapStateToProps)(DetailProduct);
