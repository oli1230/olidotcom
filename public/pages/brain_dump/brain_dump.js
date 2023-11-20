// 
function brain_dump_entry_active() {
    var recently_active = $(this).hasClass("active", true)
    var navbar_open = $("#brain_dump_navbar").hasClass("active", true)
    // only activate the entries if navbar is closed
    if (!navbar_open) {
        // toggle off all entries and containers first
        $(".brain_dump_entry_container, .brain_dump_entry").toggleClass("active", false);
        localStorage.setItem("active_brain_dump_entry", null);
        // COMMENT: tacky 'turning thing back on' to mimic having stayed on
        if (!recently_active) {
            // if selected entry was off, then turn it on and store it
            localStorage.setItem("active_brain_dump_entry", $(this).index());
            $(this).toggleClass("active", true);
            $(this).find(".brain_dump_entry").toggleClass("active", true);

            scroll_to_entry(this);
        }
    }
}

// Scroll to the target brain dump entry
function scroll_to_entry(item) {
    var container = $('#brain_dump_content'); // Adjust this selector to your scrollable container
    var targetElement = $(item);

    // Calculate position to scroll to
    var targetPosition = targetElement.offset().top - container.offset().top + container.scrollTop();
    var centerPosition = targetPosition - (container.height() / 2) + (targetElement.height() / 2);

    // Scroll the container to centralize the target element
    container.animate({ scrollTop: centerPosition }, 300);
}





// BUG: for some reason, script.on.("load") was not triggering for the script in the front end, so this is here at the end to manually resolve the promise.
// Below is the frontend function as it SHOULD be
if (typeof window.pageScriptLoad === 'function') {
    window.pageScriptLoad();
    window.pageScriptLoad = null; // Clean up
}
// function load_js_for_page(page_name) {
//     return new Promise((resolve, reject) => {
//         $('<script>', {
//             src: `/pages/${page_name}/${page_name}.js?_=${new Date().getTime()}`, // Cache busting
//             type: 'text/javascript'
//         }).on('load', () => {
//             console.log(`JS for ${page_name} loaded successfully.`);
//             resolve();
//         }).on('error', () => {
//             console.error(`Failed to load JS for ${page_name}.`);
//             reject();
//         }).appendTo('body');
//     });
// }