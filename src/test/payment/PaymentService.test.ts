import { PaymentDetails, PaymentMethod } from '../../app/payment/PaymentDetails';
import { PaymentService } from '../../app/payment/PaymentService';

describe('Payment Service', () => {
  const paymentAdapterMock = {
    processPayment: jest.fn(),
  };
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService(paymentAdapterMock);
  });

  test('should successfully process a valid payment', () => {
    // Arrange
    const paymentDetails: PaymentDetails ={ amount: 120,
      currency: 'CAD',
      method: PaymentMethod.CreditCard,
      cardNumber: '123456' };

      const mockProcessPaymentResponse= { status: 'success', transactionId: 'txn_1234567890' };

      //"Payment successful. Transaction ID: txn_1234567890";

      paymentAdapterMock.processPayment.mockImplementation((paymentDetails:PaymentDetails) => mockProcessPaymentResponse);

    //TODO: Create paymentDetails object initialized with fake data
    //TODO: Create mockProcessPaymentResponse object containing success status and a fake transactiondId
    //TODO: Mock processPayment implementation
    // Act
    const result = paymentService.makePayment(paymentDetails);
    // Assert
    expect(result).toEqual("Payment successful. Transaction ID: txn_1234567890");
    // Check the returned result is equal to the success message returned by makePayment with thefake  transactionId you have defined in mockProcessPaymentResponse
    expect(paymentAdapterMock.processPayment).toHaveBeenCalledWith(paymentDetails);
    // Check that processPayment inside makePayment has been called with paymentDetails
  });

  test('should throw an error for payment failure', () => {
    // Arrange
    const paymentDetails: PaymentDetails ={ amount: 120,
      currency: 'CAD',
      method: PaymentMethod.CreditCard,
      cardNumber: '123456' };

      const mockProcessPaymentResponse= { status: 'failure' };
      
      paymentAdapterMock.processPayment.mockImplementation((paymentDetails:PaymentDetails) => mockProcessPaymentResponse);


    //TODO: Create paymentDetails object initialized with fake data
    //TODO: Create mockProcessPaymentResponse object containing failure status
    //TODO: Mock processPayment implementation
    // Act & Assert
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Payment failed');
  });

  test('should throw an error for invalid payment amount', () => {
    // Arrange

    const paymentDetails: PaymentDetails ={ amount: -120,
      currency: 'CAD',
      method: PaymentMethod.CreditCard,
      cardNumber: '123456' };
    //TODO: Create paymentDetails object initialized with fake data where amount should be negative or undefined
    // Act & Assert
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Invalid payment amount');
  });
});
