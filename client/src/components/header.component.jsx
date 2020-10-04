import React from 'react'
import Image from "../assets/images/slides/weed1.jpg";
import Image2 from "../assets/images/slides/weed2.jpg";
import Image3 from "../assets/images/slides/weed3.jpg";
import { useEffect, useState, useCallback } from 'react';
import CustomButton from './button.component';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const slideImages = [
    Image,
    Image2,
    Image3,
    
]


function Header({history, products}) {
	let [index, setIndex] = useState(0)
	
	const hoverAction =  useCallback(
		() => {
			const imageContainers = document.querySelectorAll(".composition__photo")
			imageContainers.forEach((img, i) => {
				if (i === index) {
					img.classList.add('hover');
					img.classList.remove('not-hover')
				} else {
					img.classList.remove('hover');
					img.classList.add('not-hover')
				}

			})
			if (index === 2) {
				index = 0
				setIndex(index)
			} else {
				index = index + 1;
				setIndex(index)
			}
		},
		[],
	)

	useEffect(() => {
		let intervalHandler = setInterval(hoverAction,1000)
		return () => {
			clearInterval(intervalHandler)
		}
	}, [hoverAction])

    return (
      <header className="header">
        <div className="header__background">
          <div className="header__text-box">
            <h1 className="heading-primary">
              <span className="heading-primary__main">
                	We got 
				<span>you</span>
              </span>
              <span className="heading-primary__sub">
                Your one stop <br/>
                for quality products <br/>
              </span>
            </h1>
            <CustomButton onClick={()=>history.push('/products')}>
              Start
            </CustomButton>
          </div>
        </div>
        <div className="header__right">
			{ products[0] !== undefined ? 
				<React.Fragment>
					<img 
						src={products[0].imageUrl} 
						className="composition__photo composition__photo--p1" 
						alt={products[0].name}/>
				</React.Fragment>
				:
				<div className='no-image'>
					<img
					alt="default 1"
					className="composition__photo composition__photo--p1"
					src={slideImages[0]}
					/>
				</div>
			}
			{ products[1] !== undefined ? 
				<React.Fragment>
					<img src={products[1].imageUrl} className="composition__photo composition__photo--p2" alt={products[1].name}/>
				</React.Fragment>:
				<div className='no-image'>
					<img
						alt="default 2"
						className="composition__photo composition__photo--p2"
						src={slideImages[1]}
					/>
				</div>
			}
			{ products[2] !== undefined ? 
				<React.Fragment>
					<img src={products[2].imageUrl} className="composition__photo composition__photo--p3" alt={products[2].name}/>
				</React.Fragment>
					:
				<div className='no-image'>
					<img
						alt="default 3"
						className="composition__photo composition__photo--p3"
						src={slideImages[2]}
					/>
				</div>
				}
		</div>
    </header>
    );
}

const mapStateToProps = (state) => ({
  products: state.product.products

})

export default withRouter(connect(mapStateToProps, null)(Header));
