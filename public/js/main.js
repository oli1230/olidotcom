// windows event listener function for determining if orientation change
function resize() {
    let aspect_ratio = window.innerHeight/window.innerWidth;
    let old_ratio = localStorage["aspect_ratio"];

    if (Math.abs(aspect_ratio - old_ratio) >= 0.0015) {
        rotation_handler(aspect_ratio, old_ratio);
        localStorage["aspect_ratio"] = aspect_ratio;
    }
}

// implements the switching between orientations (portrait and landscape mode)
// for now, just rotates the background balls
function rotation_handler(aspect_ratio, old_ratio) {
    if (aspect_ratio >= 0.6 && old_ratio < 0.6) {
        $(".background_ball").each(function() {
            $(this).css({transition: "transform 0.57s", transform: "rotate(90deg)"});
        });
    }
    else if (aspect_ratio < 0.6 && old_ratio >= 0.6) {
        $(".background_ball").each(function() {
            $(this).css({transition: "transform 0.57s", transform: "rotate(180deg)"});
        });
    }
}

// toggles active class for the content pages on click
function page_change(page) {
    // process content pane animations and localstorage
    new_active_page = page.toLowerCase().replace(" ", "_");
    $("#" + new_active_page).toggleClass("active");
    $("#" + localStorage["active_page"]).toggleClass("active");
    localStorage["active_page"] = new_active_page;

    // initiate content loading
    load_page_content(new_active_page)
}

// load the html, js, and css for a content page
function load_page_content(page_name) {
    Promise.all([
        // loading css and js first
        load_css_for_page(page_name),
        load_js_for_page(page_name)
    ]).then(() => {
        // get html
        return $.ajax({ url: `/pages/${page_name}/${page_name}.html`, type: 'GET' });
    }).then(response => {
        // handle page-specific loading of data
        switch (page_name) {
            case "home":
                break;
            case "coding":
                break;
            case "timeline":
                break;
            case "brain_dump":
                load_brain_dump_page(response);
                break;
        }
    }).catch(error => {
        console.log('Error:', error);
    });
}

// load's a page's css
function load_css_for_page(page_name) {
    var href_data = `/pages/${page_name}/${page_name}.css`;
    return new Promise((resolve, reject) => {
        if (!$('link[href="' + href_data + '"]').length) {  // Checks if the link does not exist
            $('<link>', {
                href: href_data + `?_=${new Date().getTime()}`, // Cache busting when actually loading
                rel: 'stylesheet',
                type: 'text/css'
            }).on('load', () => {
                console.log(`CSS for ${page_name} loaded successfully.`);
                resolve();
            }).on('error', () => {
                console.error(`Failed to load CSS for ${page_name}.`);
                reject();
            }).appendTo('head');
        } else {
            console.log(`CSS for ${page_name} is already loaded.`);
            resolve(); // The link already exists, resolve immediately
        }
    });
}

// load's a page's js
function load_js_for_page(page_name) {
    // var src_data = `/pages/${page_name}/${page_name}.js?_=${new Date().getTime()}`; // Cache busting
    var src_data = `/pages/${page_name}/${page_name}.js`;
    return new Promise((resolve, reject) => {
        if (!$('script[src="' + src_data + '"]').length) {  // Checks if the script does not exist
            window.pageScriptLoad = resolve; // Set a global function for the script to call (because script.on.("load") was not working)
            $('<script>', {
                src: src_data,
                type: 'text/javascript',
                async: true
            }).on('error', () => {
                console.error(`Failed to load JS for ${page_name}.`);
                reject();
            }).appendTo('body');
        }
        else {
            console.log(`JS for ${page_name} is already loaded.`);
            resolve(); // The script already exists, resolve immediately
        }
    });
}

// html loading for brain dump page
function load_brain_dump_page(response) {
    $('#brain_dump_content').html(response).promise().done(function() {
        // This code will execute after the new HTML is added to '#brain_dump_content'
        
        // Sets the onclick function for all the brain dump entries
        localStorage.setItem("active_brain_dump_entry", null);
        $(".brain_dump_entry_container").on("click", brain_dump_entry_active);
    });
}

// css logic for when the brain dump navbar is toggled
function brain_dump_navbar_click() {
    var navbar_recently_active = $("#brain_dump_navbar").hasClass("active", true)
    $("#brain_dump_navbar, #brain_dump_navbar_arrow, #brain_dump_content").toggleClass("active");
    if (navbar_recently_active) {
        $(".brain_dump_entry_container, .brain_dump_entry").toggleClass("active", false);
        active_entry = localStorage.getItem("active_brain_dump_entry");
        if (active_entry != null) {
            active_entry_obj = $(".brain_dump_entry_container").eq(active_entry)
            active_entry_obj.toggleClass("active", true);
            active_entry_obj.find(".brain_dump_entry").toggleClass("active");
        }
    }
    else {
        // $(".brain_dump_entry_container").toggleClass("active", true);
        $(".brain_dump_entry").toggleClass("active", true);
    }
}
 
// function load_portrait_css() {}
// function load_landscape_css() {}

// function to run upon initial page load
function main() {
    // stores aspect ratio in cache for calculation on window size change
    localStorage["aspect_ratio"] = window.innerHeight/window.innerWidth;
    window.addEventListener('resize', resize);
    
    // home page terminal code
    // jQuery(function($) {
    //     $('#term').terminal(function(cmd, term) {
    //         args = cmd.split(" ")
    //         if (args[0] == 'help') {
    //             term.echo("available commands are: help");
    //         }
    //         // else if (args[0] == "prompt") {
    //         //     this.set_prompt($(location).attr('href') + "] > ")
    //         // }
    //         else {
    //             term.echo("unknown command " + cmd);
    //         }
    //     }, {
    //     greetings: "Use \"help\"" + " to see available commands",
    //     prompt: "[[b;lightgreen;transparent]" + $(location).attr('href') + "] > "
    //     // outputLimit: 0
    //     });
    // });

    // stores home as the active page on page load
    localStorage["active_page"] = "home";

    // sets the onclick function for all the navbar buttons
    $("#navbar > div").on('click', function() {
        // pass the text in the navbar button as which page to load
        page_change($(this).find("p").html());
    });
}

main();
