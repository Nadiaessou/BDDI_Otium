class Page{
    constructor(desktop, mobile, id) {
        this.mobile = {
            element: document.createElement("section"),

            listeners: mobile.listeners,
            socketOn: mobile.socketOn,

            transitionOut: mobile.transitions[0],
            transitionIn: mobile.transitions[1],

            script: mobile.script
            
        }

        this.desktop = {
            element: document.createElement("section"),

            listeners: desktop.listeners,
            socketOn: desktop.socketOn,

            transitionOut: desktop.transitions[0],
            transitionIn: desktop.transitions[1],

            script: desktop.script
        }

        this.desktop.element.id = id
        this.mobile.element.id = id
        
        this.desktop.element.classList.add(this.desktop.transitionOut)
        this.mobile.element.classList.add(this.mobile.transitionOut)

        this.mobile.element.innerHTML = mobile.html
        this.desktop.element.innerHTML = desktop.html

        
    }

    addListeners(device){
        this[device].listeners.forEach(listeners => {
            document.querySelectorAll(listeners[0]).forEach(el => {
                el.addEventListener(listeners[1] , listeners[2])
            })
        })
        this[device].script.call()
    }

    removeListener(device){
        this[device].listeners.forEach(listeners => {
            document.querySelectorAll(listeners[0]).forEach(el => {
                el.removeEventListener(listeners[1] , listeners[2])
            })
        })
    }

    displayPage(device){
        document.body.appendChild(this[device].element)
        setTimeout(()=>{
            this[device].element.classList.remove(this[device].transitionOut)
            this[device].element.classList.add(this[device].transitionIn)
            this.addListeners(device)
        }, 300)
    }
    
    transitionTo(device, to){
        // Start page from out animation
        this[device].element.classList.remove(this[device].transitionIn)
        this[device].element.classList.add(this[device].transitionOut)
        this.removeListener(device)
        document.body.appendChild(to[device].element)
        setTimeout(() => {
            // Start page to in animation
            document.body.removeChild(this[device].element)
            to[device].element.classList.remove(to[device].transitionOut)
            to[device].element.classList.add(to[device].transitionIn)
            to.addListeners(device)
        },800)   
    }
}