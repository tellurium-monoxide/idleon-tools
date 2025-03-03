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
            console.log(`Testing ${child.constructor.name}`)
            child.test()
        }

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
                a.href = `#tab_${child.constructor.name}`
                a.innerHTML = `${child.constructor.name}`
                li.appendChild(a)
                header.appendChild(li)

                let tab = document.createElement("div")
                tab.id = `tab_${child.constructor.name}`
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