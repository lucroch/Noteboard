// ------------------------------ DRAG ------------------------------ //

// Make the DIV element draggable:

function dragElement(elmnt) {
  
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    if (e.clientY < 0) {
      elmnt.style.top = 0;
    }
    if (e.clientX < 0) {
      elmnt.style.left = 0;
    }
    if (e.clientY > window.innerHeight) {
      console.log("teste")
      elmnt.style.top = window.innerHeight - parseInt(elmnt.style.height) + "px";
    }
    if (e.clientX > window.innerWidth) {
      console.log(elmnt.style.left)
      elmnt.style.left = window.innerWidth - parseInt(elmnt.style.width) + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// ------------------------------ RESIZE ----------------------------- //

// Make resizable div by Hung Nguyen
function makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + ' .resizer')
  const minimum_size = 100;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0;i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault()
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })
    
    function resize(e) {
      if (currentResizer.classList.contains('bottom-right')) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      else {
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
    }
    
    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }
  }
}
  
// ---------------------------- NEW ELEMENT --------------------------- //

var novo = 0;
function newNote() {
  var temp = document.getElementsByTagName("template")[0];
  var clon = temp.content.cloneNode(true);
  document.body.appendChild(clon);
  
  var rndX = Math.floor(Math.random() * (window.innerWidth - 240))+1;
  var rndY = Math.floor(Math.random() * (window.innerHeight - 220))+1;

  novo = novo + 1;
  document.getElementById("note").id = "note" + novo;
  document.getElementById("note" + novo).className = "resizable" + novo;
  document.getElementById("noteheader").id = "note" + novo + "header";
  document.getElementById("notetext").id = "note" + novo + "text"

  document.getElementById('note' + novo).style.height='100px';
  document.getElementById('note' + novo).style.left=rndX + 70 + 'px';
  document.getElementById('note' + novo).style.top=rndY + 80 + 'px';
  
  div = document.querySelector(".resizable" + novo)
  resizer = document.querySelector(".resizable" + novo).querySelector(".resizers")
  topleft = document.querySelector(".resizable" + novo).querySelector(".resizers").querySelector(".top-left")
  topright = document.querySelector(".resizable" + novo).querySelector(".resizers").querySelector(".top-right")
  bottomleft = document.querySelector(".resizable" + novo).querySelector(".resizers").querySelector(".bottom-left")
  bottomright = document.querySelector(".resizable" + novo).querySelector(".resizers").querySelector(".bottom-right")
  
  // Messed CSS
  div.style.paddingBottom='17px';
  div.style.textAlign='center';
  div.style.position='absolute';
  div.style.border='2px solid #29292b';
  div.style.backgroundColor='#29292b';
  div.style.width='100px';
  resizer.querySelector(".resizer").style.position='absolute';
  resizer.querySelector(".resizer").style.width='8px';
  resizer.querySelector(".resizer").style.height='8px';

  topleft.style.position='absolute';
  topleft.style.width='8px'; topleft.style.height='8px';
  topleft.style.left='-5px'; topleft.style.top='-5px';
  topleft.style.cursor='nwse-resize';

  topright.style.position='absolute';
  topright.style.width='8px'; topright.style.height='8px';
  topright.style.right='-5px'; topright.style.top='-5px';
  topright.style.cursor='nesw-resize';

  bottomleft.style.position='absolute';
  bottomleft.style.width='8px'; bottomleft.style.height='8px';
  bottomleft.style.left='-5px'; bottomleft.style.bottom='-5px';
  bottomleft.style.cursor='nesw-resize';

  bottomright.style.position='absolute';
  bottomright.style.width='8px'; bottomright.style.height='8px';
  bottomright.style.right='-5px'; bottomright.style.bottom='-5px';
  bottomright.style.cursor='nwse-resize';

  dragElement(document.getElementById("note" + novo));
  makeResizableDiv('.resizable' + novo);
}