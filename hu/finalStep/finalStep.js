/**
 * finalstep.js
 *
 * required script - config.js
 */

(async function () {
  if (!FINAL_STEP.BUTTON_SELECTOR) {
    console.error("BUTTON_SELECTOR is undefined.");
    return;
  }

  async function sendRecoData() {
    const orderId = getOrderNumber_n();
    if (!orderId) return console.error("initializeButton - orderId doesn't exist!");

    const currentBasket = await getCurrentBasket(orderId);
    if (!currentBasket.items?.length) return console.error("initializeButton - No items in current basket.");

    [
      { id: "RECO_HIST", storage: FINAL_STEP.LOCAL_STORAGE_HIST, apiUrl: FINAL_STEP.RECO_HIST_STEP_SUBMIT_URL },
      { id: "RECO_CART", storage: FINAL_STEP.LOCAL_STORAGE_CART, apiUrl: FINAL_STEP.RECO_CART_STEP_SUBMIT_URL }
    ].forEach(({ id, storage, apiUrl }) => processRecoData(storage, apiUrl, orderId, currentBasket.items, id));
  }

  function processRecoData(storageHandler, apiUrl, orderId, items, id) {
    try {
      if (!storageHandler.getOrderInStorage(orderId)) {
        console.log(`No data for order ${orderId} at ${id}`);
        return;
      }

      storageHandler.validateAndUpdateOrder(orderId, items);
      const itemsToSend = storageHandler.prepareOrderToSend(orderId);

      if (!itemsToSend.length) {
        console.log(`No items to send for order ${orderId} at ${id}`);
        return;
      }

      itemsToSend.forEach(item => sendPostRequest(apiUrl, item));
      storageHandler.deleteOrderFromStorage(orderId);
      console.log('Data send to', id)
    } catch (err) {
      console.error(`Error processing order ${orderId} at ${apiUrl}:`, err);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
      const submitButton = document.querySelector(FINAL_STEP.BUTTON_SELECTOR);
      if (submitButton) {
        if (submitButton.disabled) {
          submitButton.removeEventListener("click", sendRecoData);
        } else {
          submitButton.addEventListener("click", sendRecoData);
        }
      }
    });

    observer.observe(document, { childList: true, subtree: true });
  });
})()