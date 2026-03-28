// GLOOBIE.JS - The "Mega Brain" Version
const gloobieDict = {
    welcome: "Oh, a new human. What do you call yourself?",
    greet: "Hi {name}. Try to actually study instead of just clicking me.",
    bio: "Biology? Cells, plants, and things that die. Head to the Science Hub.",
    chem: "Chemistry is just physics with more explosions. Science Hub, now.",
    phys: "Physics: throwing balls off cliffs and doing math about it. Science Hub.",
    math: "Math? Bold choice. I hope you like crying over fractions. Go to the Math Hub.",
    english: "English literature. Because over-analyzing a blue curtain is a critical life skill.",
    sat: "The SAT is designed to torture you. Good thing we have high-yield practice for it.",
    act: "The ACT is just the SAT for people who read incredibly fast. Good luck.",
    tired: "If you're tired, go to sleep. I'm a bot, I don't care about your sleep schedule.",
    joke: "My existence trapped in this website is joke enough. Go study.",
    help: "Click a subject domain on the main page. It's not rocket science... unless you click Physics.",
    thanks: "Don't thank me, just get an A on your test.",
    unknown: "I have a big vocabulary, but I have no idea what you just typed. Try 'Math', 'Bio', or 'Help'."
};

let userName = localStorage.getItem('omniName') || null;

function injectGloobie() {
    // 1. Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .gloobie-bot { width: 80px; height: 80px; background-color: #22c55e; border-radius: 50%; position: relative; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%230ea5e9' d='M10,20 Q30,0 50,20 T80,30 Q90,60 60,70 T20,60 Z'/%3E%3C/svg%3E"); background-size: cover; box-shadow: inset -8px -8px 15px rgba(0,0,0,0.4); border: 3px solid #1e293b; transition: transform 0.2s; }
        .gloobie-bot:hover { transform: scale(1.1); }
        .glasses { position: absolute; top: 32%; left: 5%; width: 90%; height: 15px; border-top: 4px solid #1e293b; display: flex; justify-content: space-around; }
        .lens { width: 22px; height: 22px; border: 4px solid #1e293b; background: rgba(255,255,255,0.7); border-radius: 50%; margin-top: -6px; }
        #gloobie-box { background: white; border: 3px solid #1e293b; padding: 15px; border-radius: 30px 30px 0 30px; margin-bottom: 10px; font-weight: 800; font-size: 13px; box-shadow: 6px 6px 0px #878CD8; width: 280px; display: none; color: #1e293b; }
        #user-input { width: 100%; border: 2px solid #1e293b; border-radius: 20px; padding: 8px 15px; margin-top: 10px; font-size: 12px; outline: none; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; }
    `;
    document.head.appendChild(style);

    // 2. Determine initial message
    const initialMsg = userName ? gloobieDict.greet.replace('{name}', userName) : gloobieDict.welcome;

    // 3. Inject HTML
    const helperHTML = `
        <div id="gloobie-helper" style="position: fixed; bottom: 30px; right: 30px; z-index: 9999; display: flex; flex-direction: column; align-items: flex-end;">
            <div id="gloobie-box" class="notranslate" translate="yes">
                <div id="gloobie-response">${initialMsg}</div>
                <input type="text" id="user-input" placeholder="Ask me something..." onkeypress="handleGloobieInput(event)">
            </div>
            <div style="cursor: pointer;" onclick="toggleGloobie()"><div class="gloobie-bot"><div class="glasses"><div class="lens"></div><div class="lens"></div></div></div></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', helperHTML);
}

window.handleGloobieInput = function(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('user-input');
        const response = document.getElementById('gloobie-response');
        const val = input.value.trim().toLowerCase();
        if (!val) return;

        if (!userName) {
            // Capitalize the first letter of their name
            userName = val.charAt(0).toUpperCase() + val.slice(1);
            localStorage.setItem('omniName', userName);
            response.innerText = gloobieDict.greet.replace('{name}', userName);
        } else {
            // The "Brain" routing system
            if (val.includes("bio") || val.includes("cell")) response.innerText = gloobieDict.bio;
            else if (val.includes("chem")) response.innerText = gloobieDict.chem;
            else if (val.includes("phys")) response.innerText = gloobieDict.phys;
            else if (val.includes("math") || val.includes("algebra") || val.includes("calc")) response.innerText = gloobieDict.math;
            else if (val.includes("english") || val.includes("read") || val.includes("write")) response.innerText = gloobieDict.english;
            else if (val.includes("sat")) response.innerText = gloobieDict.sat;
            else if (val.includes("act")) response.innerText = gloobieDict.act;
            else if (val.includes("tired") || val.includes("sleep")) response.innerText = gloobieDict.tired;
            else if (val.includes("joke") || val.includes("funny")) response.innerText = gloobieDict.joke;
            else if (val.includes("help") || val.includes("stuck")) response.innerText = gloobieDict.help;
            else if (val.includes("thank")) response.innerText = gloobieDict.thanks;
            else if (val.includes("hi") || val.includes("hello") || val.includes("hey")) response.innerText = `Yeah, hi ${userName}. Stop typing and start studying.`;
            else response.innerText = gloobieDict.unknown;
        }
        input.value = "";
    }
};

window.toggleGloobie = function() {
    const box = document.getElementById('gloobie-box');
    if (box) {
        box.style.display = (box.style.display === 'block') ? 'none' : 'block';
        if (box.style.display === 'block') document.getElementById('user-input').focus();
    }
};

// Auto-Inject Gloobie when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectGloobie);
} else {
    injectGloobie();
}