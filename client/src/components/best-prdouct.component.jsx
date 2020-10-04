import React from 'react'
import noImage from '../assets/images/no-image-icon-23494(1).png'
import { connect } from 'react-redux';

/**
 *
 * The section on the component that shows the sample products
 * @param {Array} {products} 
 * @return {*} 
 */
function BestProduct({products}) {
       return (
        <section className="section-best-products">
            <div className="row">
                <div className="best-products-box">
                    <h3 className="heading-secondary  best-products-box__header u-margin-bottom-small">
                        <span>Sample</span>
                        <span>Products</span>
                    </h3>
                    <p className="best-products-box__text">
                        Some of our Products
                    </p>
                    <a href={`/products/`} className="best-products-box__button">
                        View More
                    </a>
                </div>
                <div className="best-products-box">
                    { products[0] !== undefined ? 
                        <React.Fragment>
                            <img src={products[0].imageUrl} className="content__image" alt={products[0].name}/>
                            <h3 className="heading-secondary  content__header u-margin-bottom-small">
                                <span>{products[0].name}</span>
                            </h3>
                        </React.Fragment>
                        :
                        <div className='no-image'>
                            <img src={noImage} className='image' alt='no-product'/>
                        </div>
                    }
                </div>
                <div className="best-products-box">
                    { products[1] !== undefined ? 
                        <React.Fragment>
                            <img src={products[1].imageUrl} className="content__image" alt={products[1 ].name}/>
                            <h3 className="heading-secondary  content__header u-margin-bottom-small">
                                <span>{products[1].name}</span>
                            </h3>
                        </React.Fragment>
                        :
                        <div className='no-image'>
                            <img src={noImage} className='image'  alt='no-product'/>
                        </div>
                    }
                </div>
                <div className="best-products-box">
                    { products[2] !== undefined ? 
                        <React.Fragment>
                            <img src={products[2].imageUrl} className="content__image" alt={products[2].name}/>
                            <h3 className="heading-secondary  content__header u-margin-bottom-small">
                                <span>{products[2].name}</span>
                            </h3>
                        </React.Fragment>
                        :
                        <div className='no-image'>
                            <img src={noImage} className='image'  alt='no-product'/>
                        </div>
                    }
                </div>
                <div className="best-products-box">
                    { products[3] !== undefined ? 
                        <React.Fragment>
                            <img src={products[3].imageUrl} className="content__image" alt={products[3].name}/>
                            <h3 className="heading-secondary  content__header u-margin-bottom-small">
                                <span>{products[3].name}</span>
                            </h3>
                        </React.Fragment>
                        :
                        <div className='no-image'>
                            <img src={noImage} className='image' alt='no-product'/>
                        </div>
                    }
                </div>
                <div className="best-products-box">
                    { products[4] !== undefined ? 
                        <React.Fragment>
                            <img src={products[4].imageUrl} className="content__image" alt={products[2].name}/>
                            <h3 className="heading-secondary  content__header u-margin-bottom-small">
                                <span>{products[4].name}</span>
                            </h3>
                        </React.Fragment>
                        :
                        <div className='no-image'>
                            <img src={noImage} className='image' alt='no-product'/>
                        </div>
                    }
                </div>
            </div>
      </section>
    );
    
}

const mapStateToProps = (state) => ({
    products: state.product.products

})



export default connect(mapStateToProps, null)(BestProduct)