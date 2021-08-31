import config from "./Config"

// get sales order details
export const getAddressValues = (order, setval) =>{
    fetch(config.url+"fedex/salesorderdetails/"+ order)
    .then(response => response.json())
    .then(resp=>{
        console.log(resp); 
        setval(resp); 
    })
    .catch(err=>console.log(err));
}