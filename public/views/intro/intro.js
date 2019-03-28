/**
 * MOBILE
 */

mobile_html = 
`

`

mobile_transition = ["out", "in"]

/**
 * DESKTOP
 */

desktop_html = 
`
<!----------- 
------------- SECTION 2 intro  
----------->
<div class="intro">
    <h1>Bienvenue sur Otium</h1>
    <p>Exsistit autem hoc loco quaedam quaestio subdifficilis, num quando amici novi,
        digni amicitia, veteribus sint anteponendi, ut equis vetulis teneros anteponere
        solemus. Indigna homine dubitatio! Non enim debent esse amicitiarum sicut
        rerum satietates, veterrima quaeque, ut ea vina, quae vetustatem ferunt, esse debet
        suavissima, verumque illud est.
    </p>
    <button>Commencer l'expérience</button>
</div>
<!----------- 
------------- FIN SECTION 2 intro  
----------->
`

desktop_script = () => {

}

desktop_transition = ["out", "in"]

/**
 * Export
 */

let intro_mobile = {
    html: mobile_html,
    listeners: [],
    socketOn: [],
    script: () => {},
    transitions: mobile_transition,
}

let intro_desktop = {
    html: desktop_html,
    listeners: [],
    socketOn: [],
    script: () => desktop_script,
    transitions: desktop_transition,
} 