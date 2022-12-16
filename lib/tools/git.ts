import { JobStep } from "../workflow";

export interface CheckoutParams {
  token?: string;
  "fetch-depth"?: number;
}

export class Git {
  static checkout(params?: CheckoutParams): JobStep {
    const step: JobStep = {
      name: "Checkout",
      uses: "actions/checkout@v2",
      with: {},
    };
    if (params?.token) {
      step.with.token = params.token;
    }
    if (params && params["fetch-depth"]) {
      step.with["fetch-depth"] = params["fetch-depth"];
    }
    return step;
  }
}
