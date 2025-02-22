// Constants
const TOAST_ICONS = {
    error: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm0 200q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Z"/></svg>`,
    success: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`
}

const TOAST_HTML = document.createElement("div")
TOAST_HTML.innerHTML = /*html*/ `
<div class="toast-box">
    <div class="toast-container">
        <span class="toast-icon"></span>
        <span class="toast-message"></span>
    </div>
    <button class="close-toast">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
    </button>
</div>`

document.body.insertAdjacentHTML("beforeend", TOAST_HTML.innerHTML)

let toastTimeout = null
let showTimeout = null

/**
 * Displays a toast notification with customizable message, status, duration, and action button.
 * @param {string} message - The message to display in the toast
 * @param {("error"|"success"|"warning"|Object)} [statusOrAction=""] - Either the toast status or an action object
 * @param {number|Object} [durationOrAction=3000] - Either the duration in milliseconds or an action object
 * @param {Object} [action=null] - An object containing action button configuration
 * @param {string} action.text - The text to display on the action button
 * @param {Function} action.onClick - The callback function to execute when action button is clicked
 * @returns {HTMLElement} The toast box element
 *
 * @example
 * // Basic usage
 * toast("Operation successful", "success");
 *
 * // With custom duration
 * toast("Error occurred", "error", 5000);
 *
 * // With action button
 * toast("Undo changes?", "", 3000, {
 *   text: "Undo",
 *   onClick: () => handleUndo()
 * });
 */
const toast = (message, statusOrAction = "", durationOrAction = 3000, action = null) => {
    let status = ""
    let duration = 3000

    // Handle flexible parameters
    if (typeof statusOrAction === "object") {
        action = statusOrAction
    } else {
        status = statusOrAction
        if (typeof durationOrAction === "object") {
            action = durationOrAction
        } else {
            duration = durationOrAction
        }
    }

    if (!document.querySelector(".toast-box")) {
        document.body.insertAdjacentHTML("beforeend", TOAST_HTML.innerHTML)
    }
    const toastBox = document.querySelector(".toast-box")

    const closeBtn = document.querySelector(".close-toast")
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            clearTimeout(toastTimeout)
            clearTimeout(showTimeout)
            toastBox.classList.remove("show")
        })
    }

    const toastIcon = toastBox.querySelector(".toast-icon")
    const toastMessage = toastBox.querySelector(".toast-message")

    toastBox.classList.remove("show", "success", "error", "warning")

    clearTimeout(toastTimeout)
    clearTimeout(showTimeout)

    if (status !== "") toastBox.classList.add(status)
    toastIcon.innerHTML = TOAST_ICONS[status] || TOAST_ICONS.success

    toastMessage.innerHTML = `${message}`.replace(/See: https:.*/, "").trim()

    const existingButton = toastBox.querySelector(".toast-action-button")
    if (existingButton) {
        existingButton.remove()
    }

    if (action && typeof action === "object") {
        const actionButton = document.createElement("button")
        actionButton.className = "toast-action-button"
        actionButton.textContent = action.text
        actionButton.addEventListener(
            "click",
            () => {
                action.onClick()
                toastBox.classList.remove("show")
            },
            { once: true }
        )
        toastBox.querySelector(".toast-container").appendChild(actionButton)
    }

    showTimeout = setTimeout(() => {
        toastBox.classList.add("show")
        toastTimeout = setTimeout(() => {
            toastBox.classList.remove("show")
        }, duration)
    }, 100)
    return toastBox
}
export default toast
