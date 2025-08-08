// ===========================
// CORE CONFIGURATION
// ===========================

// Market & Localization
const MARKET = "HU"; // Country code (e.g., RO, HU, PL)
const COUNTRY_CURRENCY = "Ft"; // Currency of the country (e.g., HUF, RON, PLN - zł)

// API Configurations
const LOGGER_SERVICE_URL = `v1/${MARKET}/${MARKET}/cm/logger`;
const AVON_API_URL = "https://apim-eu.api-prod.aws.avon.com";
const getProductUrlApi = (fsc) => {
  if (typeof campNr === "undefined") {
    throw new Error("Missing campaign number (campNr)");
  }
  return `${AVON_API_URL}/v1/${MARKET}/${MARKET}/product/fscnr/${fsc}?cmpgnId=${campNr}`;
};
const currentBasketByOrderIdAndRepId = (repId, orderId) =>
  `${AVON_API_URL}/v1/${MARKET}/${MARKET}/rep/${repId}/order/${orderId}/cust/0/entered`;

// Ensure MARKET variable is defined
if (!MARKET) {
  throw new Error("Missing value in variable 'MARKET'");
}

const RECO_HIST = {
  /**
   *  Do not edit these variables
   */
  STORAGE_NAME: "reco_hist",
  SUB_STORAGE_NAME: "items",
  LOGGER_TYPE: "RECO_HIST",

  /**
   * Title displayed on the recommendation frame.
   */
  TITLE: "Ajánlott termékek",

  /**
   * Number of products displayed in the recommendation frame.
   * Adjust this value based on layout constraints.
   */
  NUMBER_OF_PRODUCTS_IN_FRAME: 6,

  /**
   * Root element selector for inserting recommendations.
   * If the window width is less than 1000px, it uses `.cust-sale`.
   * Otherwise, it defaults to `tab-entry-core`.
   */
  SELECTOR_RECO_ROOT:
    window.innerWidth < 1000 ? ".cust-sale" : "tab-entry-core",

  /**
   * API key for accessing the recommendation service.
   */
  API_KEY: "DwVVQF6QMIv16kwWAUc2lJcxxWVh4hqX",

  /**
   * API endpoint for fetching personalized recommendations.
   * Uses the `MARKET` variable to determine the correct region.
   */
  API_URL: `https://prod-reco.azure-api.net/${MARKET.toLowerCase()}/score`,

  /**
   * Category name used for analytics when adding a product to the cart.
   */
  ADD_TO_CART_ORD_CATEGORY_NAME: "RECO_HIST",
};

const RECO_CART = {
  /**
   *  Do not edit these variables
   */
  STORAGE_NAME: "reco_cart",
  SUB_STORAGE_NAME: "items",
  LOGGER_TYPE: "RECO_CART",

  /**
   * Title displayed on the recommendation frame.
   */
  TITLE: "Ajánlott termékek",

  /**
   * Number of products displayed in the recommendation frame.
   * Adjust this value based on layout constraints.
   */
  NUMBER_OF_PRODUCTS_IN_FRAME: 6,

  /**
   * Root element selector for inserting recommendations.
   * If the window width is less than 1000px, it uses `.cust-sale`.
   * Otherwise, it defaults to `tab-entry-core`.
   */
  SELECTOR_RECO_ROOT: ".yo-pg-bar",

  /**
   * Category name used for analytics when adding a product to the cart.
   */
  ADD_TO_CART_ORD_CATEGORY_NAME: "RECO_CART",

  /**
   * This key is likely used to fetch product data from an API.
   */
  API_KEY: "kp5lRAmYK8nnidqADAlwGIyzaDHgfYmr",

  /**
   * This URL is used to fetch product recommendations
   */
  API_URL: `https://prod-reco.azure-api.net/${MARKET.toLowerCase()}-cart/score`,
};

const FINAL_STEP = {
  /**
   * This selector identifies the submit button in the final step of checkout.
   */
  BUTTON_SELECTOR: "button.submtOrdr",

  /**
   * This URL is used to log a single purchase recommendation at step 1.
   */
  RECO_HIST_STEP_SUBMIT_URL:
    "https://prodrecoplan.azurewebsites.net/api/log-purchase",

  /**
   * This URL is used to log a single purchase recommendation at step 3.
   */
  RECO_CART_STEP_SUBMIT_URL:
    "https://prodrecoplancart.azurewebsites.net/api/log-purchase",

  /**
   * This URL is used to log multiple purchase recommendations at step 3.
   */
  RECO_CART_STEP_SUBMIT_ARRAY_URL:
    "https://prodrecoplancart.azurewebsites.net/api/log-purchase-array",

  /**
   * Handles local storage for step
   */
  LOCAL_STORAGE_HIST: new StorageHandler(
    RECO_HIST.STORAGE_NAME,
    RECO_HIST.SUB_STORAGE_NAME
  ),
  LOCAL_STORAGE_CART: new StorageHandler(
    RECO_CART.STORAGE_NAME,
    RECO_CART.SUB_STORAGE_NAME
  ),
};


