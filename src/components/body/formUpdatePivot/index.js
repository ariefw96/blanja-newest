
import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
const qs = require('querystring')



const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': 'x ' + localStorage.getItem('token')
    }
}

export default class tablePivot extends Component {

    state = {
        prod: [],
        color: [],
        size: [],
        cond: []
    }

    optCatcher = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    setUpdate = (id) => {
        this.setState({
            update_id: id.target.name
        })
    }

    submitHandler = (e) => {
        let params = {
            id: this.state.update_id
        }
        if (this.state.product_id) {
            params = {
                ...params,
                product_id: this.state.product_id
            }
        }
        if (this.state.color_id) {
            params = {
                ...params,
                color_id: this.state.color_id,
            }
        }
        if (this.state.size_id) {
            params = {
                ...params,
                size_id: this.state.size_id
            }
        }
        if (this.state.condition_id) {
            params = {
                ...params,
                condition_id: this.state.condition_id
            }
        }
        if (this.state.qty) {
            params = {
                ...params,
                qty: this.state.qty
            }
        }
        console.log(params)
        e.preventDefault()
        axios.patch('http://127.0.0.1:8000/product/update/'+params.id,qs.stringify(params), config)
        .then(({data}) => {
            console.log(data)
            alert(data.msg)
            this.setState({
                updatedData:true
            })
        }).catch((err) => {
            console.log(err)
        })

    }

    componentDidMount = () => {
        axios.get('http://127.0.0.1:8000/products/all_prod/' + localStorage.getItem('user_id'))
            .then(({ data }) => {
                this.setState({
                    prod: data
                })
            }).catch((error) => {
                console.log(error)
            })
        axios.get('http://127.0.0.1:8000/products/all_color')
            .then(({ data }) => {
                this.setState({
                    color: data
                })
            }).catch((error) => {
                console.log(error)
            })

        axios.get('http://127.0.0.1:8000/products/all_size')
            .then(({ data }) => {
                this.setState({
                    size: data
                })
            }).catch((error) => {
                console.log(error)
            })

        axios.get('http://127.0.0.1:8000/products/all_cond')
            .then(({ data }) => {
                this.setState({
                    cond: data
                })
            }).catch((error) => {
                console.log(error)
            })
        // console.log(this.props)

    }
    render() {
        console.log(this.state)
        const { prod, color, size, cond } = this.state
        console.log(this.props)
        return (
            <>

                <div className="ml-3">
                    <h2>Update Data Product</h2>
                    {this.state.updatedData && <Redirect to="/profile/myStock" />}
                    <div className="dropdown-divider"></div>
                    <form onSubmit={this.submitHandler} autoComplete="off">
                        <div className="form-group">
                            <label>Pilih Product  </label><br></br>
                            <select className="form-control col-6" id="product_id" onChange={this.optCatcher}>
                                {
                                    prod && prod.map(({ id, product_name }) => {
                                        if (id == this.props.product_id) {
                                            return (
                                                <>
                                                    <option value={id} selected>{product_name}</option>
                                                </>
                                            )
                                        } else {
                                            return (
                                                <>
                                                    <option value={id}>{product_name}</option>
                                                </>
                                            )
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Pilih Ukuran  </label><br></br>
                            <select id="size_id" className="form-control col-6" onChange={this.optCatcher}>
                                {
                                    size && size.map(({ id, size_name }) => {
                                        if (id == this.props.size_id) {
                                            return (
                                                <>
                                                    <option value={id} selected>{size_name}</option>
                                                </>
                                            )
                                        } else {
                                            return (
                                                <>
                                                    <option value={id}>{size_name}</option>
                                                </>
                                            )
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Pilih Warna  </label><br></br>
                            <select id="color_id" className="form-control col-6" onChange={this.optCatcher}>
                                <option value={this.props.id_color} selected hidden>{this.props.color}</option>
                                {
                                    color && color.map(({ id, color_name }) => {
                                        if (id == this.props.color_id) {
                                            return (
                                                <>
                                                    <option value={id} selected>{color_name}</option>
                                                </>
                                            )
                                        } else {
                                            return (
                                                <>
                                                    <option value={id}>{color_name}</option>
                                                </>
                                            )
                                        }


                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Pilih Kondisi  </label><br></br>
                            <select id="condition_id" className="form-control col-6" onChange={this.optCatcher}>
                                {
                                    cond && cond.map(({ id, condition_name }) => {
                                        if (id == this.props.condition_id) {
                                            return (
                                                <>
                                                    <option value={id} selected>{condition_name}</option>
                                                </>
                                            )
                                        } else {
                                            return (
                                                <>
                                                    <option value={id}>{condition_name}</option>
                                                </>
                                            )
                                        }


                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Jumlah  </label><br></br>
                            <input type="number" className="form-control col-3" name='qty' onChange={this.changeHandler} /><br></br>
                        </div>
                        <div className="form-group">
                            <button name={this.props.update_id} type="submit" className="btn btn-primary" onClick={this.setUpdate}>Kirim</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}