import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCannabis } from "@fortawesome/free-solid-svg-icons";

export default function Categories() {
    return (
      <section className="section-categories">
			<div className="u-center-text u-margin-bottom-big">
				<h2 className="heading-secondary">Categories</h2>
				<div className="heading-secondary-underline">
					<FontAwesomeIcon icon={faCannabis} color='green' size='2x' />
				</div>
			</div>
			<div className="row">
				<div className="categories-box">
						<h3 className="heading-tertiary categories-box__header u-margin-bottom-small">
							Edibles
						</h3>
					<p className="categories-box__text">
					Fresh leaves extracts vital antioxidants, minerals and{" "}
					
				</p>
					<a href={`/products/edibles`} className="categories-box__button">
						Open
					</a>
				</div>
				<div className="categories-box">
						<h3 className="heading-tertiary categories-box__header u-margin-bottom-small">
							Topicals
						</h3>
					<p className="categories-box__text">
					Fresh leaves extracts vital antioxidants, minerals and{" "}
				</p>
				<a href={`/products/topicals`} className="categories-box__button">
					Open
				</a>
				</div>
				<div className="categories-box">
						<h3 className="heading-tertiary categories-box__header u-margin-bottom-small">
							Buds
						</h3>
					<p className="categories-box__text">
					Fresh leaves extracts vital antioxidants, minerals and{" "}
				</p>
				<a href={`/products/buds`} className="categories-box__button">
					Open
				</a>
				</div>
				<div className="categories-box" >
					<h3 className="heading-tertiary categories-box__header u-margin-bottom-small">
						Extracts
					</h3>
					<p className="categories-box__text">
						Fresh leaves extracts vital antioxidants, minerals and{" "}
					</p>
					<a href={`/products/extracts`} className="categories-box__button">
						Open
					</a>
				</div>
        	</div>
      </section>
    );
}
