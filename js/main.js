
function resize() {
    let aspect_ratio = window.innerHeight/window.innerWidth;
    let old_ratio = localStorage["aspect_ratio"];

    if (Math.abs(aspect_ratio - old_ratio) >= 0.0015) {
        rotation_handler(aspect_ratio, old_ratio);
        localStorage["aspect_ratio"] = aspect_ratio;
    }
}

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

function load_portrait_css() {

}

function load_landscape_css() {
    
}

localStorage["aspect_ratio"] = window.innerHeight/window.innerWidth;
window.addEventListener('resize', resize);
