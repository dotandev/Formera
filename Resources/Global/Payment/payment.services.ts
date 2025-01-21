import config from "../../../Config/config";
import { BadRequestError } from "../../Event/Utils/error";
import { convertObjectFromSnakeToCamelCase } from "../../Event/Utils/tee";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Base class for API requests using axios
class BaseApi {
  baseUrl: string;
  axiosInstance: any;

  constructor(url: string) {
    this.baseUrl = url;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  fetch = async (
    url: string,
    body?: Record<string, any>,
    args?: Record<string, string>,
    requestInit?: AxiosRequestConfig
  ): Promise<any> => {
    try {
      const requestConfig: AxiosRequestConfig = {
        ...requestInit,
        params: args,
        data: body,
      };

      const response: AxiosResponse = await this.axiosInstance(url, requestConfig);

      if (response.status === 404) {
        return;
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new BadRequestError(error.response.data.message || error.message);
      } else {
        throw new BadRequestError(error.message);
      }
    }
  };

  get = <T>(
    url: string,
    args?: Record<string, any>,
    requestInit?: AxiosRequestConfig
  ): Promise<any> => this.fetch(url, undefined, args, { ...requestInit, method: 'GET' });

  post = <T>(
    url: string,
    body?: Record<string, any>,
    args?: Record<string, any>,
    requestInit?: AxiosRequestConfig
  ): Promise<any> => this.fetch(url, body, args, { ...requestInit, method: 'POST' });
}

// Interfaces for the payment system
interface Metadata {
  email: string;
  name: string;
  amount: number;
}

export interface InitializePaymentArgs {
  email: string;
  amount: number;
  callback_url?: string;
  metadata: Metadata;
}

interface PaystackAPIResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

interface InitializePaymentResponse {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
}

interface VerifyPaymentResponse {
  amount: number;
  reference: string;
  status: string;
  metadata: Metadata;
}

// Paystack API class extending the BaseApi using axios
class PaystackApi extends BaseApi {
  requestInit: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${config.app.bases.PaymentSecretKey}`,
    },
  };

  constructor() {
    super(config.app.bases.PaymentBaseUrl as string);
  }

  initializePayment = async (paymentDetails: InitializePaymentArgs) => {
    const response = await this.post<
      PaystackAPIResponse<InitializePaymentResponse>
    >('/transaction/initialize', paymentDetails, undefined, this.requestInit);

    return convertObjectFromSnakeToCamelCase<InitializePaymentResponse>(
      response.data
    );
  };

  verifyPayment = (paymentReference: string) =>
    this.get<PaystackAPIResponse<VerifyPaymentResponse>>(
      `/transaction/verify/${paymentReference}`,
      undefined,
      this.requestInit
    );
}

const paystackApi = new PaystackApi();

export default paystackApi;
