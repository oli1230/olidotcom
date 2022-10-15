
// windows event listener function for determining if orientation change
function resize() {
    let aspect_ratio = window.innerHeight/window.innerWidth;
    let old_ratio = localStorage["aspect_ratio"];

    if (Math.abs(aspect_ratio - old_ratio) >= 0.0015) {
        rotation_handler(aspect_ratio, old_ratio);
        localStorage["aspect_ratio"] = aspect_ratio;
    }
}

// windows event listener function for watching scroll behaviors
function scroll() {
    $("span").blur(function() {
        $(this).css("opacity", "0")
    })
}

// implements the switching between orientations (portrait and landscape mode)
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

// function load_portrait_css() {

// }

// function load_landscape_css() {
    
// }

localStorage["aspect_ratio"] = window.innerHeight/window.innerWidth;
window.addEventListener('resize', resize);
window.addEventListener('scroll', scroll);

// Home page terminal code
jQuery(function($) {
    $('#term').terminal(function(cmd, term) {
        args = cmd.split(" ")
        if (args[0] == 'help') {
            term.echo("available commands are: help");
        }
        else if (args[0] == "prompt") {
            this.set_prompt($(location).attr('href') + "] > ")
        }
        else {
            term.echo("unknow command " + cmd);
        }
    }, {
    greetings: "Use \"help\"" + " to see available commands",
    prompt: "[[b;lightgreen;transparent]" + $(location).attr('href') + "] > "
    // outputLimit: 0
    });
});
