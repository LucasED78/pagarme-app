import TransactionService from "../../src/services/TransactionService"
import { EPaymentMethod, ETransactionStatus, TransactionResponse } from "../../src/types/transaction"

describe('Transactions', () => {
  const transactions: TransactionResponse[] = [
    {
      "object": "transaction",
      "status": ETransactionStatus.PAID,
      "refuse_reason": null,
      "status_reason": "acquirer",
      "acquirer_response_code": "0000",
      "acquirer_name": "pagarme",
      "acquirer_id": "5969170917bce0470c8bf099",
      "authorization_code": "65208",
      "soft_descriptor": null,
      "tid": 1830855,
      "nsu": 1830855,
      "date_created": "2017-08-14T20:35:46.046Z",
      "date_updated": "2017-08-14T20:35:46.455Z",
      "amount": 10000,
      "authorized_amount": 10000,
      "paid_amount": 10000,
      "refunded_amount": 0,
      "installments": 1,
      "id": 1830855,
      "cost": 50,
      "card_holder_name": "Morpheus Fishburne",
      "card_last_digits": "1111",
      "card_first_digits": "411111",
      "card_brand": "visa",
      "card_pin_mode": null,
      "postback_url": null,
      "payment_method": EPaymentMethod.CREDIT_CARD,
      "capture_method": "ecommerce",
      "antifraud_score": null,
      "boleto_url": null,
      "boleto_barcode": null,
      "boleto_expiration_date": null,
      "referer": "api_key",
      "ip": "10.2.11.17",
      "subscription_id": null,
      "phone": null,
      "address": null,
      "customer": {
          "object": "customer",
          "id": 233238,
          "external_id": "#3311",
          "type": "individual",
          "country": "br",
          "document_number": null,
          "document_type": "cpf",
          "name": "Morpheus Fishburne",
          "email": "mopheus@nabucodonozor.com",
          "phone_numbers": [
              "+5511999998888",
              "+5511888889999"
          ],
          "born_at": null,
          "birthday": "1965-01-01",
          "gender": null,
          "date_created": "2017-08-14T20:35:45.963Z",
          "documents": [
              {
                  "object": "document",
                  "id": "doc_cj6cmcm2l01z5696dyamemdnf",
                  "type": "cpf",
                  "number": "30621143049"
              }
          ]
      },
      "billing": {
          "address": {
              "object": "address",
              "street": "Rua Matrix",
              "complementary": null,
              "street_number": "9999",
              "neighborhood": "Rio Cotia",
              "city": "Cotia",
              "state": "sp",
              "zipcode": "06714360",
              "country": "br",
              "id": 145818
          },
          "object": "billing",
          "id": 30,
          "name": "Trinity Moss"
      },
      "shipping": {
          "address": {
              "object": "address",
              "street": "Rua Matrix",
              "complementary": null,
              "street_number": "9999",
              "neighborhood": "Rio Cotia",
              "city": "Cotia",
              "state": "sp",
              "zipcode": "06714360",
              "country": "br",
              "id": 145819
          },
          "object": "shipping",
          "id": 25,
          "name": "Neo Reeves",
          "fee": 1000,
          "delivery_date": "2000-12-21",
          "expedited": true
      },
      "items": [
          {
              "object": "item",
              "id": "r123",
              "title": "Red pill",
              "unit_price": 10000,
              "quantity": 1,
              "category": null,
              "tangible": true,
              "venue": null,
              "date": null
          },
          {
              "object": "item",
              "id": "b123",
              "title": "Blue pill",
              "unit_price": 10000,
              "quantity": 1,
              "category": null,
              "tangible": true,
              "venue": null,
              "date": null
          }
      ],
      "card": {
          "object": "card",
          "id": "card_cj6cmcm4301z6696dt3wypskk",
          "date_created": "2017-08-14T20:35:46.036Z",
          "date_updated": "2017-08-14T20:35:46.524Z",
          "brand": "visa",
          "holder_name": "Morpheus Fishburne",
          "first_digits": "411111",
          "last_digits": "1111",
          "country": "UNITED STATES",
          "fingerprint": "3ace8040fba3f5c3a0690ea7964ea87d97123437",
          "valid": true,
          "expiration_date": "0922"
      },
      "split_rules": null,
      "metadata": {},
      "antifraud_metadata": {},
      "reference_key": null
  }
]

  const transactionsService = new TransactionService();

  test('should filter transactions by paid status', () => {
    const filteredTransactions = transactionsService.filter({ status: ETransactionStatus.PAID }, transactions);

    expect(filteredTransactions.length).toBe(1);
  });

  test('should return 0 length if the filter dont found nothing', () => {
    const filteredTransactions = transactionsService.filter({ status: ETransactionStatus.PENDING_REFUND }, transactions);

    expect(filteredTransactions.length).toBe(0);
  });
});