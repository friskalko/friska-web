import React from "react";

async function Products() {
    const prod = await fetch("http://localhost:3000/api/products");
    const data = await prod.json();
    console.log(data);

    data.map((item) => {
        console.log(item);
    });

    return (
        <>
            {data.Products.map((item) => {
                return (
                    <div key={item.id}>
                        <h1>{item.name}</h1>
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                        <img src={item.image} alt={item.name} />
                    </div>
                );
            })}
        </>
    );
}

export default Products;
