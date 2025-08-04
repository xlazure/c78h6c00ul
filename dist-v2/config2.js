// Constants
const MARKET = "PL";
const COUNTRY_CURRENCY = "zł";
const AVON_API_URL = "https://apim-eu.api-prod.aws.avon.com";

const TRANSLATIONS = {
  bestsellersCarousel: {
    title: "Najczęściej kupowane",
    addToCart: "DODAJ",
    chooseVariant: "Wybierz wariant",
    shade: "Odcień",
    set: "Zestaw",
    selectQuantityModal: "wybierz ilość",
    chooseColorModal: "wybierz kolor",
    showDetailsModal: "pokaż szczegóły",
    orderForAFriendModal: "Zamów dla znajomego",
    AddToCartModal: "Dodaj do koszyka",
    showMore: "Pokaż więcej",
  },
};

// Dev variable
// const campNr = "202506"; // Example campaign number

const getProductUrlApi = (fsc) =>
  `${AVON_API_URL}/v1/${MARKET}/${MARKET}/product/fscnr/${fsc}?cmpgnId=${campNr}`;

// Base configuration
const BASE_CONFIG = {
  // TEST_MODE: true,
  // allowedAccounts: ["16806573", "16386183", "81521333"],
  // userId: getAccNr(),
  MARKET,
  COUNTRY_CURRENCY,
  LOGGER_SERVICE_URL: `v1/${MARKET}/${MARKET}/cm/logger`,
  AVON_API_URL,
  getProductUrlApi: (fsc) =>
    `${AVON_API_URL}/v1/${MARKET}/${MARKET}/product/fscnr/${fsc}?cmpgnId=${campNr}`,
};

// Feature configuration
const FEATURE_CONFIG = {
  bestsellersCarousel: {
    targetSelector: ".lat-prd.v2",
    mountMode: "append",
    apiUrl: "https://prod-reco.azure-api.net/pl-best/score",
    apiToken: "",
    enableLogging: true,
    responseBody: {
      RECO_TYPE: "bestsellers",
    },
    method: "POST",
    maxProducts: 12,
  },
};

window.RECO_BASE_CONFIG = BASE_CONFIG;
window.RECO_FEATURE_CONFIG = FEATURE_CONFIG;
