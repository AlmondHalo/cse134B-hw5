const outputElem = document.getElementById("rating-output");

const css = '.star:hover { cursor: pointer; }';
let starListElem = [];

class RatingWidget extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: "open"});
        for (let i = 1; i < 6; i++) {
            let spanElem = document.createElement("span");
            spanElem.setAttribute("type", "button");
            spanElem.setAttribute("id", "star-"+i);
            spanElem.setAttribute("class", "star");
            spanElem.innerHTML = "&#9733;";
            spanElem.style = "cursor: pointer;"
            starListElem.push(spanElem);
            shadow.appendChild(spanElem);
        }
        clearColors();

        // Works
        function starListeners() {
            for (let i = 0; i < 5; i++) {
                starListElem[i].onmouseover = function() {changeColor(i+1)};
                starListElem[i].onmouseout = function() {clearColors()};
                starListElem[i].onclick = function() {spanClick(i+1)};
            }
        }

        // Works
        function spanClick(val) {
            if ((val/5) >= 0.8) {
                outputElem.innerHTML = "Thanks for " + val + " star rating!";
            } else {
                outputElem.innerHTML = "Thanks for your feedback of " + val + " stars. We'll try to do better!";
            }
            postContent("https://httpbin.org/post", val);
        }

        //Works
        function clearColors() {
            for (let i = 0; i < 5; i++) {
                starListElem[i].style.setProperty('color', 'var(--star-unselected-color)');
            }
        }

        //Works
        function changeColor(bound) {
            clearColors();
            for (let i = 0; i < bound; i++) {
                starListElem[i].style.setProperty('color', 'var(--star-selected-color)')
            }
        }

        // Works
        async function postContent(url = "", val) {
            let formBody = "question=How%20satisfied%20are%20you%3F&rating=" + val + "&sentBy=JavaScript";
            let response = await fetch(url, {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Sent-By": "JavaScript",
                },
                body: formBody,
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            });
        }
        starListeners();
    }
}

const weatherOutputElem = document.getElementById("weather-output");
const weatherImgOutputElem = document.getElementById("weather-img-output");
class WeatherWidget extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        weatherImgOutputElem.style.fontSize = "5rem";
        weatherOutputElem.style.fontFamily = "Courier";

        function getWeatherInfo(url) {
            fetch(url)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                fetch(data.properties.forecast)
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    let unicodeElem = unicodeSelector(data.properties.periods[0].shortForecast);
                    weatherImgOutputElem.innerHTML = unicodeElem;
                    weatherOutputElem.innerHTML = data.properties.periods[0].shortForecast + " " + 
                                                    data.properties.periods[0].temperature + "&#176;" + 
                                                    data.properties.periods[0].temperatureUnit + 
                                                    "<br/> With winds of " + 
                                                    data.properties.periods[0].windSpeed + " " + data.properties.periods[0].windDirection +
                                                    "<br/> Humidity: " + data.properties.periods[0].relativeHumidity.value + "&#37";
                });
            });
        }

        function unicodeSelector(stringDescriptor) {
            if (stringDescriptor == "Sunny" || 
                stringDescriptor == "Clear") {
                return "&#127774; ";
            }
            else if (stringDescriptor.includes("Mostly Sunny")) {
                return "&#127780; ";
            }
            else if (stringDescriptor.includes("Partly Cloudy")) {
                return "&#9925; ";
            }
            else if (stringDescriptor.includes("Fog")) {
                return "&#9729; ";
            }
            else {
                return "&#127783;";
            }
        }

        getWeatherInfo("https://api.weather.gov/points/32.8799,-117.2351");
    }
}

customElements.define('rating-widget', RatingWidget);
customElements.define('weather-widget', WeatherWidget);