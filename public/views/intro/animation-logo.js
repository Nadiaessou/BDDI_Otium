/**
 * MOBILE
 */

let mobile_html = 
`

`

let mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

let desktop_html = 
`
<!----------- 
------------- SECTION 1 animation logo  
----------->
<div class="logo_center">
    <img src="../public/both/assets/img/otium_logo.svg" alt="">
</div>
<!----------- 
------------- FIN SECTION 1 animation logo  
----------->
`

let desktop_script = () => {
    setTimeout(() => {
        intro.animationLogo.transitionTo("desktop", intro.intro)
        document.querySelector(".logo_top_left").classList.add("out")
        document.querySelector(".logo_top_left").classList.add("in")
    }, 2000)
}

let desktop_transition = ["out", "in"]

/**
 * Export
 */

let animation_logo_mobile = {
    html: mobile_html,
    listeners: [],
    socketOn: [],
    script: () => {},
    transitions: mobile_transition,
}

let animation_logo_desktop = {
    html: desktop_html,
    listeners: [],
    socketOn: [],
    script: desktop_script,
    transitions: desktop_transition,
} 