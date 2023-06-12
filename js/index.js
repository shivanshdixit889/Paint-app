const brush = document.getElementById("brush");
const brushtext = document.getElementById("Main-brush-text");
const eraser = document.getElementById("eraser-color");
const canvas = document.getElementById("can");
const color = document.querySelector(".b");
const box = document.getElementById("Box");
const colorin = document.querySelector(".c");
const ClearCan = document.querySelector("#Clear-button");
const Save = document.querySelector("#Save-button");
const Saveimg = document.querySelector("#Save-button-white");
const coloselet = document.querySelector(".f");
const colosele = document.querySelector(".g");
const toolbtn = document.querySelectorAll(".Tool");
const fill = document.querySelector("#fillcolor");
const ctx = canvas.getContext("2d");
const sizeside = document.getElementById("side");

let perx;
let pery;
let spanshot;
let SelectedColor = "rgba(0, 0, 0, 100)";
let x = false;
let num = 0;
let colorbtn = document.querySelectorAll("#Color .color li");
let Back = document.getElementById("back-color");
let incolor = document.getElementById("b-color");
let Selectedtool = "brush";
let ispaint = false;
let brushSize = 5;

sizeside.addEventListener("input", () => {
    brushSize = sizeside.value;
})

const setback = () => {
    ctx.fillStyle = Back.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = SelectedColor;
};


const drawrect = (e) => {
    if(!fill.checked)
    {
        ctx.strokeRect(e.offsetX, e.offsetY, perx - e.offsetX, pery - e.offsetY);
    };
    if(fill.checked)
    {
        ctx.fillRect(e.offsetX, e.offsetY, perx - e.offsetX, pery - e.offsetY);
    };
}
const drawcri = (e) => {
    ctx.beginPath();
    let rad = Math.sqrt(Math.pow((e.offsetX - perx), 2) + Math.pow((e.offsetY - pery), 2))
    if(!fill.checked)
    {
        ctx.arc(perx, pery, rad, 0, 2 * Math.PI);
        ctx.stroke();
    };
    if(fill.checked)
    {
        ctx.arc(perx, pery, rad, 0, 2 * Math.PI);
        ctx.fill();
    };
}

ClearCan.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setback();
})



Save.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
})


const drawline = (e) => {
    ctx.beginPath();
    if(!fill.checked)
    {
        ctx.moveTo(perx, pery);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    };
    if(fill.checked)
    {
        ctx.moveTo(perx, pery);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.fill();
    };
}
const drawtar = (e) => {
    ctx.beginPath();
    if(!fill.checked)
    {
        ctx.moveTo(perx, pery);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.lineTo(perx * 2 - e.offsetX, e.offsetY);
        ctx.closePath();
        ctx.stroke();
    };
    if(fill.checked)
    {
        ctx.moveTo(perx, pery);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.lineTo(perx * 2 - e.offsetX, e.offsetY);
        ctx.closePath();
        ctx.fill();
    };
}
const TypeText = (e) => {
    // debugger;
    var m = 1;
    num++
    x = true
    if(!x) return
    if(!document.querySelector(".Textbox") + m) return
    if(!document.querySelector(".Textbox") + m) return
    let TextBox = document.createElement("input");
    TextBox.type = 'text';
    TextBox.className = "Textbox" + m;
    TextBox.placeholder = num + "Textbox";
    TextBox.style.marginTop = e.offsetY + "px";
    TextBox.style.marginLeft = "-" + e.offsetX + "px";
    TextBox.style.position = 'absolute';
    TextBox.style.zIndex = 10;
    document.getElementById("Box").appendChild(TextBox);
    x = false
};


Back.addEventListener("input", () => {
    canvas.style.background = Back.value;
    document.querySelector("#Box").style.backgroundColor = Back.value;
    color.style.backgroundColor = Back.value;
    colorin.style.backgroundColor = Back.value;
    eraser.value = Back.value;
    setback();
})
incolor.addEventListener("input", () => {
    coloselet.style.backgroundColor = incolor.value
    colosele.style.backgroundColor = incolor.value
    SelectedColor = incolor.value;
})



window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    setback();
})

const StartDrawing = (e) => {
    ispaint = true;
    perx = e.offsetX;
    pery = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushSize
    ctx.strokeStyle = SelectedColor;
    ctx.fillStyle = SelectedColor;
    spanshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

const Drawing = (e) => {
    if (!ispaint) return;
    ctx.putImageData(spanshot, 0, 0)
    if (Selectedtool === "brush")
    {
        ctx.strokeStyle = SelectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    };
    if (Selectedtool === "Rectangle")
    {
        drawrect(e)
    };
    if (Selectedtool === "Circle")
    {
        drawcri(e)
    };
    if (Selectedtool === "Triangle")
    {
        drawtar(e)
    };
    if (Selectedtool === "Line")
    {
        drawline(e)
    };
    if (Selectedtool === "eraser")
    {
        ctx.strokeStyle = eraser.value
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    };
}


toolbtn.forEach(btn => {
    btn.addEventListener("click", () => {
        Selectedtool = btn.id;
    })
})



colorbtn.forEach(btns => {
    btns.addEventListener("click", () => {
        SelectedColor = window.getComputedStyle(btns).getPropertyValue("background-color");
        console.log(SelectedColor)
    })
})



canvas.addEventListener("mousedown", StartDrawing)
canvas.addEventListener("mousemove", Drawing)
canvas.addEventListener("mouseup", () => ispaint = false)
