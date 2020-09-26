import React from 'react'
import Card from './card.component';
import { ToastContainer, toast } from "react-toastify";

export default function CardList({products, isAdmin=null}) {
	const setToastMessage = (message) => {
		toast.success(message)
	}
    return (
      <React.Fragment>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
        />
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
