export interface Payment {
}

interface PaymentMethod {
    pay(amount: number): void;
}

class CreditCardPayment implements PaymentMethod {
    constructor(private cardNumber: string, private cvv: string) {}

    pay(amount: number): void {
        // Payment logic using credit card
        console.log(`Paid $${amount} with credit card.`);
    }
}

class PaystackAPI {
    constructor(private token: string) {}
}


class PaystackPayment implements PaymentMethod {
    constructor(private paystackToken: string) {}

    pay(amount: number): void {
        const api = new PaystackAPI(this.paystackToken) as any;
        api.charge(amount);
    }
}