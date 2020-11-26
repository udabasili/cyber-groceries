import React from 'react'
import Card from './card.component';
import { toast } from "react-toastify";
/**
 *
 * 
 * @export CardList
 * @param {Array, String} {products, isAdmin=null}
 */
export default function CardList({products, isAdmin=null}) {
  
  const setToastMessage = (message, type) => {
	  if(type === 'success'){
		toast.success(message)
	  }else{
		toast.error(message)
	  }
	}
    return (
      <React.Fragment>
        <div className="card-list">
          {products &&
            products.map((data, index) => (
              <Card
                key={index}
                setToastMessage={setToastMessage}
                item={data}
                isAdmin={isAdmin}
              />
            ))}
        </div>
      </React.Fragment>
    );
}
