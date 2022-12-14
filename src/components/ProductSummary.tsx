// import { Redirect, Route, Link } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
// import { IonHeader, IonTitle, IonToolbar, IonImg, IonRouterOutlet, IonApp, IonTabButton } from '@ionic/react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useParams
//   } from "react-router-dom";
  import { useState, useRef, useEffect } from 'react';
  import {useDispatch, useSelector} from 'react-redux';
  import {Product_Cart, Product_Delete} from '../actions/UserAction';
  import {RootStore} from '../store';


const ProductSummary: React.FC<any> = ({product}) => {
    const dispatch = useDispatch();
    const [prodIsOpen, setProdIsOpen] = useState<any>(false);
    const [prodQty, setProdQty] = useState<any>(1);


    const numberWithCommas =(x:any) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const changeQty = (action:any) => {
        if(action == "dec")
        {
            if(prodQty > 1)
            {
                setProdQty(prodQty-1)
            }
             
        }
        else if(action == "inc")
        {
            setProdQty(prodQty+1);
        }

    }

    const addToCart = (code:any) => {
        if(localStorage.getItem('w-commerce-token-qerfdswe')) 
        {
            var product_value = JSON.parse(localStorage.getItem('w-commerce-token-qerfdswe')!);
            var prodIndex = product_value?.findIndex((s: any) => s.code === code);
            console.log("index",prodIndex);

            if(prodIndex>=0)
            {
                product_value[prodIndex].qty += prodQty;
                localStorage.setItem('w-commerce-token-qerfdswe', JSON.stringify(product_value));
            }
            else
            {
                var temp_value = {code: code, qty: prodQty};
                product_value.push(temp_value);
                localStorage.setItem('w-commerce-token-qerfdswe', JSON.stringify(product_value));
            }
        }
        else
        {
            var new_value = [{code: code, qty: prodQty}];
            localStorage.setItem('w-commerce-token-qerfdswe', JSON.stringify(new_value));
        }
        dispatch(Product_Cart());
        
    }
    
    return (
        <>

        {console.log("This is the selected products:", product)}
        <section className="product-details spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="product__details__pic">
                            <div className="product__details__pic__item">
                                <img className="product__details__pic__item--large"
                                    src={`${product?.image_url_main}`} alt="" />
                            </div>
                            {/* <div className="product__details__pic__slider owl-carousel">
                                <img data-imgbigurl="img/product/details/product-details-2.jpg"
                                    src="img/product/details/thumb-1.jpg" alt="" />
                                <img data-imgbigurl="img/product/details/product-details-3.jpg"
                                    src="img/product/details/thumb-2.jpg" alt="" />
                                <img data-imgbigurl="img/product/details/product-details-5.jpg"
                                    src="img/product/details/thumb-3.jpg" alt="" />
                                <img data-imgbigurl="img/product/details/product-details-4.jpg"
                                    src="img/product/details/thumb-4.jpg" alt="" />
                            </div> */}
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="product__details__text">
                            <h3>{product?.product_name}</h3>
                            <div className="product__details__rating">
                                <img className="social_media" src="/assets/img/star.png" alt="" />
                                <img className="social_media" src="/assets/img/star.png" alt="" />
                                <img className="social_media" src="/assets/img/star.png" alt="" />
                                <img className="social_media" src="/assets/img/star.png" alt="" />
                                {/* <span>(18 reviews)</span> */}
                            </div>
                        <div className="product__details__price">{product?.currency_code} {numberWithCommas(product?.unit_price)}</div>
                            <p>{product?.description}</p>
                            <div className="product__details__quantity">
                                <div className="quantity">
                                    <div className="pro-qty">
                                        <span onClick={()=> {changeQty('dec')}} className="dec qtybtn">-</span>
                                        <input type="text" value={prodQty}  disabled />
                                        <span onClick={()=> {changeQty('inc')}} className="inc qtybtn">+</span>
                                    </div>
                                </div>
                            </div>
                            <a onClick={()=>{ addToCart(product?.product_code) }} className="primary-btn">ADD TO CART</a>
                            <a className="heart-icon"><img className="social_media" src="/assets/img/003-like.png" alt="" /></a>
                            <ul>
                                {
                                    product?.units_in_stock > 0 ? <li><b>Availability</b> <span>In Stock</span></li> : <li><b>Availability</b> <span>Out of Stock</span></li>
                                }
                                {/* <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>
                                <li><b>Weight</b> <span>0.5 kg</span></li> */}
                                {/* <li><b>Share on</b>
                                    <div className="share">
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                        <a href="#"><i className="fa fa-instagram"></i></a>
                                        <a href="#"><i className="fa fa-pinterest"></i></a>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="product__details__tab">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"
                                        aria-selected="true">Description</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                    <div className="product__details__tab__desc">
                                        <h6>Products Infomation</h6>
                                        <p>
                                            {
                                                product?.description
                                            }
                                        </p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        </>
    );
};

export default ProductSummary;