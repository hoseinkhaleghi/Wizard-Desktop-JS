let nextId = 1;
const windowsContainer = document.getElementById("windows-container");
const taskbarButtons = document.getElementById("taskbar-buttons");

function openWindow(title) {
  const windowId = nextId++;
  
  // Create window element
  const windowEl = document.createElement("div");
  windowEl.className = "window";
  windowEl.setAttribute("data-id", windowId);
  windowEl.style.top = "-200px";
  windowEl.style.left = "50px";
  windowEl.innerHTML = `
    <div class="window-header">
      <span>${title}</span>
      <div>
        <button onclick="minimizeWindow(${windowId})">-</button>
        <button onclick="closeWindow(${windowId})">X</button>
      </div>
    </div>
    <div class="window-content">محتویات تب</div>
    <div class="window-content">${title}</div>
  `;
  
  windowsContainer.appendChild(windowEl);

  makeDraggable(windowEl);
  
  // Add taskbar button
  const taskbarButton = document.createElement("button");
  taskbarButton.innerText = title;
  taskbarButton.onclick = () => toggleWindow(windowId);
  taskbarButton.setAttribute("data-id", windowId);
  taskbarButtons.appendChild(taskbarButton);
}

function closeWindow(id) {
  document.querySelector(`.window[data-id="${id}"]`).remove();
  document.querySelector(`button[data-id="${id}"]`).remove();
}

function minimizeWindow(id) {
  const windowEl = document.querySelector(`.window[data-id="${id}"]`);
  if (windowEl.style.display === "none") {
    windowEl.style.display = "block";
  } else {
    windowEl.style.display = "none";
  }
}

function toggleWindow(id) {
  const windowEl = document.querySelector(`.window[data-id="${id}"]`);
  windowEl.style.display = windowEl.style.display === "none" ? "block" : "none";
}

function makeDraggable(element) {
  let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

  const header = element.querySelector(".window-header");
  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.onmousemove = drag;
    document.onmouseup = stopDrag;
  }

  function drag(e) {
    e.preventDefault();
    posX = mouseX - e.clientX;
    posY = mouseY - e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    element.style.top = (element.offsetTop - posY) + "px";
    element.style.left = (element.offsetLeft - posX) + "px";
  }

  function stopDrag() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
