import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input, Card, Breadcrumb, Layout, Modal, Button,  Menu} from 'antd';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import PayementServiceCard from "./stripe/PayementServiceCard";
import {API_KEY_PUBLIC} from  "./config"
const stripePromise = loadStripe(API_KEY_PUBLIC);
class FormCheckoutInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        }
    }

    handleLoginSubmit = () => {
        Router.push('/account/shipping');
    };
    showModal = () => {
        this.setState({
            isModalVisible: true
        })
    };
    handleOk = () => {
        this.setState({
            isModalVisible: false
        })
    };
    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
    };

    render() {
        const { amount, cartItems, cartTotal } = this.props;
        const { Header, Content, Footer,Sider } = Layout;


        return (
            <Form
                className="ps-form--checkout"
                onFinish={this.handleLoginSubmit}>
                <div className="ps-form__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <Modal title="Nouveau" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                                <div className="form-group">
                                    <Form.Item
                                        name="nom"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Enter an address!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Nom de votre bénéficiaire"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="nom"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Enter an address!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Prénom de votre bénéficiaire"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="nom"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Enter an address!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Adresse de votre bénéficiaire"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="nom"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Enter an address!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Numéro de votre bénéficiaire"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="nom"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Enter an address!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="E-mail de votre bénéficiaire"
                                        />
                                    </Form.Item>
                                </div>

                            </Modal>
                            <div className="ps-form__billing-info">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12  ps-block--checkout-order">
                                    <div className="ps-form__orders">
                                        <h3>1- Informations des bénéficiaires    </h3>
                                        <div className="ps-block--checkout-order">
                                            <div className="ps-block__content">
                                                <figure>
                                                    <figcaption>
                                                        <strong></strong>
                                                        <strong><Button type="primary" onClick={this.showModal}>+ Nouveau Bénéficiaire</Button></strong>
                                                    </figcaption>
                                                </figure>
                                                <figure className="ps-block__items">

                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12  ps-block--checkout-order">
                                    <div className="ps-form__orders">
                                        <h3>2- Type de Livraison</h3>
                                        <div className="ps-block--checkout-order">
                                            <div className="ps-block__content">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="ps-checkbox">
                                                                <input
                                                                    className="form-control"
                                                                    type="checkbox"
                                                                    id="keep-update"
                                                                />
                                                                <label htmlFor="keep-update">
                                                                   Express
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <div className="ps-checkbox">
                                                                <input
                                                                    className="form-control"
                                                                    type="checkbox"
                                                                    id="keep-update"
                                                                />
                                                                <label htmlFor="keep-update">
                                                                    Standard
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12  ps-block--checkout-order">
                                    <div className="ps-form__orders">
                                        <h3>3- Modalité de paiement</h3>
                                        <div className="ps-block--checkout-order">
                                            <div className="ps-block__content">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                    <Elements stripe={stripePromise}>
                                                        <PayementServiceCard/>
                                                    </Elements>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ps-form__submit">
                                    <Link href="/account/cart">
                                        <a>
                                            <i className="icon-arrow-left mr-2"></i>
                                            Return to shopping cart
                                        </a>
                                    </Link>
                                    <div className="ps-block__footer">
                                        <button className="ps-btn">
                                            Continue to shipping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <h3>Your order</h3>
                                <div className="ps-block--checkout-order">
                                    <div className="ps-block__content">
                                        <figure>
                                            <figcaption>
                                                <strong>Product</strong>
                                                <strong>total</strong>
                                            </figcaption>
                                        </figure>
                                        <figure className="ps-block__items">
                                            {cartItems &&
                                            cartItems.map(product => (
                                                <Link
                                                    href="/"
                                                    key={product.id}>
                                                    <a>
                                                        <strong>
                                                            {product.title}
                                                            <span>
                                                                    x
                                                                {
                                                                    product.quantity
                                                                }
                                                                </span>
                                                        </strong>
                                                        <small>
                                                            $
                                                            {product.quantity *
                                                            product.price}
                                                        </small>
                                                    </a>
                                                </Link>
                                            ))}
                                        </figure>
                                        <figure>
                                            <figcaption>
                                                <strong>Subtotal</strong>
                                                <small>${amount}</small>
                                            </figcaption>
                                        </figure>
                                        <figure className="ps-block__shipping">
                                            <h3>Shipping</h3>
                                            <p>Calculated at next step</p>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
}

export default FormCheckoutInformation;
