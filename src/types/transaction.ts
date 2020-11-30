import { NullOr } from "./object";

export interface Address {
	object: "address";
	id?: NullOr<number>
	country: string;
	state: string;
	city: string;
	neighborhood: string;
	street: string;
	street_number: number | string;
	zipcode: string;
	complementary?: NullOr<string>;
}

export interface Customer {
	id?: NullOr<number>
	object: "customer";
	external_id: string | number;
	name: string;
	type: string;
	country: string;
	email: string;
	documents: CustomerDocument[];
	phone_numbers: string[]
	birthday: string;
	document_number?: NullOr<number>
	document_type?: NullOr<string>
	born_at?: NullOr<string>
	gender?: NullOr<string>
	date_created?: NullOr<string>
}

export interface CustomerDocument {
	object: "document";
	id?: NullOr<string>
	type: "cpf";
	number: string | number
}

export interface TransactionItem {
	object: "item";
	id: string | number;
	title: string;
	unit_price: string | number;
	quantity: number;
	tangible?: NullOr<boolean>
	category?: NullOr<string>
	venue?: NullOr<string>
	date?: NullOr<string>
}

export interface Shipping {
	object: "shipping";
	id?: NullOr<number>
	name: string;
	fee: number;
	delivery_date?: NullOr<string>;
	expedited?: NullOr<boolean>;
	address: Address;
}

export interface Billing {
	object: "billing";
	id?: NullOr<number>
	name: string;
	address: Address
}

export interface Transaction {
	amount: string | number;
	card_number?: NullOr<string>;
	card_cvv?: NullOr<string>;
	card_expiration_date?: NullOr<string>;
	card_holder_name?: NullOr<string>;
	customer: Customer;
	billing: Billing;
	shipping?: NullOr<Shipping>;
	items: TransactionItem[];
	payment_method: EPaymentMethod
}

export enum EPaymentMethod {
	CREDIT_CARD = 'credit_card',
	BOLETO = 'boleto'
}

export enum ETransactionStatus {
	AUTHORIZED = 'authorized',
	PAID = 'paid',
	WAITING_PAYMENT = 'waiting_payment',
	PROCESSING = 'processing',
	REFUSED = 'refused',
	PENDING_REFUND = 'pending_refund',
	REFUNDED = 'refunded'
}

export interface Card {
	object: "card";
	id: string;
	date_created: string;
	date_updated: string;
	brand: string;
	holder_name: string;
	first_digits: string;
	last_digits: string;
	country: string;
	fingerprint: string;
	valid: boolean;
	expiration_date: string;
}

export interface TransactionResponse {
	object: string;
	status: ETransactionStatus
	refuse_reason?: NullOr<string>;
	status_reason: string;
	acquirer_response_code: string;
	acquirer_name: string;
	acquirer_id: string;
	authorization_code: string;
	soft_descriptor?: NullOr<string>;
	tid: number;
	nsu: number;
	date_created: string;
	date_updated: string;
	amount: number | string;
	authorized_amount?: NullOr<number | string>;
	paid_amount: number | string;
	refunded_amount: number | string;
	installments: number | string;
	id: number | string;
	cost: number | string;
	card_holder_name?: NullOr<string>;
  card_last_digits?: NullOr<string | number>;
  card_first_digits?: NullOr<string | number>;
  card_brand?: NullOr<string>,
	card_pin_mode?: NullOr<string>,
	card_magsripe_fallback?: NullOr<boolean>;
	cvm_pin?: NullOr<boolean>;
	postback_url?: NullOr<string>;
	payment_method: EPaymentMethod;
	capture_method: string;
	antifraud_score?: NullOr<string>;
	boleto_url?: NullOr<string>;
	boleto_barcode?: NullOr<string>;
	boleto_expiration_date?: NullOr<string>;
	referer: string;
	ip: string;
	subscription_id?: NullOr<string>;
	phone?: NullOr<string>;
	address?: NullOr<Address>;
	customer: Customer;
	billing: Billing;
	shipping: Shipping;
	items: TransactionItem[]
	card?: NullOr<Card>;
	split_rules?: NullOr<string>;
	metadata: any;
	antifraud_metadata: any;
	reference_key?: NullOr<string>;
	device?: NullOr<string>;
	local_transaction_id?: NullOr<string>;
	local_time?: NullOr<string>;
	fraud_covered?: NullOr<boolean>;
	fraud_reimbursed?: NullOr<string>;
	order_id?: NullOr<string>;
	risk_level?: NullOr<string>;
	receipt_url?: NullOr<string>;
	payment?: NullOr<string>;
	addition?: NullOr<string>;
	discount?: NullOr<string>;
	private_label?: NullOr<string>;
	pix_qr_code?: NullOr<string>;
	pix_expiration_date?: NullOr<string>;
}

export interface ITransactionsFilter {
	status?: NullOr<ETransactionStatus>;
	paymentMethod?: NullOr<EPaymentMethod>;
}

export interface RefundRequest {
	bank_account_id?: NullOr<string>;
  bank_code: string;
  agency: string;
  agencia?: NullOr<string>;
  conta: string;
  document_number: string;
  legal_name: string;
  async?: NullOr<boolean>;
  type: string;
  metadata?: NullOr<any>;
}