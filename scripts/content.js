document.addEventListener('DOMContentLoaded', () => {
    // console.log("Page fully loaded");
    const currentURL = window.location.href;
    // console.log("Current URL:", currentURL);

    const loginSpan = document.querySelector("span[data-login]");
    const loginValue = loginSpan ? loginSpan.dataset.login.trim() : null;
    if (loginValue) {
        console.log("Login:", loginValue);
    } else {
        console.log("Can't find Login");
    }

    if (currentURL.startsWith("https://projects.intra.42.fr/projects/")) {
        handleProjectPage(currentURL);
    } else if (currentURL.startsWith("https://projects.intra.42.fr") && (currentURL.endsWith("mine") || currentURL.endsWith(loginValue))) {
        handleMyProjectsPage(currentURL, loginValue);
    }
});

/**
 * Handles project page by adding custom buttons for resources and learning objectives
 * @param {string} currentURL - The current page URL
 */
function handleProjectPage(currentURL) {
    const projectName = currentURL.split("/").pop();
    // console.log("Project Title:", projectName);
    const headers = document.querySelectorAll("h4");
    // console.log("Found headers:", headers);
    headers.forEach(header => {
        if (header.textContent.trim() === "Description") {
            const projectDescItem = header.closest('.project-desc-item');
            if (projectDescItem) {
                addButton(projectDescItem, "Resources", `https://raw.githubusercontent.com/Matsadura/42Project_Compass/refs/heads/main/resources/${projectName}.json`, fetchResourcesAndShowPanel);
                addButton(projectDescItem, "Learning Objectives", `https://raw.githubusercontent.com/Matsadura/42Project_Compass/refs/heads/main/learning_objectives/${projectName}.json`, fetchDataAndShowPanel);
                addButton(projectDescItem, "How to learn", "#", () => alert("Coming soon!"));
            }
        }
    });
}

/**
 * Handles user's projects page by adding custom buttons for resources and learning objectives
 * @param {string} currentURL - The current page URL
 * @param {string} loginValue - The user's login value
 */
function handleMyProjectsPage(currentURL, loginValue) {
    // console.log(`My projects page ${loginValue}`);
    const projectName = currentURL.split("/")[3];
    // console.log("Project Name:", projectName);
    const projectSummary = document.querySelector(".project-summary-item").nextElementSibling;
    if (projectSummary) {
        addButton(projectSummary, "Resources", `https://raw.githubusercontent.com/Matsadura/42Project_Compass/refs/heads/main/resources/${projectName}.json`, fetchResourcesAndShowPanel);
        addButton(projectSummary, "Learning Objectives", `https://raw.githubusercontent.com/Matsadura/42Project_Compass/refs/heads/main/learning_objectives/${projectName}.json`, fetchDataAndShowPanel);
        addButton(projectSummary, "How to learn", "#", () => alert("Coming soon!"));
    }
}

/**
 * Adds a custom button to a parent element
 * @param {HTMLElement} parent - The parent element to append the button to
 * @param {string} text - The text to display on the button
 * @param {string} url - The URL to fetch data from
 * @param {Function} onClick - The function to call when the button is clicked
 */
function addButton(parent, text, url, onClick) {
    const button = document.createElement("button");
    button.innerText = text;
    button.classList.add("btn", "btn-primary");
    button.title = `Click to see the ${text.toLowerCase()} of this project`;
    button.onclick = () => onClick(url);
    parent.appendChild(button);
    // console.log(`${text} button inserted`);
}

/**
 * Fetches data from a given URL and shows it in a panel
 * @param {string} url - The URL to fetch data from
 */
function fetchDataAndShowPanel(url) {
    if (url.startsWith('https://raw.githubusercontent.com/')) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => showPanel(data))
            .catch(error => {
                alert("Oops! No one provided learning objectives to this project yet! Why not be the first? :) Learn how by visiting the project's repository.");
            });
    } else {
        const localUrl = chrome.runtime.getURL(url);
        fetch(localUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => showPanel(data))
            .catch(error =>{
                alert("Oops! No one provided learning objectives to this project yet! Why not be the first? :) Learn how by visiting the project's repository.");
            });
    }
}

/**
 * Fetches resources from a given URL and shows them in a panel
 * @param {string} url - The URL to fetch resources from
 */
function fetchResourcesAndShowPanel(url) {
    if (url.startsWith('https://raw.githubusercontent.com/')) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => showResourcesPanel(data))
            .catch(error => {
                alert("Oops! No one provided resources to this project yet! Why not be the first? :) Learn how by visiting the project's repository.");
            });
    } else {
        const localUrl = chrome.runtime.getURL(url);
        fetch(localUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => showResourcesPanel(data))
            .catch(error => {
                alert("Oops! No one provided resources to this project yet! Why not be the first? :) Learn how by visiting the project's repository.");
            });
    }
}

/**
 * Shows a panel with formatted JSON data
 * @param {Object} data - The JSON data to display
 */
function showPanel(data) {
    loadHTML('../html/panel.html', (tempDiv) => {
        const dimmedBackground = tempDiv.querySelector('#dimmed-background');
        const panel = tempDiv.querySelector('#panel');
        const contentElement = panel.querySelector('#content');
        contentElement.innerHTML = formatJSON(data);

        dimmedBackground.onclick = () => {
            document.body.removeChild(dimmedBackground);
            document.body.removeChild(panel);
        };

        document.body.appendChild(dimmedBackground);
        document.body.appendChild(panel);
    });
}

/**
 * Shows a panel with formatted resources
 * @param {Object} data - The resources data to display
 */
function showResourcesPanel(data) {
    loadHTML('../html/panel.html', (tempDiv) => {
        const dimmedBackground = tempDiv.querySelector('#dimmed-background');
        const panel = tempDiv.querySelector('#panel');
        const contentElement = panel.querySelector('#content');
        contentElement.innerHTML = formatResourcesJSON(data);

        dimmedBackground.onclick = () => {
            document.body.removeChild(dimmedBackground);
            document.body.removeChild(panel);
        };

        document.body.appendChild(dimmedBackground);
        document.body.appendChild(panel);
    });
}

/**
 * Formats JSON data into an HTML list
 * @param {Object} data - The JSON data to format
 * @returns {string} HTML representation of the JSON data
 */
function formatJSON(data) {
    return createList(data);
}

/**
 * Formats resources JSON into a styled HTML list of links
 * @param {Object} data - The resources data to format
 * @returns {string} Styled HTML list of resource links
 */
function formatResourcesJSON(data) {
    let html = '<div class="resources-list">';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            html += `
                <div class="resource-item">
                    <a href="${data[key]}" target="_blank" rel="noopener noreferrer">
                        <span class="resource-title">${key}</span>
                    </a>
                </div>
            `;
        }
    }
    html += '</div>';
    return html;
}

/**
 * Recursively creates a styled HTML list from a nested object
 * @param {Object} obj - The object to convert to an HTML list
 * @returns {string} Styled HTML representation of the object
 */
function createList(obj) {
    let html = '<div class="nested-list">';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            html += `<div class="list-item">`;
            html += `<span class="list-key">${parseInt(key, 10) + 1}:</span>`;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                html += createList(obj[key]);
            } else {
                html += `<span class="list-value">${obj[key]}</span>`;
            }
            html += '</div>';
        }
    }
    html += '</div>';
    return html;
}

/**
 * Loads an HTML file and calls a callback function with the loaded HTML
 * @param {string} filename - The name of the HTML file to load
 * @param {Function} callback - The function to call with the loaded HTML
 */
function loadHTML(filename, callback) {
    const htmlURL = chrome.runtime.getURL(`scripts/${filename}`);
    
    fetch(htmlURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;
            callback(tempDiv);
        })
        .catch(error => console.error('Error loading HTML:', error, 'from URL:', htmlURL));
}