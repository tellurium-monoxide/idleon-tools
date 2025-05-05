// used to describe all game features
// an example is a world, which will have subfeatures, such as stamps in world1, etc...
export class BaseFeature {
    account;

    child_features = [];

    constructor(account) {
        this.account = account;
    }


    twoStepInit() {
        for (let [ind, child] of this.child_features.entries()) {
            child.twoStepInit()
        }
    }

    // can be overridden in subclasses
    // just do your tests, then call super.test(collapsed) to test all child_features
    test(collapsed = 1) {

        // console.log(`Testing ${this.constructor.name}`)
        for (let [ind, child] of this.child_features.entries()) {
            // console.log()
            if (collapsed > 0) {
                console.groupCollapsed(`Testing ${child.getFeatureName()}`)
            } else {
                console.group(`Testing ${child.getFeatureName()}`)
            }
            child.test(collapsed - 1)
            console.groupEnd()
        }

    }

    getFeatureName() {
        return this.constructor.name
    }


    getTabDisplay() {

        if (this.child_features.length == 0) {
            return this.getDisplay()
        } else {
            let display = document.createElement("div")

            let tab = document.createElement("div")
            tab.classList.add("jquery-tab")

            display.appendChild(tab)

            // if this feature has a main display, show it in a tab
            let header = document.createElement("ul")
            tab.appendChild(header)
            let head_display = this.getDisplay()
            if (head_display) {
                let li = document.createElement("li")
                let a = document.createElement("a")
                a.href = `#tab_${this.getFeatureName()}_main`
                a.innerHTML = `${this.getFeatureName()}`
                li.appendChild(a)
                header.appendChild(li)

                let tab_content = document.createElement("div")
                tab_content.id = `tab_${this.getFeatureName()}_main`

                tab_content.appendChild(head_display)

                tab.appendChild(tab_content)
            }
            // show child features
            for (let [ind, child] of this.child_features.entries()) {
                let li = document.createElement("li")
                let a = document.createElement("a")
                let ref = `tab_${this.constructor.name}_${child.getFeatureName()}`
                a.href = `#${ref}`
                a.innerHTML = `${child.getFeatureName()}`
                li.appendChild(a)
                header.appendChild(li)

                let tab_content = document.createElement("div")
                tab_content.id = ref
                let content = child.getTabDisplay()
                if (content) {

                    tab_content.appendChild(content)
                }
                tab.appendChild(tab_content)
            }



            return display
        }
    }

    getDisplay() {

    }

}