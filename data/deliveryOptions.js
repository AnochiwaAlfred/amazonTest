

import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js' // Default Export
import { formatCurrency } from "../scripts/utils/money.js";


const deliveryOptions = [
    {
        id:"1",
        deliveryDate:7,
        priceCents:0
    },
    {
        id:"2",
        deliveryDate:3,
        priceCents:499
    },
    {
        id:"3",
        deliveryDate:1,
        priceCents:999
    }
]

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach(option => {
        if(option.id === deliveryOptionId){
            deliveryOption = option;
        }
    });
    return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption){
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDate, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents===0?"FREE":`$${formatCurrency(deliveryOption.priceCents)} -`
    return {dateString, priceString}
}

export default deliveryOptions;