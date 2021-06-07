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
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// ------------------------------ RESIZE ----------------------------- //

/*Make resizable div by Hung Nguyen*/
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

  // Messed CSS
  document.getElementById('note' + novo).style.height='100px';
  document.getElementById('note' + novo).style.left=rndX + 70 + 'px';
  document.getElementById('note' + novo).style.top=rndY + 80 + 'px';
  
  div = document.querySelector(".resizable" + novo)
  resizer = document.querySelector(".resizable" + novo).querySelector(".resizers")
  
  div.style.paddingBottom='17px';
  div.style.textAlign='center';
  div.style.position='absolute';
  div.style.border='2px solid #29292b';
  div.style.backgroundColor='#29292b';
  div.style.width='100px';
  resizer.style.width='100%';
  resizer.style.height='100%';
  resizer.querySelector(".resizer").style.position='absolute';
  resizer.querySelector(".resizer").style.width='8px';
  resizer.querySelector(".resizer").style.height='8px';

  resizer.querySelector(".top-left").style.width='100%';
  resizer.querySelector(".top-left").style.height='100%';
  resizer.querySelector(".top-left").style.position='absolute';
  resizer.querySelector(".top-left").style.width='8px';
  resizer.querySelector(".top-left").style.height='8px';
  resizer.querySelector(".top-left").style.left='-5px';
  resizer.querySelector(".top-left").style.top='-5px';
  resizer.querySelector(".top-left").style.cursor='nwse-resize';

  resizer.querySelector(".top-right").style.width='100%';
  resizer.querySelector(".top-right").style.height='100%';
  resizer.querySelector(".top-right").style.position='absolute';
  resizer.querySelector(".top-right").style.width='8px';
  resizer.querySelector(".top-right").style.height='8px';
  resizer.querySelector(".top-right").style.right='-5px';
  resizer.querySelector(".top-right").style.top='-5px';
  resizer.querySelector(".top-right").style.cursor='nesw-resize';

  resizer.querySelector(".bottom-left").style.width='100%';
  resizer.querySelector(".bottom-left").style.height='100%';
  resizer.querySelector(".bottom-left").style.position='absolute';
  resizer.querySelector(".bottom-left").style.width='8px';
  resizer.querySelector(".bottom-left").style.height='8px';
  resizer.querySelector(".bottom-left").style.left='-5px';
  resizer.querySelector(".bottom-left").style.bottom='-5px';
  resizer.querySelector(".bottom-left").style.cursor='nesw-resize';

  resizer.querySelector(".bottom-right").style.width='100%';
  resizer.querySelector(".bottom-right").style.height='100%';
  resizer.querySelector(".bottom-right").style.position='absolute';
  resizer.querySelector(".bottom-right").style.width='8px';
  resizer.querySelector(".bottom-right").style.height='8px';
  resizer.querySelector(".bottom-right").style.right='-5px';
  resizer.querySelector(".bottom-right").style.bottom='-5px';
  resizer.querySelector(".bottom-right").style.cursor='nwse-resize';

  dragElement(document.getElementById("note" + novo));
  makeResizableDiv('.resizable' + novo);
}

function closeNote(){
  var div = this.parentElement;
  div.style.display = "none";
}