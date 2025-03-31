let extensions = [
    {
        "logo": "./assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-speed-boost.svg",
        "name": "SpeedBoost",
        "description": "Optimizes browser resource usage to accelerate page loading.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-json-wizard.svg",
        "name": "JSONWizard",
        "description": "Formats, validates, and prettifies JSON responses in-browser.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-viewport-buddy.svg",
        "name": "ViewportBuddy",
        "description": "Simulates various screen resolutions directly within the browser.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-markup-notes.svg",
        "name": "Markup Notes",
        "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-grid-guides.svg",
        "name": "GridGuides",
        "description": "Overlay customizable grids and alignment guides on any webpage.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-palette-picker.svg",
        "name": "Palette Picker",
        "description": "Instantly extracts color palettes from any webpage.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-dom-snapshot.svg",
        "name": "DOM Snapshot",
        "description": "Capture and export DOM structures quickly.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-console-plus.svg",
        "name": "ConsolePlus",
        "description": "Enhanced developer console with advanced filtering and logging.",
        "isActive": true
    }
]
let activeFilter = "all"
let isDarkMode = false

function updateExtensionCards (extensions) {
    const $extensionList = document.querySelector('#extension-list')

    let cards = '';

    extensions.forEach((extension) => {
        cards += `
            <div class="extension card">
                <div class="extension__body">
                  <img src="${extension.logo}" alt="">
    
                  <div class="extension__detail">
                    <h4>${extension.name}</h4>
                    <p class="small-text muted-text">${extension.description}</p>
                  </div>
                </div>
    
                <div class="extension__actions">
                  <button onclick="removeExtension('${extension.name}')" type="button" class="extension__remove muted-text" tabindex="-1">Remove</button>
    
                  <div onclick="toggleSwitch(event, '${extension.name}')" class="switch ${extension.isActive ? "switch--active" : ""}">
                    <div class="switch__circle"></div>
                    <div class="switch__overlay"></div>
                  </div>
                </div>
              </div>
        `
    })

    $extensionList.innerHTML = cards
}

function toggleSwitch(event, name) {
    const element = event.currentTarget

    // Update extensions data
    extensions = extensions.map((extension) => {
        if (extension.name === name) {
            return {...extension, isActive: !extension.isActive}
        } else {
            return extension
        }
    })

    element.classList.toggle('switch--active')
}

function filterExtension(event, type) {
    // Update the UI
    const $filters = document.querySelectorAll('.section__filter')
    $filters.forEach(($filter) => $filter.classList.remove('badge--active'))
    document.querySelector(`[data-filter="${type}"]`).classList.add('badge--active')

    // Update active filter
    activeFilter = type;

    // Mutate the data
    let updatedExtensions = extensions

    if (type === "active") {
        updatedExtensions = updatedExtensions.filter((extension) => extension.isActive)
    } else if (type === "inactive") {
        updatedExtensions = updatedExtensions.filter((extension) => !extension.isActive)
    }

    updateExtensionCards(updatedExtensions)
}

function removeExtension(name) {
    extensions = extensions.filter((extension) => extension.name !== name)
    filterExtension(null, activeFilter)
}

function toggleTheme() {
    isDarkMode = !isDarkMode

    if(isDarkMode) {
        document.querySelectorAll('.dark-mode').forEach((element) => element.style.display = 'block')
        document.querySelectorAll('.light-mode').forEach((element) => element.style.display = 'none')

        document.documentElement.style.setProperty('--page-background', 'linear-gradient(180deg, #040918 0%, #091540 100%)')
        document.documentElement.style.setProperty('--card-background', '#171C28')
        document.documentElement.style.setProperty('--text-color', 'white')
        document.documentElement.style.setProperty('--gray-500', '#3E4455')
        document.documentElement.style.setProperty('--gray-600', '#414655')
        document.documentElement.style.setProperty('--gray-700', 'white')
    } else {
        document.querySelectorAll('.dark-mode').forEach((element) => element.style.display = 'none')
        document.querySelectorAll('.light-mode').forEach((element) => element.style.display = 'block')

        document.documentElement.style.setProperty('--page-background', 'linear-gradient(180deg, #EBF2FC 0%, #EEF8F9 100%)')
        document.documentElement.style.setProperty('--card-background', 'white')
        document.documentElement.style.setProperty('--text-color', 'hsl(232, 66%, 12%)')
        document.documentElement.style.setProperty('--gray-500', 'hsl(240, 3% ,89%)')
        document.documentElement.style.setProperty('--gray-600', 'hsl(240, 1% ,81%)')
        document.documentElement.style.setProperty('--gray-700', 'hsl(240, 1% ,73%)')
    }
}

document.addEventListener('DOMContentLoaded', ()=> updateExtensionCards(extensions))