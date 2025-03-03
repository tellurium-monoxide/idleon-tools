// used to describe all game features
// an example is a world, which will have subfeatures, such as stamps in world1, etc...
export class BaseFeature {
    account;

    child_features = [];

    constructor(account) {
        this.account = account;
    }

    // can be overridden in subclasses
    // just do your tests, then call super.test() to test all child_features
    test() {

        // console.log(`Testing ${this.constructor.name}`)
        for (let [ind, child] of this.child_features.entries()) {
            console.log(`Testing ${child.getFeatureName()}`)
            child.test()
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
            display.classList.add("jquery-tab")

            let header = document.createElement("ul")
            display.appendChild(header)

            for (let [ind, child] of this.child_features.entries()) {
                let li = document.createElement("li")
                let a = document.createElement("a")
                a.href = `#tab_${child.getFeatureName()}`
                a.innerHTML = `${child.getFeatureName()}`
                li.appendChild(a)
                header.appendChild(li)

                let tab = document.createElement("div")
                tab.id = `tab_${child.getFeatureName()}`
                let content = child.getTabDisplay()
                if (content) {

                    tab.appendChild(content)
                }
                display.appendChild(tab)
            }

            return display
        }
    }

    getDisplay() {

    }

}